# The Sole Edit

This is a [Next.js](https://nextjs.org) project for The Sole Edit, an e-commerce platform for shoes.

## Local Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/your_repository.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Set up your environment variables by creating a `.env.local` file in the root of the project and adding the necessary variables. See the "Environment Variables" section for more details.

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

- `NEXT_PUBLIC_API_BASE_URL`: The base URL for the API.

Example `.env.local` file:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## Deployment

To deploy this application, you can use the Vercel Platform from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Build

To create a production build, run the following command:

```bash
npm run build
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
