
# resource "aws_instance" "application-ec2" {
#   ami                     = var.my_ami
#   instance_type           = var.ec2_instance_type
#   key_name                = var.aws_key_pair
#   subnet_id               = aws_subnet.public_subnets[0].id
#   iam_instance_profile    = aws_iam_instance_profile.ec2_profile.name
#   disable_api_termination = false
#   vpc_security_group_ids = [
#     aws_security_group.application.id
#   ]
#   tags = {
#     Name = "Application EC2"
#   }
#   user_data = <<EOF
# #!/bin/bash
# yum update -y
# cd /home/ec2-user/src/
# touch .env
# echo DATABASE_USER=csye6225 >> .env
# echo DATABASE_HOST=${element(split(":", aws_db_instance.databaseInstance.endpoint), 0)} >> .env
# echo DATABASE_NAME=csye6225 >> .env
# echo DATABASE_Password=postgres >> .env
# echo DATABASE_PORT=5432 >> .env
# echo AWS_BUCKET_NAME=${local.bucket_name} >> .env

# cp .env /home/ec2-user/
# chmod -R 777 /home/ec2-user/

# EOF
#   depends_on = [
#     aws_subnet.public_subnets,
#   ]
# }
# resource "aws_eip" "lb" {
#   instance = aws_instance.application-ec2.id
#   vpc      = true

#   depends_on = [
#     aws_instance.application-ec2,
#   ]
# }

