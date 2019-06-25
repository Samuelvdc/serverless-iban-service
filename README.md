# Serverless IBAN service - alpha version

Go to following url in your to test

https://hobqs726w8.execute-api.eu-west-1.amazonaws.com/v1/validate/BE68539007547034

The Swagger defintion is available [here](./swagger.yaml)


## Getting started

Deployment procedure
```bash
#!/bin/bash

# Todo: Read parameters from env-vars/dev.json
export STACK_NAME=serverless-iban-service
export MY_DEV_BUCKET=serverless-development-bucket


# Package new cloudformation package
aws cloudformation package --template template.yaml --s3-bucket $MY_DEV_BUCKET --output-template template-export-dev.yaml

# Deploy
sam deploy --template-file template-export-dev.yaml --stack-name $STACK_NAME --capabilities CAPABILITY_NAMED_IAM --parameter-overrides Stage=dev

# Manual post deployment step --f
# Cloudformation does not support adding S3 trigger to Lambda when using random s3 name
# https://aws.amazon.com/premiumsupport/knowledge-center/unable-validate-destination-s3/
aws s3api put-bucket-notification-configuration`--bucket awsteam-vandes16-dev-serverless-tim-s3imagebucket-1k00w09b9qwh9 --notification-configuration cfn-s3-fix-notification.json

aws s3api put-bucket-notification-configuration --bucket 'awsteam-vandes16-dev-serverless-tim-s3imagebucket-g34t0nyqsa9r' --notification-configuration file://cfn-s3-fix-notification.json

```

Test cases:
```bash
sam local invoke FnIbanApi --event ./lambda/fn-ibanvalidator/__tests__/test.json --docker-network lambda-local --env-vars env-vars/local.json --skip-pull-image
sam local invoke FnIbanApi --event ./lambda/fn-ibanvalidator/__tests__/test-valid.json --docker-network lambda-local --env-vars env-vars/local.json --skip-pull-image
```