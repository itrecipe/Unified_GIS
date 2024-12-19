import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 'root'라는 ID를 가진 요소를 가져옵니다.
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element with id 'root' not found in index.html");
}

// ReactDOM.createRoot로 렌더링합니다.
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
