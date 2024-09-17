#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { ParsesqsStack } from "../lib/parsesqs-stack.js";

const app = new App();
new ParsesqsStack(app, "ParsesqsStack", {});