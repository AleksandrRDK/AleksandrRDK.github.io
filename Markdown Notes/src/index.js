import { createRoot } from "react-dom/client";

import App from "./components/app/App";
import { ThemeProvider } from "./components/ThemeContext/ThemeContext";

import './index.scss'

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<ThemeProvider>
        <App />
    </ThemeProvider>,
);