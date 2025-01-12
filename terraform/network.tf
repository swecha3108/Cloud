resource "random_id" "id" {
  byte_length = 8
}

data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_vpc" "main" {
  cidr_block = var.cidr
  tags = {
    Name = "${var.vpcName}-${random_id.id.hex}"
  }
}

resource "aws_vpc_ipv4_cidr_block_association" "secondary_cidr" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "172.2.0.0/16"

  depends_on = [
    aws_vpc.main,
  ]
}

resource "aws_subnet" "public_subnets" {
  count             = var.public_subnet_count
  vpc_id            = aws_vpc.main.id
  cidr_block        = element(var.public_subnet_cidrs, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index % length(data.aws_availability_zones.available.zone_ids)]
  tags = {
    Name = "Public_${random_id.id.hex}_${count.index + 1}"
  }

  depends_on = [
    aws_vpc.main,
  ]
}

resource "aws_subnet" "private_subnets" {
  count             = var.private_subnet_count
  vpc_id            = aws_vpc.main.id
  cidr_block        = element(var.private_subnet_cidrs, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index % length(data.aws_availability_zones.available.zone_ids)]

  tags = {
    Name = "Private_${random_id.id.hex}_${count.index + 1}"
  }

  depends_on = [
    aws_vpc.main,
  ]
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.igwName}-${random_id.id.hex}"
  }

  depends_on = [
    aws_vpc.main,
  ]
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  tags = {
    Name = "${var.public_route_table}-${random_id.id.hex}"
  }

  depends_on = [
    aws_vpc.main,
    aws_internet_gateway.gw,
  ]
}

resource "aws_route_table_association" "public_subnet_asso" {
  count          = var.public_subnet_count
  subnet_id      = element(aws_subnet.public_subnets[*].id, count.index)
  route_table_id = aws_route_table.public_rt.id

  depends_on = [
    aws_route_table.public_rt,
  ]
}

resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.private_route_table}-${random_id.id.hex}"
  }
  depends_on = [
    aws_vpc.main,
  ]
}

resource "aws_route_table_association" "private_subnet_asso" {
  count          = var.private_subnet_count
  subnet_id      = element(aws_subnet.private_subnets[*].id, count.index)
  route_table_id = aws_route_table.private_rt.id

  depends_on = [
    aws_route_table.private_rt,
  ]
}