// Sample product data
const products = [
    { id: 1, name: "T-Shirt", price: 19.99, category: "Clothes", image: "https://media.istockphoto.com/id/1328049157/photo/mens-short-sleeve-t-shirt-mockup-in-front-and-back-views.jpg?b=1&s=612x612&w=0&k=20&c=naPy6RFK_tPbgo8FK4FFsn2_aWKUuqTC_Gw-wDG2xss=" },
    { id: 2, name: "Jeans", price: 49.99, category: "Clothes", image: "https://media.istockphoto.com/id/527236518/photo/mans-legs.jpg?s=612x612&w=0&k=20&c=lczyG0ZkWelpn_o-I_VpjAMo_sA3WpdWHMlgZjCSE-k=" },
    { id: 3, name: "Smartphone", price: 599.99, category: "Electronics", image: "https://images.news18.com/ibnlive/uploads/2022/03/iphone-13-make-in-india.jpg" },
    { id: 4, name: "Laptop", price: 999.99, category: "Electronics", image: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/surface-laptop-7th-edition-black-13-compare-render-copilot?scl=1" },
    { id: 5, name: "Handmade Scarf", price: 29.99, category: "Handmade Crafts", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGId98703GRE3PKssiTrSDmJitK6SeV2lvpA&s" },
    { id: 6, name: "Pottery Vase", price: 39.99, category: "Handmade Crafts", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0oMlL2loqYepqI4wrRkWmOt4h1u7Pwnn4Ww&s" },
];

let cart = [];

// Function to display products on the products page

function displayProducts() {
    const productList = document.getElementById('product-list');
    
    if (!productList) return;

    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">₹${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    alert(`${product.name} added to the cart.`);
    //alert("Your product has been added to cart");
    updateCartDisplay();
    saveCart();
}

// Function to remove a product from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCart();
}

// Function to update the quantity of a product in the cart
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
            saveCart();
        }
    }
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const checkoutItems = document.getElementById('checkout-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutTotal = document.getElementById('checkout-total');

    if (cartItems) {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const itemCard = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">₹${item.price.toFixed(2)}</p>
                        <div class="quantity-control">
                            <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            `;
            cartItems.innerHTML += itemCard;
        });
    }

    if (checkoutItems) {
        checkoutItems.innerHTML = '';
        cart.forEach(item => {
            const itemCard = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">₹${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                </div>
            `;
            checkoutItems.innerHTML += itemCard;
        });
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (cartTotal) cartTotal.textContent = total.toFixed(2);
    if (checkoutTotal) checkoutTotal.textContent = total.toFixed(2);
}

// Function to save the cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load the cart from local storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Event listener for the checkout form
document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your order!');
            cart = [];
            saveCart();
            updateCartDisplay();
            window.location.href = 'index.html';
        });
    }

    displayProducts();
    loadCart();
});