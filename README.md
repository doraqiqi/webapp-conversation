# FRW Medicine Recognition Robot
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First, install dependencies:
```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using Docker

```
docker build . -t <DOCKER_HUB_REPO>/webapp-conversation:latest
# now you can access it in port 3000
docker run -p 3000:3000 <DOCKER_HUB_REPO>/webapp-conversation:latest
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

We deployed this app on vercel. Welcome to the website: [FRW Medicine Identification Robot ](https://medirecog.frwhealthcare.online/)



## Acknowledgements

This project makes use of code from the following open-source project:

- [**webapp-conversation**](https://github.com/langgenius/webapp-conversation) by [Dify] - This project is licensed under the [MIT License](https://github.com/langgenius/webapp-conversation/blob/main/LICENSE).

