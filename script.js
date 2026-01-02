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
  showToast(`${name} ditambahkan!`, 'success');
  updateCartCount();
}

// ====== PEMBERITAHUAN TOAST CUSTOM ======
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
        toast.classList.add('hide');
        toast.addEventListener('animationend', () => toast.remove());
    }, 3000);
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

// ====== FILTER KATEGORI ======
function filterProducts(category) {
    // 1. Update button style
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase().includes(category) || 
           (category === 'all' && btn.innerText === 'Semua')) {
            btn.classList.add('active');
        }
    });

    // 2. Filter logic
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const itemCat = card.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
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

// ====== FILTER KATEGORI (Global) ======
window.filterProducts = function(category) {
    // 1. Update button style
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase().includes(category) || 
           (category === 'all' && btn.innerText === 'Semua')) {
            btn.classList.add('active');
        }
    });

    // 2. Filter logic
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const itemCat = card.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
};

// ====== FITUR CHECKOUT & KERANJANG ======
if (window.location.pathname.includes("checkout.html")) {
  const tbody = document.querySelector("#cartTable tbody");
  const totalValue = document.getElementById("totalValue");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const adminNumber = "62895365527136";

  function renderCart() {
    if (!tbody) return;
    tbody.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 40px; color: #777;">Keranjang Anda masih kosong. <a href="index.html" style="color:#9b4922; font-weight:bold;">Belanja Dulu Yuk!</a></td></tr>`;
        if(totalValue) totalValue.textContent = "Rp 0";
        return;
    }

    cart.forEach((item, index) => {
      const price = Number(item.price);
      const subtotal = price * item.qty;
      total += subtotal;
      
      // Image Mapping for fallback
      const productImages = {
        'RiceBowl Cumi': 'https://i.pinimg.com/1200x/a3/83/b2/a383b21f877213b403e307ff5ac3d102.jpg',
        'RiceBowl Chicken': 'https://i.pinimg.com/736x/1a/2d/ef/1a2defa61f585b67b97a902a42e4e3c0.jpg',
        'RiceBowl Daging': 'https://i.pinimg.com/736x/9a/17/be/9a17be400d3c37118f73c71ea4b8e42b.jpg',
        'RiceBowl Udang': 'https://i.pinimg.com/736x/1a/2d/ef/1a2defa61f585b67b97a902a42e4e3c0.jpg',
        'Milo': 'https://i.pinimg.com/736x/0f/de/75/0fde75dcdcf92050ebca1f896db5db1f.jpg',
        'Milo Ice': 'https://i.pinimg.com/736x/0f/de/75/0fde75dcdcf92050ebca1f896db5db1f.jpg',
        'Teh Tarik': 'https://i.pinimg.com/736x/85/ca/a7/85caa796e00f8eccc334c6cdd835e578.jpg',
        'Soft Cookies': 'https://uploads.onecompiler.io/42vbn3cw5/443myvsf5/gambar%20cookies.jpg',
        'Cookies Original': 'https://uploads.onecompiler.io/42vbn3cw5/443myvsf5/gambar%20cookies.jpg',
        'Cookies Matcha': 'https://teakandthyme.com/wp-content/uploads/2023/09/matcha-white-chocolate-cookies-DSC_5105-1x1-1200.jpg',
        'Cookies Red Velvet': 'https://img-global.cpcdn.com/recipes/9448b3de822b7161/680x781cq80/red-velvet-almond-cookies-foto-resep-utama.jpg',
        'Lemon Tea': 'https://img.freepik.com/premium-photo/iced-lemon-tea-plastic-takeaway-glass_861799-3261.jpg',
        'Bundle Hemat 1': 'https://img.freepik.com/premium-photo/iced-lemon-tea-plastic-takeaway-glass_861799-3261.jpg' 
      };

      // Fallback if image is missing
      let imgSrc = item.image;
      if (!imgSrc || imgSrc === 'undefined') {
          imgSrc = productImages[item.name] || 'https://placehold.co/60x60?text=No+Img';
      }

      const row = `
        <tr>
          <td>
            <img src="${imgSrc}" alt="${item.name}" width="60" height="60" onerror="this.src='https://placehold.co/60x60?text=Error'">
            <div style="text-align:left;">
                <div style="font-weight:600; font-size:1rem; color:#2c3e50;">${item.name}</div>
                <div style="font-size:0.85rem; color:#7f8c8d;">Rp ${price.toLocaleString("id-ID")}</div>
            </div>
          </td>
          <td style="text-align:center;">
            <div class="qty-control">
                <button class="qty-btn" onclick="decreaseQty(${index})">-</button>
                <span class="qty-val">${item.qty}</span>
                <button class="qty-btn" onclick="increaseQty(${index})">+</button>
            </div>
          </td>
          <td style="text-align:left;">Rp ${price.toLocaleString("id-ID")}</td>
          <td style="font-weight:600; color:#9b4922;">Rp ${subtotal.toLocaleString("id-ID")}</td>
          <td style="text-align:right;">
            <button class="btn-delete" onclick="removeItem(${index})">
                Hapus
            </button>
          </td>
        </tr>
      `;
      tbody.innerHTML += row;
    });

    if (totalValue) {
        totalValue.textContent = `Rp ${total.toLocaleString("id-ID")}`;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // Sync if badge exists
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
    const itemName = cart[index].name;
    showConfirm(`Hapus ${itemName}?`, () => {
        cart.splice(index, 1);
        renderCart();
        showToast(`${itemName} dihapus`, 'delete');
    });
  };

  const resetBtn = document.getElementById("resetCartBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      showConfirm("Yakin hapus semua?", () => {
        cart = [];
        localStorage.removeItem("cart");
        renderCart();
        showToast('Keranjang bersih', 'delete');
      });
    });
  }

