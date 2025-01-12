resource "aws_autoscaling_policy" "scale_up_policy" {
  name                   = "scale-up-policy"
  policy_type            = "SimpleScaling"
  autoscaling_group_name = aws_autoscaling_group.asg.name
  scaling_adjustment     = 1
  adjustment_type        = "ChangeInCapacity"
  cooldown               = 300
}

resource "aws_autoscaling_policy" "scale_down_policy" {
  name                   = "scale-down-policy"
  policy_type            = "SimpleScaling"
  autoscaling_group_name = aws_autoscaling_group.asg.name
  scaling_adjustment     = -1
  adjustment_type        = "ChangeInCapacity"
  cooldown               = 300
}

resource "aws_cloudwatch_metric_alarm" "cpu_usage_above_5" {
  alarm_name          = "cpu-usage-above-5"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 60
  statistic           = "Average"
  threshold           = 3
  alarm_description   = "Scale up if CPU usage is above 3%"
  dimensions = {
    AutoScalingGroupName = aws_autoscaling_group.asg.name
  }
  actions_enabled = true
  alarm_actions = [
    aws_autoscaling_policy.scale_up_policy.arn
  ]
}

resource "aws_cloudwatch_metric_alarm" "cpu_usage_below_3" {
  alarm_name          = "cpu-usage-below-3"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 60
  statistic           = "Average"
  threshold           = 2
  alarm_description   = "Scale down if CPU usage is below 2%"
  dimensions = {
    AutoScalingGroupName = aws_autoscaling_group.asg.name
  }
  actions_enabled = true
  alarm_actions = [
    aws_autoscaling_policy.scale_down_policy.arn
  ]
}
