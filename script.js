// Obtener referencias a los elementos del DOM
const categorySelect = document.getElementById('categorySelect');
const quantityInput = document.getElementById('quantityInput');
const buyButton = document.getElementById('buyButton');
const deleteButton = document.getElementById('deleteButton');
const ticketContainer = document.getElementById('ticketContainer');

deleteButton.addEventListener('click', borrarContenido);

function borrarContenido() {
  ticketContainer.innerHTML = '';
}
// Agregar un event listener al botón de comprar
buyButton.addEventListener('click', comprarTickets);

// Función para procesar la compra de tickets
function comprarTickets() {
  const category = categorySelect.value;
  const quantity = parseInt(quantityInput.value);

  // Validar que se haya ingresado una cantidad válida
  if (isNaN(quantity) || quantity < 1) {
    alert('Ingrese una cantidad válida de tickets.');
    return;
  }

// Calcular el precio unitario y aplicar descuentos según la categoría
let pricePerTicket = 200; // Precio base
if (category === 'Estudiante') {
  pricePerTicket *= 0.2; // Aplicar descuento del 20% para estudiantes
} else if (category === 'Trainee') {
  pricePerTicket *= 0.5; // Aplicar descuento del 50% para adultos mayores
} else if (category === 'Junior') {
  pricePerTicket *= 0.85; // Aplicar descuento del 15% para la categoría Junior
}

// Calcular el precio total
const totalPrice = pricePerTicket * quantity;

// Crear el elemento de precio total
const totalPriceElement = document.createElement('div');
totalPriceElement.classList.add('total-price');
totalPriceElement.textContent = `Total a pagar: $${totalPrice.toFixed(2)}`;
ticketContainer.appendChild(totalPriceElement);

// Crear los elementos de ticket y agregarlos al contenedor
for (let i = 1; i <= quantity; i++) {
  const ticketElement = document.createElement('div');
  ticketElement.classList.add('ticket');
  ticketContainer.appendChild(ticketElement);
}

ticketContainer.classList.remove('d-none');

}
