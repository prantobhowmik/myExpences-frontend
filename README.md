
# myExpences Frontend

>A modern, professional, and minimalist expense tracking web app built with React, TypeScript, and Tailwind CSS.

## Features

- 🔒 Secure authentication with JWT and session management
- 🧑‍💼 Protected routes for logged-in users
- 🎨 Professional, minimalist UI with responsive design
- ✨ Animated login/signup forms (GSAP)
- 🧾 Track, add, and view expenses (API integration ready)
- 🍃 Clean code structure and easy customization

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS
- GSAP (animations)
- React Router DOM
- FastAPI backend (see [myExpences-backend](https://github.com/prantobhowmik/myExpences-backend))

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/prantobhowmik/myExpences-frontend.git
cd myExpences-frontend
```

### 2. Install dependencies

```sh
npm install
```

### 3. Start the development server

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/components/` – UI components (Login, Signup, Home, Header, Footer, Toast, etc.)
- `src/api/` – API base and authentication helpers
- `src/routes/` – App routing and protected route logic

## Environment Variables

No custom environment variables are required for local development. The API base URL is set in `src/api/base.ts`.

## Deployment

Build for production:

```sh
npm run build
```

## License

MIT © Pranto Bhowmik

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
