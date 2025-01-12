# resource "aws_route53_record" "ec2Instance" {
#   zone_id = var.hostedZoneID
#   name    = var.route53RecordName
#   type    = "A"
#   ttl     = 60
#   records = [aws_eip.lb.public_ip]
# }

resource "aws_route53_record" "webapp" {
  zone_id = var.hostedZoneID
  name    = var.route53RecordName
  type    = "A"
  alias {
    name                   = aws_lb.application_lb.dns_name
    zone_id                = aws_lb.application_lb.zone_id
    evaluate_target_health = true
  }
}
