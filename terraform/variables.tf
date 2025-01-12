variable "cidr" {
  type        = string
  description = "vpc cidr value"
}
variable "vpcName" {
  type        = string
  description = "vpc name"
}

variable "igwName" {
  type        = string
  description = "internet gateway name"
}

variable "public_route_table" {
  type        = string
  description = "public route table"
}

variable "private_route_table" {
  type        = string
  description = "private route table"
}

variable "region" {
  type        = string
  description = "region where the resources will be created and destroyed"
}

variable "profile" {
  type        = string
  description = "In which account the resources will be created and destroyed"
}


variable "public_subnet_count" {
  type        = number
  description = "no.of public subnets that needs to be created"
}

variable "private_subnet_count" {
  type        = number
  description = "no.of private subnets that needs to be created"
}

variable "public_subnet_cidrs" {
  type        = list(string)
  description = "Public Subnet CIDR values"
}

variable "private_subnet_cidrs" {
  type        = list(string)
  description = "Private Subnet CIDR values"
}

variable "my_ami" {
  type        = string
  description = "The ami which is created with all the configuration"
}
variable "ec2_instance_type" {
  type        = string
  description = "EC2 instance type"
}

variable "aws_key_pair" {
  type        = string
  description = "EC2 key pair"
}

variable "database_name" {
  type        = string
  description = "Database host"
}

variable "database_username" {
  type        = string
  description = "Database host"
}

variable "database_password" {
  type        = string
  description = "Database host"
}

variable "route53RecordName" {
  type        = string
  description = "Route 53 record name"
}

variable "hostedZoneID" {
  type        = string
  description = "Route 53 hosted zone id"
}

variable "certificate_arn" {
  type        = string
  description = "ssl certificate arn"
}

variable "account_id" {
  type        = string
  description = "account id"
}