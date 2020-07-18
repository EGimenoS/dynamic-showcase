export default function createProductCard(item) {
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

  // retornamos el DOM element generado

  return newCard;
}
