locals {
  bucket_name = "my-bucket-${terraform.workspace}-${random_id.id.hex}"
}

resource "aws_s3_bucket" "private_bucket" {
  bucket        = local.bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "encryptionConfig" {
  bucket = aws_s3_bucket.private_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "s3buckerlifecyle" {
  bucket = aws_s3_bucket.private_bucket.id

  rule {
    id     = "transition-to-standard-ia"
    status = "Enabled"

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
    noncurrent_version_transition {
      noncurrent_days = 30
      storage_class   = "STANDARD_IA"
    }
  }
}

resource "aws_s3_bucket_acl" "s3bucketacl" {
  bucket = aws_s3_bucket.private_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "private_bucket_block" {
  bucket = aws_s3_bucket.private_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}