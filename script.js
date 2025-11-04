// ====== KATALOG PRODUK ======
const productList = document.getElementById("product-list");
if (productList && typeof products !== "undefined") {
  products.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>Rp ${p.price.toLocaleString("id-ID")}</p>
      <div class="product-actions">
        <button class="buy-btn" onclick="addToCart('${p.name}', ${p.price}, '${p.image}')">Tambah ke Keranjang</button>
      </div>
    `;
    productList.appendChild(card);
  });
}

// ====== FUNGSI TAMBAH KE KERANJANG ======
function addToCart(name, price, image) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price: Number(price), image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} berhasil ditambahkan ke keranjang!`);
  updateCartCount();
}

// ====== PERBARUI JUMLAH ITEM DI KERANJANG ======
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = cart.length;
}
updateCartCount();

// ====== KOMUNITAS (KOMENTAR) ======
const form = document.getElementById("comment-form");
const commentList = document.getElementById("comment-list");

if (form) {
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  function displayComments() {
    commentList.innerHTML = "";
    comments.forEach(c => {
      const div = document.createElement("div");
      div.classList.add("comment");
      div.innerHTML = `<strong>${c.user}</strong><p>${c.text}</p>`;
      commentList.appendChild(div);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const user = document.getElementById("username").value.trim();
    const text = document.getElementById("comment").value.trim();
    if (user && text) {
      comments.push({ user, text });
      localStorage.setItem("comments", JSON.stringify(comments));
      displayComments();
      form.reset();
    }
  });

  displayComments();
}

// ====== FITUR CHECKOUT & KERANJANG ======
if (window.location.pathname.includes("checkout.html")) {
  const tbody = document.querySelector("#cartTable tbody");
  const totalPrice = document.getElementById("totalPrice");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const adminNumber = "62895365527136";

  function renderCart() {
    if (!tbody) return;
    tbody.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const price = Number(item.price);
      const subtotal = price * item.qty;
      total += subtotal;

      const row = `
        <tr>
          <td><img src="${item.image}" width="50"> ${item.name}</td>
          <td>
            <button onclick="decreaseQty(${index})">-</button>
            ${item.qty}
            <button onclick="increaseQty(${index})">+</button>
          </td>
          <td>Rp ${price.toLocaleString("id-ID")}</td>
          <td>Rp ${subtotal.toLocaleString("id-ID")}</td>
          <td><button onclick="removeItem(${index})">Hapus</button></td>
        </tr>
      `;
      tbody.innerHTML += row;
    });

    totalPrice.textContent = `Total: Rp ${total.toLocaleString("id-ID")}`;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  window.increaseQty = function (index) {
    cart[index].qty += 1;
    renderCart();
  };

  window.decreaseQty = function (index) {
    if (cart[index].qty > 1) {
      cart[index].qty -= 1;
    } else {
      removeItem(index);
    }
    renderCart();
  };

  window.removeItem = function (index) {
    if (confirm(`Hapus ${cart[index].name}?`)) {
      cart.splice(index, 1);
      renderCart();
    }
  };

  const resetBtn = document.getElementById("resetCartBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Yakin mau hapus semua isi keranjang?")) {
        cart = [];
        localStorage.removeItem("cart");
        renderCart();
      }
    });
  }

  const sendProofBtn = document.getElementById("sendProofBtn");
  if (sendProofBtn) {
    sendProofBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Keranjang kosong!");
        return;
      }
      const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
      const listItems = cart.map(i => `${i.name} x${i.qty}`).join(", ");
      const message = `Halo Admin, saya sudah melakukan pembayaran sebesar *Rp ${total.toLocaleString("id-ID")}* untuk pesanan: ${listItems}.`;
      const waLink = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
      window.open(waLink, "_blank");
    });
  }

  renderCart();
}
// ====== SLIDER BANNER MANUAL + OTOMATIS ======
document.addEventListener("DOMContentLoaded", () => {
  const bannerSlides = document.querySelector(".promo-slider .slides");
  const totalBannerSlides = bannerSlides.children.length;
  let bannerCurrent = 0;

  window.moveBanner = function(direction) {
    bannerCurrent = (bannerCurrent + direction + totalBannerSlides) % totalBannerSlides;
    bannerSlides.style.transform = `translateX(-${bannerCurrent * 100}%)`;
    bannerSlides.style.transition = "transform 0.6s ease-in-out";
  };

  // auto-slide tiap 3 detik
  setInterval(() => moveBanner(1), 3000);
});

// ====== SLIDER TESTIMONI OTOMATIS ======
document.addEventListener("DOMContentLoaded", () => {
  const testiSlides = document.querySelector(".testimonial-slider .slides");
  const cards = testiSlides.querySelectorAll(".testimonial-card");
  const total = cards.length;
  const visible = 3; // jumlah testimoni tampil bersamaan
  let current = 0;

    function autoSlideTestimoni() {
      current++;
      if (current > total - visible) current = 0;
      testiSlides.style.transform = `translateX(-${current * (100 / visible)}%)`;
      testiSlides.style.transition = "transform 0.8s ease-in-out";
    }
  
    setInterval(autoSlideTestimoni, 3000);
  });