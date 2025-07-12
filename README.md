# Code The Dream Swag - Lesson -1

This is a minimal React project setup to kickstart development with modern frontend tooling.

### Tech Stack

- [React](https://reactjs.org/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [npm](https://www.npmjs.com/)

---

### Project Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/Padmaja-Ramesh/ctd_swag.git
cd ctd_swag
```

#### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

#### 3. Run the App Locally

```bash
npm run dev
# or
yarn dev
```

This will start the app at: [http://localhost:5173](http://localhost:5173)

---

### Project Structure

```
react-basic-setup/
├── public/             # Static files
├── src/
│   ├── assets
│   ├── App.css
│   ├── App.jsx         # Root component
│   ├── main.jsx        # App entry point
│   └── index.css       # Global styles
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

### Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Lint your code _(if ESLint is configured)_

### 🧹 Optional Enhancements

You can enhance the project by adding:

- ESLint + Prettier

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

### 📄 License

MIT License
