resource "aws_security_group" "application" {
  name   = "application"
  vpc_id = aws_vpc.main.id
  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "application Security Group"
  }
}

resource "aws_security_group_rule" "ec2databaseConnection" {
  type                     = "ingress"
  from_port                = 5432
  to_port                  = 5432
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.application.id

  security_group_id = aws_security_group.database.id
}

resource "aws_security_group" "database" {
  name   = "database"
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "database Security Group"
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "loadbalancer" {
  name   = "loadbalancer"
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "load balancer Security Group"
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group_rule" "ec2ELBConnection1" {
  type                     = "ingress"
  from_port                = 22
  to_port                  = 22
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.loadbalancer.id

  security_group_id = aws_security_group.application.id
}

resource "aws_security_group_rule" "ec2ELBConnection2" {
  type                     = "ingress"
  from_port                = 8080
  to_port                  = 8080
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.loadbalancer.id

  security_group_id = aws_security_group.application.id
}