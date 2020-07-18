import productList from "./modules/products.js";
import createItemCard from "./modules/utilities.js";

const cart = []; // array que contendrá la lista de productos en el carro

const initializeProductGrid = () => {
  const entryNode = document.getElementById("cards");
  productList.forEach((item) => {
    const card = createItemCard(item);
    entryNode.appendChild(card);
  });
};

initializeProductGrid();
