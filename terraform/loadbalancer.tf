data "template_file" "user_data" {
  template = <<EOF
#!/bin/bash
yum update -y
sudo yum install amazon-cloudwatch-agent -y
sudo cp /tmp/amazon-cloudwatch-agent.json /home/ec2-user/
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/home/ec2-user/amazon-cloudwatch-agent.json
cd /home/ec2-user/src/
touch .env
echo DATABASE_USER=${var.database_name} >> .env
echo DATABASE_HOST=${element(split(":", aws_db_instance.databaseInstance.endpoint), 0)} >> .env
echo DATABASE_NAME=${var.database_username} >> .env
echo DATABASE_Password=${var.database_password} >> .env
echo DATABASE_PORT=5432 >> .env
echo AWS_BUCKET_NAME=${local.bucket_name} >> .env

cp .env /home/ec2-user/
chmod -R 777 /home/ec2-user/

EOF
}

resource "aws_launch_template" "asg_launch_config" {
  name          = "myLaunchTemplate"
  image_id      = var.my_ami
  instance_type = "t2.micro"
  key_name      = var.aws_key_pair
  block_device_mappings {
    device_name = "/dev/xvda"
    ebs {
      kms_key_id            = aws_kms_key.ebs_key.arn
      delete_on_termination = true
      encrypted             = true
      volume_size           = 50
      volume_type           = "gp2"
    }
  }
  user_data = base64encode(data.template_file.user_data.rendered)
  iam_instance_profile {
    name = aws_iam_instance_profile.ec2_profile.name
  }
  network_interfaces {
    associate_public_ip_address = true
    security_groups             = [aws_security_group.application.id]
  }
}

resource "aws_autoscaling_group" "asg" {
  name = "myASG"
  launch_template {
    id      = aws_launch_template.asg_launch_config.id
    version = "$Latest"
  }
  vpc_zone_identifier       = [aws_subnet.public_subnets[0].id, aws_subnet.public_subnets[1].id, aws_subnet.public_subnets[2].id]
  min_size                  = 1
  max_size                  = 3
  desired_capacity          = 1
  health_check_type         = "ELB"
  health_check_grace_period = 300
  default_cooldown          = 300
  tag {
    key                 = "Name"
    value               = "web-app"
    propagate_at_launch = true
  }

  lifecycle {
    create_before_destroy = true
  }

}

resource "aws_lb" "application_lb" {
  name_prefix        = "lb-"
  load_balancer_type = "application"
  subnets            = [aws_subnet.public_subnets[0].id, aws_subnet.public_subnets[1].id, aws_subnet.public_subnets[2].id]
  security_groups    = [aws_security_group.loadbalancer.id]
}

resource "aws_lb_target_group" "target_group" {
  name_prefix = "target"
  port        = "8080"
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "instance"
  health_check {
    interval = 30
    path     = "/healthz"
    port     = "8080"
    protocol = "HTTP"
  }
}

resource "aws_lb_listener" "my_listener" {
  load_balancer_arn = aws_lb.application_lb.arn
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = var.certificate_arn

  default_action {
    target_group_arn = aws_lb_target_group.target_group.arn
    type             = "forward"
  }
}

resource "aws_autoscaling_attachment" "asg_attachment" {
  autoscaling_group_name = aws_autoscaling_group.asg.name
  lb_target_group_arn    = aws_lb_target_group.target_group.arn
}
