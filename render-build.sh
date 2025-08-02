#!/bin/bash

# Force install Chrome before build
npx puppeteer browsers install chrome

# Then run your normal build command
npm install
npm run build
