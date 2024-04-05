#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { App } from '../lib/app';
import {Tags} from "aws-cdk-lib";

import { appname, account, region } from '../secrets';

const app = new cdk.App();

const swaStack = new App(app, appname, {
  env: {
    account: account, // My account
    region: region,
  },
});

/* Adds tags to all the resources for billing purposes */
Tags.of(swaStack).add('App', appname);
