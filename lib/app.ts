import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cert from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as sns from 'aws-cdk-lib/aws-sns';
// import {Swa} from "serverless-website-analytics/src"; // For the npm linked package one while testing
import {AllAlarmTypes, Swa} from 'serverless-website-analytics';

import { appname, zonecert, fullname, email, sites, frontenddomain, zoneid, zonename } from '../secrets';

export class App extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* Optional, see descriptions on the `domain` property below. Needs to cover the `domain.name` and
       {auth.cognito.loginSubDomain}.{domain.name}` domains and must be in us-east-1 even if your stack is
       somewhere else  */
    const wildCardCertUsEast1 = cert.Certificate.fromCertificateArn(this, 'Cert', zonecert);

    const alarmTopic = new sns.Topic(this, "alarm-topic");
    new sns.Subscription(this, "alarm-topic-subscription", {
      topic: alarmTopic,
      protocol: sns.SubscriptionProtocol.EMAIL,
      endpoint: email,
    });

    new Swa(this, appname, {
      environment: 'prod',
      awsEnv: {
        account: this.account,
        region: this.region,
      },
      sites: sites,

      allowedOrigins: ['*'],
      /* Can be set explicitly instead of allowing all */
      // allowedOrigins: [
      //   'https://example.com',
      //   'https://www.example.com',
      //   'http://localhost:3000',
      //   'tests1',
      //   'tests2',
      // ],

      /* Specify one or the other, not both. Specifying neither means the site is unauthenticated, which is what we
         want for the Demo. */
      // auth: {
      //   basicAuth: {
      //     username: 'WelcomeFriend',
      //     password: 'YouMayPass',
      //   },
      // },
      auth: {
        cognito: {
          loginSubDomain: 'login', // This has to be unique across Cognito if not specifying your own domain
          users: [{
            name: fullname,
            email: email,
          }]
        }
      },

      /* Optional, if not specified uses default CloudFront and Cognito domains */
      domain: {
        name: frontenddomain,
        usEast1Certificate: wildCardCertUsEast1,
        /* Optional, if not specified then no DNS records will be created. You will have to create the DNS records yourself. */
        hostedZone: route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
          hostedZoneId: zoneid,
          zoneName: zonename,
        }),
        trackOwnDomain: true,
      },
      //isDemoPage: true, /* Do not specify for your dashboard */

      observability: {
        dashboard: true,
        alarms: {
          alarmTopic,
          alarmTypes: AllAlarmTypes
        },
      },
      anomaly: {
        detection: {
            staticThreshold: 1000,
        },
        alert: {
          topic: alarmTopic,
        }
      }
    });

  }
}


