let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const shipping = 40;
const tax = 30;

// function renderCart() {
//   cartItemsContainer.innerHTML = '';
//   let subtotal = 0;

//   cart.forEach((item, index) => {
//     subtotal += item.price * item.quantity;

//     const itemEl = document.createElement('div');
//     itemEl.className = 'cart-item';

//     itemEl.innerHTML = `
//       <img src="${item.image || 'https://via.placeholder.com/60'}" alt="${item.name}">
//       <div style="flex: 1">
//         <strong>${item.name}</strong><br>
//         ₹${item.price.toFixed(2)}
//       </div>
//       <div>
//         <button onclick="changeQty(${index}, -1)">−</button>
//         <span style="margin: 0 10px">${item.quantity}</span>
//         <button onclick="changeQty(${index}, 1)">+</button>
//       </div>
//       <div>₹${(item.price * item.quantity).toFixed(2)}</div>
//       <button onclick="removeItem(${index})" style="margin-left: 10px;">🗑️</button>
//     `;

//     cartItemsContainer.appendChild(itemEl);
//   });

//   subtotalEl.innerText = subtotal.toFixed(2);
//   totalEl.innerText = (subtotal + shipping + tax).toFixed(2);
// }
function renderCart() {
  cartItemsContainer.innerHTML = '';
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';

    itemEl.innerHTML = `
      <img src="${item.image || 'https://via.placeholder.com/60'}" alt="${item.name}">
      <div style="flex: 1">
        <strong>${item.name}</strong><br>
        ₹${item.price.toFixed(2)}
      </div>
      <div>
        <button onclick="changeQty(${index}, -1)">−</button>
        <span style="margin: 0 10px">${item.quantity}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
      </div>
      <div>₹${(item.price * item.quantity).toFixed(2)}</div>
      <button onclick="removeItem(${index})" style="margin-left: 10px;">🗑️</button>
    `;

    cartItemsContainer.appendChild(itemEl);
  });

  subtotalEl.innerText = subtotal.toFixed(2);
  const total = subtotal + shipping + tax;
  totalEl.innerText = total.toFixed(2);

  // ✅ Save to localStorage so pay.html can access it
  localStorage.setItem("totalAmount", total);
}


function changeQty(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveAndRender();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// document.getElementById('checkout').onclick = () => {
//   alert('Proceeding to payment gateway...');
//   // Integrate Razorpay or redirect here
// };

renderCart();
