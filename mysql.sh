#!/bin/sh

      sudo yum update -y
      sudo yum upgrade -y
      sudo yum install amazon-cloudwatch-agent -y
      sudo cp /tmp/amazon-cloudwatch-agent.json /home/ec2-user/
      sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/home/ec2-user/amazon-cloudwatch-agent.json
      sudo amazon-linux-extras install postgresql9.6 -y
#       sudo yum install postgresql postgresql-server java-1.8.0 glibc.i686 -y
#       sudo /usr/bin/postgresql-setup --initdb --unit postgresql
#       sudo systemctl start postgresql
#       sudo systemctl enable --now postgresql
#       sudo systemctl status postgresql
#       username="postgres"
#       password="XoXo1998"

#       sudo passwd ${username} << EOD
#       ${password}
#       ${password}
# EOD

#       sudo sed -i 's/peer/md5/g' /var/lib/pgsql/data/pg_hba.conf
#       sudo sed -i 's/md5/trust/g' /var/lib/pgsql/data/pg_hba.conf
#       sudo sed -i 's/ident/trust/g' /var/lib/pgsql/data/pg_hba.conf
#       echo "host    all             all             0.0.0.0/0               trust" | sudo tee -a /var/lib/pgsql/data/pg_hba.conf
#       echo "listen_addresses = '*'" | sudo tee -a /var/lib/pgsql/data/postgresql.conf

#       sudo systemctl restart postgresql

      sudo yum install gcc-c++ make -y
      curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
      sudo yum update -y
      sudo yum install nodejs -y
      sudo cp /tmp/app.tar.gz /home/ec2-user/
      sudo tar -xzf /home/ec2-user/app.tar.gz -C /home/ec2-user/
      sudo chmod -R +rwx /home/ec2-user/
      sudo /usr/bin/npm --prefix /home/ec2-user/ install /home/ec2-user/
      sudo chmod -R 777 /home/ec2-user/
      sudo chmod -R 777 /home/ec2-user/uploads/
     
      sudo mv /tmp/appservice.service /etc/systemd/system/appservice.service
      sudo systemctl daemon-reload
      sudo systemctl enable appservice.service
      sudo systemctl start appservice.service
      sudo systemctl status appservice.service
