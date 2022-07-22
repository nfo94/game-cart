import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { createServer } from "miragejs";

import App from "./App";

// Backend response mock
createServer({
  routes() {
    this.get("/store", () => [
      {
        id: 1,
        name: "Elden Ring",
        price: 79.99,
        imgUrl: "../public/imgs/eldenring.jpg",
      },
      {
        id: 2,
        name: "Manhunt",
        price: 9.99,
        imgUrl: "../public/imgs/manhunt.jpg",
      },
      {
        id: 3,
        name: "The Last Of Us",
        price: 59.99,
        imgUrl: "../public/imgs/thelastofus.jpg",
      },
      {
        id: 4,
        name: "Outlast",
        price: 19.99,
        imgUrl: "../public/imgs/outlast.jpg",
      },
      {
        id: 5,
        name: "Gun",
        price: 10.99,
        imgUrl: "../public/imgs/gun.jpg",
      },
      {
        id: 6,
        name: "Age of Empires III",
        price: 10.99,
        imgUrl: "../public/imgs/ageofempires3.jpg",
      },
      {
        id: 7,
        name: "Dark Souls",
        price: 50.99,
        imgUrl: "../public/imgs/darksouls.jpg",
      },
      {
        id: 8,
        name: "Hitman: Contracts",
        price: 10.99,
        imgUrl: "../public/imgs/hitmancontracts.jpg",
      },
    ]);
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
