data "aws_caller_identity" "current" {}
resource "aws_kms_key" "ebs_key" {
  description             = "KMS EBS key"
  deletion_window_in_days = 7
  policy = jsonencode({
    Version = "2012-10-17"
    Id      = "kms-key-for-ebs"
    Statement = [
      {
        Sid    = "Enable IAM User Permissions"
        Effect = "Allow"
        Principal = {
          AWS = [
            "${join("", ["arn:aws:iam::", var.account_id, ":root"])}",
            "${join("", ["arn:aws:iam::", var.account_id, ":role/aws-service-role/autoscaling.amazonaws.com/AWSServiceRoleForAutoScaling"])}",
          ]
        }
        Action   = "kms:*"
        Resource = "*"
      },
      {
        Sid    = "Allow access for Key Administrators"
        Effect = "Allow"
        Principal = {
          AWS = [
            "${join("", ["arn:aws:iam::", var.account_id, ":role/aws-service-role/autoscaling.amazonaws.com/AWSServiceRoleForAutoScaling"])}",
          ]
        }
        Action = [
          "kms:Create*",
          "kms:Describe*",
          "kms:Enable*",
          "kms:List*",
          "kms:Put*",
          "kms:Update*",
          "kms:Revoke*",
          "kms:Disable*",
          "kms:Get*",
          "kms:Delete*",
          "kms:TagResource",
          "kms:UntagResource",
          "kms:ScheduleKeyDeletion",
          "kms:CancelKeyDeletion",
        ]
        Resource = "*"
      },
    ]
  })
}

resource "aws_kms_key" "rds_key" {
  description             = "KMS RDS key"
  deletion_window_in_days = 7
  policy = jsonencode({
    Version = "2012-10-17"
    Id      = "kms-key-for-rds"
    Statement = [
      {
        Sid    = "Enable IAM User Permissions"
        Effect = "Allow"
        Principal = {
          AWS = "${join("", ["arn:aws:iam::", var.account_id, ":root"])}"
        }
        Action   = "kms:*"
        Resource = "*"
      },
      {
        Sid    = "Allow access for Key Administrators"
        Effect = "Allow"
        Principal = {
          AWS = "${join("", ["arn:aws:iam::", var.account_id, ":role/aws-service-role/rds.amazonaws.com/AWSServiceRoleForRDS"])}"
        }
        Action   = "kms:*"
        Resource = "*"
      },
    ]
  })
}