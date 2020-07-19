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

  const newCartLine = document.createElement("div");

  // generación de nodos
  const newCartLineName = document.createElement("div");
  const newCartLinePrice = document.createElement("div");
  const newCartLineIcon = document.createElement("img");
  const newCartLineDelete = document.createElement("img");

  // adición de clases CSS
  newCartLine.classList.add("cart-line");
  newCartLineName.classList.add("cart-line-name");
  newCartLinePrice.classList.add("cart-line-price");
  newCartLineIcon.classList.add("cart-line-icon");
  newCartLineDelete.classList.add("cart-line-delete");

  // se añade contenido
  newCartLineName.textContent = item.name;
  newCartLinePrice.textContent = item.price;
  newCartLineIcon.setAttribute("src", item.img);
  newCartLineDelete.setAttribute("src", "./assets/images/delete.svg");

  // configuramos el elemento HTML final
  newCartLine.appendChild(newCartLineIcon);
  newCartLine.appendChild(newCartLineName);
  newCartLine.appendChild(newCartLinePrice);
  newCartLine.appendChild(newCartLineDelete);

  // se añade event listener para gestionar el borrado de un elemento del
  newCartLineDelete.addEventListener("click", (event) => {
    const positionInCart = event.target.parentElement.getAttribute("data-position");
    cart.splice(positionInCart, 1);
    updateTotal();
    console.log(cart);
    event.target.parentElement.remove();
  });
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
    //indicamos la posición del elemento en el array cart
    newCartLine.dataset.position = cart.length - 1;
    // actualisamos total
    updateTotal();
  });
}
function updateTotal() {
  const amountElement = document.getElementById("total-amount");
  amountElement.textContent = calculateTotal();
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