// ====== CUSTOM CONFIRM MODAL ======
function showConfirm(message, onConfirm) {
    // Buat elemen modal jika belum ada
    let modal = document.getElementById('custom-confirm-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'custom-confirm-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-box">
                <div class="modal-title">Konfirmasi</div>
                <div class="modal-text" id="confirm-msg"></div>
                <div class="modal-actions">
                    <button class="modal-btn cancel" id="confirm-cancel">Batal</button>
                    <button class="modal-btn confirm" id="confirm-ok">Ya, Hapus</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const msgEl = document.getElementById('confirm-msg');
    const cancelBtn = document.getElementById('confirm-cancel');
    const okBtn = document.getElementById('confirm-ok');

    msgEl.textContent = message;
    modal.classList.add('show');

    // Bersihkan listener lama (supaya tidak numpuk)
    const newCancel = cancelBtn.cloneNode(true);
    const newOk = okBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);
    okBtn.parentNode.replaceChild(newOk, okBtn);

    newCancel.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    newOk.addEventListener('click', () => {
        onConfirm();
        modal.classList.remove('show');
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
      const listItems = cart.map(i => `• ${i.name} x${i.qty}`).join("\n");
      const message = `Halo Kak, saya sudah melakukan pembayaran sebesar *Rp ${total.toLocaleString("id-ID")}* untuk pesanan berikut:\n\n${listItems}\n\nMohon diproses ya kak. Terima kasih!`;
      const waLink = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
      window.open(waLink, "_blank");
    });
  }

  renderCart();
}
// ====== SLIDER BANNER MANUAL + OTOMATIS ======
// ====== SLIDER BANNER MANUAL + OTOMATIS ======
document.addEventListener("DOMContentLoaded", () => {
  const bannerSlides = document.querySelector(".promo-slider .slides");
  if (bannerSlides) {
      const totalBannerSlides = bannerSlides.children.length;
      let bannerCurrent = 0;

      window.moveSlide = function(direction) {
        bannerCurrent = (bannerCurrent + direction + totalBannerSlides) % totalBannerSlides;
        bannerSlides.style.transform = `translateX(-${bannerCurrent * 100}%)`;
        bannerSlides.style.transition = "transform 1s ease-in-out";
      };

      // auto-slide tiap 5 detik
      setInterval(() => moveSlide(1), 5000);
  }
});



// ====== SCROLL REVEAL ANIMATION ======
window.addEventListener('scroll', reveal);
function reveal() {
  var reveals = document.querySelectorAll('.reveal');
  for (var i = 0; i < reveals.length; i++) {
    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 150;
    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add('active');
    }
  }
}
// Trigger once on load
reveal();