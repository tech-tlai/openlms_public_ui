# EduReach LMS platform

Edureach is a free and open-source Learning Management System (LMS) designed to facilitate flexible and engaging learning experiences

---

##Features

- Course Creation & Management
- Learner Engagement
- Multi-lingual support

---

## Installation

1. Clone the repo: `git clone https://github.com/tech-tlai/openlms_public_ui.git`
2. Navigate to the project directory: `cd openlms_public_ui`
3. Install dependencies: `npm install`
4. Start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Deployment

This project is built using [Svelekit](https://svelte.dev/docs/kit/introduction) and deployed using [AWS Amplify](https://aws.amazon.com/amplify/)

### Steps to enable AWS Amplify Adapter for a SvelteKit Project

#### 1. Install the amplify-adapter [npm package](https://www.npmjs.com/package/amplify-adapter)

`npm install --save-dev amplify-adapter`

#### 2. Update `svelte.config.js`

`import adapter from 'amplify-adapter';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/\*_ @type {import('@sveltejs/kit').Config} _/
const config = {
kit: {
// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
// See https://kit.svelte.dev/docs/adapters for more information about adapters.
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
