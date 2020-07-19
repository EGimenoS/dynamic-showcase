import productList from "../modules/products.js";
import { cart } from "../main.js";

function createItemCard(item) {
  // creo los nodos
  const newCard = document.createElement("div");
  const newCardImage = document.createElement("div");
  const newCardData = document.createElement("div");
  const newCardTitle = document.createElement("div");
  const newCardPrice = document.createElement("div");

  // asigno las clases adecuadas a los nodos
  newCard.classList.add("card");
  newCardImage.classList.add("card-image");
  newCardTitle.classList.add("card-title");
  newCardData.classList.add("card-data");
  newCardPrice.classList.add("card-price");

  //añadimos los datos

  newCardImage.style.backgroundImage = `url(${item.img})`;
  newCardTitle.textContent = item.name;
  newCardPrice.textContent = item.price;

  //construyo finalmente el elemento
  newCardData.appendChild(newCardTitle);
  newCardData.appendChild(newCardPrice);
  newCard.appendChild(newCardImage);
  newCard.appendChild(newCardData);

  // añadimos el atributo draggable a la card

  newCard.setAttribute("draggable", true);

  // asignamos data attribute con el id

  newCard.dataset.id = item.id;

  // añadimos event handler ondragstart

  newCard.addEventListener("dragstart", (event) => {
    event.dataTransfer.clearData(); //limpiamos lo que pudiera haber previamente en el objeto dataTransfer
    event.dataTransfer.setData("id", event.target.getAttribute("data-id"));
  });

  // retornamos el DOM element generado

  return newCard;
}

function createCartLine(id) {
  const item = productList.find((product) => product.id === id);
  console.log(item);
  const newCartLine = document.createElement("div");
  const newCartLineName = document.createElement("div");
  const newCartLinePrice = document.createElement("div");
  newCartLine.classList.add("cart-line");
  newCartLineName.classList.add("cart-line-name");
  newCartLinePrice.classList.add("cart-line-price");
  newCartLineName.textContent = item.name;
  newCartLinePrice.textContent = item.price;
  newCartLine.appendChild(newCartLineName);
  newCartLine.appendChild(newCartLinePrice);
  return newCartLine;
}

// setup del área de dropzone
function setDropZone() {
  const dropZone = document.getElementById("cart");
  // permitimos que el div "cart" sea un area de drop
  dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  // gestionamos lo que ocurre cuando hacemos drop de un item
  dropZone.addEventListener("drop", (event) => {
    const id = parseInt(event.dataTransfer.getData("id"));
    cart.push(id);
    console.log(cart);
    const newCartLine = createCartLine(id);
    dropZone.appendChild(newCartLine);
    const amountElement = document.getElementById("total-amount");
    amountElement.textContent = calculateTotal();
  });
}

// inicializa el grid con las cards de productos disponibles
function initializeProductGrid() {
  const entryNode = document.getElementById("cards");
  productList.forEach((item) => {
    const card = createItemCard(item);
    entryNode.appendChild(card);
  });
}

// calcula el total en el carro

function calculateTotal() {
  const getItemPrice = (id) => productList.find((item) => item.id === id).price;
  return cart.reduce((total, id) => total + getItemPrice(id), 0);
}

export { setDropZone, createItemCard, initializeProductGrid };
