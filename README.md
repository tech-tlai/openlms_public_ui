# EduReach LMS platform

Edureach is a free and open-source Learning Management System (LMS) designed to facilitate flexible and engaging learning experiences

---

## Features

- Content viewership
- Multi-lingual support for web and video content
- Learner Engagement
- Assessments and more

---

## Installation

1. Clone the repo: `git clone https://github.com/tech-tlai/openlms_public_ui.git`
2. Navigate to the project directory: `cd openlms_public_ui`
3. Install dependencies: `npm install`

## Usage

[![Node.js Version](https://img.shields.io/badge/node.js-%3E%3D20.5.0-blue)](https://nodejs.org/en/)

[![npm Version](https://img.shields.io/badge/npm-%3E%3D10.7.0-green)](https://www.npmjs.com/)

Start a development server:

```bash
npm run dev

```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment. We recommend [AWS Amplify](https://aws.amazon.com/amplify/).

## Deployment

### Steps to enable AWS Amplify Adapter for a SvelteKit Project

#### 1. Install the amplify-adapter [npm package](https://www.npmjs.com/package/amplify-adapter)

`npm install --save-dev amplify-adapter`

#### 2. Update `svelte.config.js`

`import adapter from 'amplify-adapter';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/\*_ @type {import('@sveltejs/kit').Config} _/
const config = {
kit: {
adapter: adapter()
},
preprocess: vitePreprocess()
};

export default config;`

#### 3. Build the project using the following build configuration in the amplify.yml file:

`
version: 1
frontend:
phases:
preBuild:
commands: - npm ci
build:
commands: - env >> .env - npm run build - node amplify.mjs
artifacts:
baseDirectory: build
files: - '**/\*'
cache:
paths: - node_modules/**/\*

`

Also read - [Deploy a SvelteKit app to Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/get-started-sveltekit.html)
