// === Auto Scrolling Marquee ===
const scrollTrack = document.getElementById("scrollTrack");

let scrollSpeed = 1; // pixels per frame
let scrollPos = 0;

function animateScroll() {
  scrollPos += scrollSpeed;

  if (scrollPos >= scrollTrack.scrollWidth / 2) {
    scrollPos = 0;
  }

  scrollTrack.style.transform = `translateX(-${scrollPos}px)`;
  requestAnimationFrame(animateScroll);
}

animateScroll();

// === Cart Logic ===
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartAmount = document.querySelector('.cart-amount');
const addToCartButtons = document.querySelectorAll('.product-card button');

// Update the cart badge display
function updateCartDisplay() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartAmount.textContent = totalItems;
}

// Add to cart functionality
addToCartButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const productCard = btn.closest('.product-card');
    const name = productCard.querySelector('h3').textContent;
    const price = parseFloat(productCard.querySelector('.price').textContent.replace('₹', ''));
    let image = productCard.querySelector('img').getAttribute('src');
    image = new URL(image, location.origin).href; // ✅ reliable full URL

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        name: name,
        price: price,
        image: image,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  });
});

// Show initial cart quantity on page load
updateCartDisplay();
// === Search Feature ===
const searchInput = document.getElementById("srchBox");
const productCards = document.querySelectorAll(".product-card");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  productCards.forEach((card) => {
    const productName = card.querySelector("h3").textContent.toLowerCase();
    card.classList.toggle("hidden", !productName.includes(searchTerm));
  });
});


