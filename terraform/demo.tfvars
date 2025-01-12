profile = "prod"
cidr    = "10.0.0.0/16"
vpcName = "Demo VPC"
public_subnet_cidrs = [
  "10.0.1.0/24",
  "10.0.2.0/24",
  "10.0.3.0/24",
  "10.0.4.0/24",
  "10.0.5.0/24",
  "10.0.6.0/24",
  "10.0.7.0/24",
  "10.0.8.0/24",
]
private_subnet_cidrs = [
  "10.0.101.0/24",
  "10.0.102.0/24",
  "10.0.103.0/24",
  "10.0.104.0/24",
  "10.0.105.0/24",
  "10.0.106.0/24",
  "10.0.107.0/24",
  "10.0.108.0/24",
]
public_subnet_count  = 3
private_subnet_count = 3
igwName              = "demo public internet gateway"
public_route_table   = "DemoPublicRouteTable"
private_route_table  = "DemoPrivateRouteTable"
aws_key_pair         = "ec2"
ec2_instance_type    = "t2.micro"
database_name        = "csye6225"
database_username    = "csye6225"
database_password    = "postgres"
route53RecordName    = "demo.harikaramidi.me"
hostedZoneID         = "Z04548201U3OBXHYBPIDB"
certificate_arn      = "arn:aws:acm:us-east-1:969027623663:certificate/e49ef195-6f0f-441b-b648-fc882ca17c84"
account_id           = "969027623663"