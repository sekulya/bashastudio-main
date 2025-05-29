let query = JSON.parse(localStorage.getItem("search"));

initial();

async function initial() {
  let res = await fetch(``); // Your API here
  let products = await res.json();
  display(products);
}

document.querySelector("#sortPrice").addEventListener("change",sortByPrice);

async function sortByPrice() {
  let selected = document.querySelector("#sortPrice").value;
  let res = await fetch(``); // Your API here
  let products = await res.json();
  if(selected == "low") {
    products.sort((a,b) => a.price - b.price);
  }
  if(selected == "high") {
    products.sort((a,b) => b.price - a.price);
  }
  if(selected == "less"){
    products = products.filter(product => product.price <= 2000);
  }
  if(selected == "greater"){
    products = products.filter(product => product.price >= 500);
  }
  display(products);
}

function display(data) {
  let main = document.getElementById("main");
  main.innerHTML = "";
  data.forEach(function(elem) {
    let div = document.createElement("div");

    div.innerHTML = `
      <img src="${elem.imgUrl}" alt="">
      <div class="flex">
        <p class='underline'>${elem.prod_name}</p>
        <div>
          <p style="text-decoration:line-through">₹ ${elem.strikedOffPrice}</p>
          <p><span>${elem.prod_discount}</span> ₹ ${elem.price}</p>
        </div>
      </div>
      <button class="add-to-cart-btn">Add to Cart</button>
    `;

    // Product info navigation (existing behavior)
    div.querySelector(".underline").addEventListener("click", function(e) {
      e.stopPropagation();
      selectProd(elem);
    });

    // Add to Cart button
    div.querySelector(".add-to-cart-btn").addEventListener("click", function(e) {
      e.stopPropagation();
      addToCart(elem);
    });

    main.appendChild(div);
  });
}

// Navigate to product info page
function selectProd(elem) {
  localStorage.setItem("product", JSON.stringify(elem));
  window.location.href = "./product.html";
}

// Add item to cart in localStorage
function addToCart(elem) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  // Try to identify the same product by name and price
  let idx = cart.findIndex(item => item.prod_name === elem.prod_name && item.price === elem.price);
  if(idx > -1) {
    cart[idx].quantity = (cart[idx].quantity || 1) + 1;
  } else {
    let toCart = {
      ...elem,
      quantity: 1
    };
    cart.push(toCart);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${elem.prod_name} added to cart!`);
}