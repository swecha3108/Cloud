profile = "dev"
cidr    = "10.0.0.0/16"
vpcName = "Dev VPC"
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
igwName              = "dev public internet gateway"
public_route_table   = "DevPublicRouteTable"
private_route_table  = "DevPrivateRouteTable"
aws_key_pair         = "ec2"
ec2_instance_type    = "t2.micro"
database_name        = "csye6225"
database_username    = "csye6225"
database_password    = "postgres"
route53RecordName    = "dev.harikaramidi.me"
hostedZoneID         = "Z04190772HEAI6E4BPCNI"
certificate_arn      = "arn:aws:acm:us-east-1:042325102329:certificate/8beea170-2167-4417-bbd0-baeb3935b28e"
account_id           = "042325102329"