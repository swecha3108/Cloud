resource "aws_iam_policy" "WebAppS3" {
  name        = "webapps3_policy"
  path        = "/"
  description = "My My webapp s3 policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:ListBucket",
          "s3:DeleteObject",
        ]
        Effect = "Allow"
        "Resource" : [
          "arn:aws:s3:::${local.bucket_name}",
          "arn:aws:s3:::${local.bucket_name}/*"
        ]
      },
    ]
  })
}

resource "aws_iam_policy" "EC2-lb" {
  name        = "EC2-load_balancer"
  path        = "/"
  description = "My webapp elb policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "autoscaling:CreateAutoScalingGroup",
          "autoscaling:UpdateAutoScalingGroup",
          "autoscaling:CreateLaunchTemplate",
          "autoscaling:PutScalingPolicy",
          "autoscaling:DeleteAutoScalingGroup",
          "autoscaling:DeleteLaunchTemplate",
          "autoscaling:DeletePolicy",
          "cloudwatch:DescribeAlarms",
          "cloudwatch:DeleteAlarms",
        ]
        Effect = "Allow"
        "Resource" : "*"
    }]
  })

}
resource "aws_iam_role" "EC2-CSYE6225" {
  name = "EC2-CSYE6225"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })

  tags = {
    Name = "EC2-CSYE6225"
  }
}
resource "aws_iam_policy_attachment" "ec2_policy_role" {
  name       = "ec2attachment"
  roles      = [aws_iam_role.EC2-CSYE6225.name]
  policy_arn = aws_iam_policy.WebAppS3.arn
}

resource "aws_iam_policy_attachment" "cloudwatch_policy_role" {
  name       = "cloudWatchattachment"
  roles      = [aws_iam_role.EC2-CSYE6225.name]
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
}

resource "aws_iam_policy_attachment" "elb_policy_role" {
  name       = "cloudWatchattachment"
  roles      = [aws_iam_role.EC2-CSYE6225.name]
  policy_arn = aws_iam_policy.EC2-lb.arn
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "ec2_profile"
  role = aws_iam_role.EC2-CSYE6225.name
}