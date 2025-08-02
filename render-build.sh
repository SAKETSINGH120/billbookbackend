#!/usr/bin/env bash

# Step 1: Install node modules
npm install

# Step 2: Download the Chromium browser required by Puppeteer
npx puppeteer browsers install chrome
