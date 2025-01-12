# aws-infra
This repository hold aws resource creations using terraform

## Requirements
Install AWS CLI
- #### AWS CLI installation on Windows

  Just go on [official AWS docs website](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) and download the installer.

    msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

- #### AWS CLI installation on Linux

  just run the following commands.

      curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
      unzip awscliv2.zip
      sudo ./aws/install

create access key and access secret for a user and then do aws configure 
create dev and prod profiles with different accounts

Install Terraform
- #### Terraform installation on Windows

  Just go on [official Terraform website](https://developer.hashicorp.com/terraform/downloads) and download the installer.

- #### Terraform installation on Linux

  just run the following commands.

      wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
      echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
      sudo apt update && sudo apt install terraform

## Quick Start

Format files:

    terraform fmt

initialize:

    terraform init

check the config:

    terraform plan -var-file="dev.tfvars" (create a file with .tfvars extension and pass the values)

create the config:

    terraform apply -var-file="dev.tfvars" (create a file with .tfvars extension and pass the values)

destroy the config:

    terraform destroy -var-file="dev.tfvars" (create a file with .tfvars extension and pass the values)

Importing the certificate to AWS with CLI:
aws acm import-certificate --certificate fileb://Certificate.pem \
      --certificate-chain fileb://CertificateChain.pem \
      --private-key fileb://PrivateKey.pem 	


