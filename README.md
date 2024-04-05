# Getting Started

Have NPM already installed.

Copy `secrets_example.ts` to `secrets.ts` and fill it in.

Run `npm install` to get the npm prerequisites setup.

Run `npm run build` to build the content.

Run `./node_modules/aws-cdk/bin/cdk bootstrap` if you haven't previously.

Run `./node_modules/aws-cdk/bin/cdk deploy APPNAME`, filling in APPNAME with the value you put in secrets.ts.

# Destroying The Stack

Run `./node_modules/aws-cdk/bin/cdk destroy APPNAME`, filling in APPNAME with the value you put in secrets.ts.

## Useful commands

* `npm install`     setup dependencies
* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

