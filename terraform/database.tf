resource "aws_db_parameter_group" "postgresParameterGroup" {
  name   = "my-pg"
  family = "postgres14"
}

resource "aws_db_subnet_group" "dbSubnetGroup" {
  name       = "my db subnet group"
  subnet_ids = [aws_subnet.private_subnets[0].id, aws_subnet.private_subnets[1].id, aws_subnet.private_subnets[2].id]
  tags = {
    Name = "My DB subnet group"
  }
}

resource "aws_db_instance" "databaseInstance" {
  parameter_group_name = aws_db_parameter_group.postgresParameterGroup.name
  apply_immediately    = true
  identifier           = "csye6225"
  allocated_storage    = 10
  engine               = "postgres"
  instance_class       = "db.t3.micro"
  db_name              = var.database_name
  username             = var.database_username
  password             = var.database_password
  db_subnet_group_name = aws_db_subnet_group.dbSubnetGroup.name
  publicly_accessible  = false
  skip_final_snapshot  = true
  multi_az             = false
  kms_key_id           = aws_kms_key.rds_key.arn
  storage_encrypted    = true
  vpc_security_group_ids = [
    aws_security_group.database.id,
  ]
}