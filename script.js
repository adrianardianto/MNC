// ====== DATA PRODUK (CENTRALIZED) ======
const products = [
  { name: "RiceBowl Cumi", category: "makanan", price: 16000, image: "https://i.pinimg.com/1200x/a3/83/b2/a383b21f877213b403e307ff5ac3d102.jpg" },
  { name: "RiceBowl Chicken", category: "makanan", price: 16000, image: "https://i.pinimg.com/736x/1a/2d/ef/1a2defa61f585b67b97a902a42e4e3c0.jpg" },
  { name: "RiceBowl Daging", category: "makanan", price: 16000, image: "https://i.pinimg.com/736x/9a/17/be/9a17be400d3c37118f73c71ea4b8e42b.jpg" },
  { name: "Milo Ice", category: "minuman", price: 8000, image: "https://i.pinimg.com/736x/0f/de/75/0fde75dcdcf92050ebca1f896db5db1f.jpg" },
  { name: "Teh Tarik", category: "minuman", price: 7000, image: "https://i.pinimg.com/736x/85/ca/a7/85caa796e00f8eccc334c6cdd835e578.jpg" },
  { name: "Cookies Original", category: "snack", price: 5000, image: "https://uploads.onecompiler.io/42vbn3cw5/443myvsf5/gambar%20cookies.jpg" },
  { name: "Cookies Matcha", category: "snack", price: 6000, image: "https://teakandthyme.com/wp-content/uploads/2023/09/matcha-white-chocolate-cookies-DSC_5105-1x1-1200.jpg" },
  { name: "Cookies Red Velvet", category: "snack", price: 6000, image: "https://img-global.cpcdn.com/recipes/9448b3de822b7161/680x781cq80/red-velvet-almond-cookies-foto-resep-utama.jpg" },
  { name: "Lemon Tea", category: "minuman", price: 6000, image: "https://img.freepik.com/premium-photo/iced-lemon-tea-plastic-takeaway-glass_861799-3261.jpg" }
];

// ====== KATALOG PRODUK RENDER ======
const productList = document.getElementById("product-list");
if (productList) {
  productList.innerHTML = ""; // Clear manual content
  products.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.setAttribute("data-category", p.category);
    // Note: Added fallback for image error
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/300x200?text=No+Image'">
      <h3>${p.name}</h3>
      <p>Rp ${p.price.toLocaleString("id-ID")}</p>
      <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}')">Tambah ke Keranjang</button>
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
  const adminNumber = "62895326392811";

  function renderCart() {
    if (!tbody) return;
    tbody.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="border:none; display: table-cell; text-align: center; width: 100%;">
                    <div class="empty-cart-state">
                        <div class="empty-cart-icon">
                            <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty Cart" width="120" style="opacity:0.8; margin-bottom: 20px;">
                        </div>
                        <h3 style="color:#2c3e50; font-size:1.5rem; margin-bottom:10px;">Wah, Keranjang Kosong!</h3>
                        <p style="color:#7f8c8d; margin-bottom:25px;">Sepertinya Anda belum memilih menu favorit nih.</p>
                        <a href="index.html#katalog" class="btn-empty-cart">
                            Mulai Belanja Sekarang
                        </a>
                    </div>
                </td>
            </tr>
        `;
        if(totalValue) totalValue.textContent = "Rp 0";
        return;
    }

    cart.forEach((item, index) => {
      const price = Number(item.price);
      const subtotal = price * item.qty;
      total += subtotal;
      
      // Image Lookup from centralized data
      let productData = products.find(p => p.name === item.name);
      let imgSrc = item.image; // Define it first
      
      // If item.image is missing or invalid, try to find in productData
      if (!imgSrc || imgSrc === 'undefined') {
          if (productData) {
              imgSrc = productData.image;
          } else {
              imgSrc = 'https://placehold.co/60x60?text=No+Img';
          }
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
      
      const listItems = cart.map(i => {
          const sub = i.price * i.qty;
          return `• ${i.name} (x${i.qty})\n   @ Rp ${Number(i.price).toLocaleString("id-ID")} = Rp ${sub.toLocaleString("id-ID")}`;
      }).join("\n");

      const message = `Halo Kak, saya sudah melakukan pembayaran sebesar *Rp ${total.toLocaleString("id-ID")}* untuk pesanan berikut:\n\n${listItems}\n\n*Total Bayar: Rp ${total.toLocaleString("id-ID")}*\n\nBerikut lampiran bukti pembayarannya:\n(Silakan kirim foto bukti transfer disini)\n\nMohon diproses ya kak. Terima kasih!`;
      
      const waLink = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
      window.open(waLink, "_blank");
    });
  }

  renderCart();
}
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

// ====== LOGIKA KOMUNITAS (CRUD + KOMENTAR + FILTER) ======
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitPost');
    const feedContainer = document.getElementById('feed');
    const btnNewest = document.getElementById('btnNewest');
    const btnOldest = document.getElementById('btnOldest');
    
    let isEditing = false;
    let editId = null;
    let currentSort = 'newest'; // 'newest' or 'oldest'
    
    if (submitBtn && feedContainer) {
        // 1. Initial Render
        renderFeed();

        // 2. Filter Listeners
        if(btnNewest && btnOldest) {
            btnNewest.addEventListener('click', () => {
                currentSort = 'newest';
                btnNewest.classList.add('active');
                btnOldest.classList.remove('active');
                renderFeed();
            });
            btnOldest.addEventListener('click', () => {
                currentSort = 'oldest';
                btnOldest.classList.add('active');
                btnNewest.classList.remove('active');
                renderFeed();
            });
        }

        // 3. Handle New Post / Edit Post
        submitBtn.addEventListener('click', () => {
            const user = document.getElementById('username');
            const title = document.getElementById('title');
            const content = document.getElementById('content');

            if (user.value.trim() === '' || title.value.trim() === '' || content.value.trim() === '') {
                alert('Mohon lengkapi semua kolom ya kak!');
                return;
            }

            const posts = JSON.parse(localStorage.getItem('communityPosts')) || [];

            if (isEditing) {
                // UPDATE Logic
                const postIndex = posts.findIndex(p => p.id === editId);
                if (postIndex !== -1) {
                    posts[postIndex].user = user.value;
                    posts[postIndex].title = title.value;
                    posts[postIndex].content = content.value;
                    localStorage.setItem('communityPosts', JSON.stringify(posts));
                    showToast('Cerita berhasil diperbarui!');
                }
                isEditing = false;
                editId = null;
                submitBtn.textContent = "Posting Cerita";
            } else {
                // CREATE Logic
                const newPost = {
                    id: Date.now(),
                    user: user.value,
                    title: title.value,
                    content: content.value,
                    date: new Date().toISOString(),
                    likes: 0,
                    likedBy: [],
                    comments: []
                };
                posts.unshift(newPost);
                localStorage.setItem('communityPosts', JSON.stringify(posts));
                showToast('Cerita berhasil diposting!');
            }

            renderFeed();
            
            // Reset form
            user.value = '';
            title.value = '';
            content.value = '';
        });

        // 4. Render Function
        function renderFeed() {
            let posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
            feedContainer.innerHTML = '';

            if (posts.length === 0) {
                feedContainer.innerHTML = '<p style="text-align:center; color:#777; padding:20px;">Belum ada cerita nih. Jadilah yang pertama!</p>';
                return;
            }

            // Sorting Logic (Safe)
            posts.sort((a, b) => {
                const dateA = a.date ? new Date(a.date) : new Date(0);
                const dateB = b.date ? new Date(b.date) : new Date(0);
                return currentSort === 'newest' ? dateB - dateA : dateA - dateB;
            });

            posts.forEach(post => {
                const date = new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                
                // Render Comments
                let commentsHtml = '';
                if (post.comments && post.comments.length > 0) {
                    commentsHtml = '<div style="margin-top:15px; padding-top:15px; border-top:1px dashed #eee;">';
                    post.comments.forEach(c => {
                        commentsHtml += `
                            <div style="background:#f9f9f9; padding:10px; border-radius:8px; margin-bottom:8px;">
                                <div style="font-weight:bold; font-size:0.85rem; color:#2c3e50;">${c.user}</div>
                                <div style="font-size:0.9rem; color:#555;">${c.text}</div>
                            </div>
                        `;
                    });
                    commentsHtml += '</div>';
                }

                const card = document.createElement('div');
                card.className = 'post-card reveal';
                card.style.cssText = 'margin: 0 0 20px 0; background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #eee; position: relative;';
                
                card.innerHTML = `
                    <div class="post-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:15px;">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <img src="https://ui-avatars.com/api/?name=${post.user}&background=random" style="width:40px; height:40px; border-radius:50%;">
                            <div>
                                <div style="font-weight:bold; color:#2c3e50;">${post.user}</div>
                                <div style="font-size:0.8rem; color:#888;">${date}</div>
                            </div>
                        </div>
                        <div class="post-actions">
                            <button onclick="editPost(${post.id})" style="background:none; border:none; color:#f39c12; cursor:pointer; margin-right:5px;"><i class="fas fa-edit"></i> Edit</button>
                            <button onclick="deletePost(${post.id})" style="background:none; border:none; color:#e74c3c; cursor:pointer;"><i class="fas fa-trash"></i> Hapus</button>
                        </div>
                    </div>
                    <h3 style="margin-bottom:10px; color:#9b4922;">${post.title}</h3>
                    <p style="line-height:1.6; color:#444; margin-bottom:15px;">${post.content}</p>
                    
                    <div class="post-footer" style="display:flex; flex-wrap:wrap; gap:15px; border-top:1px solid #f0f0f0; padding-top:15px; align-items:center;">
                        <button onclick="likePost(${post.id})" class="action-btn" style="background:none; border:none; color:#777; cursor:pointer; font-weight:600; display:flex; align-items:center; gap:5px;">
                            <span id="like-icon-${post.id}" style="color:${post.likes > 0 ? '#e74c3c' : '#ccc'}; font-size:1.2rem; transition: transform 0.2s;">❤</span> 
                            <span id="like-count-${post.id}">${post.likes}</span> Suka
                        </button>
                        <button onclick="toggleCommentBox(${post.id})" class="action-btn" style="background:none; border:none; color:#777; cursor:pointer; font-weight:600; display:flex; align-items:center; gap:5px;">
                            <span style="font-size:1.2rem;">💬</span> ${post.comments.length} Komentar
                        </button>
                    </div>

                    <!-- Comment Section -->
                    <div id="comment-box-${post.id}" style="display:none; margin-top:15px;">
                        <input type="text" id="comment-name-${post.id}" placeholder="Nama (Opsional)" style="width:100%; margin-bottom:10px; padding:8px 12px; border:1px solid #ddd; border-radius:20px; outline:none; font-size:0.9rem;">
                        <div style="display:flex; gap:10px;">
                            <input type="text" id="comment-input-${post.id}" placeholder="Tulis komentar..." style="flex:1; padding:8px 12px; border:1px solid #ddd; border-radius:20px; outline:none;">
                            <button onclick="addComment(${post.id})" style="background:#9b4922; color:white; border:none; padding:8px 15px; border-radius:20px; cursor:pointer;">Kirim</button>
                        </div>
                    </div>

                    ${commentsHtml}
                `;
                feedContainer.appendChild(card);
            });
        }

        // 5. Global Like Function (Optimized)
        window.likePost = function(id) {
            // UI Update First (Optimistic)
            const countSpan = document.getElementById(`like-count-${id}`);
            const iconSpan = document.getElementById(`like-icon-${id}`);
            
            if (countSpan && iconSpan) {
                let currentLikes = parseInt(countSpan.innerText);
                countSpan.innerText = currentLikes + 1;
                iconSpan.style.color = '#e74c3c';
                iconSpan.style.transform = 'scale(1.3)'; // Pop effect
                setTimeout(() => iconSpan.style.transform = 'scale(1)', 200);
            }

            // Logic Update Background
            const posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
            const post = posts.find(p => p.id === id);
            if (post) {
                post.likes += 1;
                localStorage.setItem('communityPosts', JSON.stringify(posts));
            }
        };

        // 6. Delete Function
        window.deletePost = function(id) {
            if (confirm('Yakin ingin menghapus cerita ini?')) {
                let posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
                posts = posts.filter(p => p.id !== id);
                localStorage.setItem('communityPosts', JSON.stringify(posts));
                renderFeed();
                showToast('Cerita dihapus.', 'delete');
            }
        };

        // 7. Edit Function
        window.editPost = function(id) {
            const posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
            const post = posts.find(p => p.id === id);
            if (post) {
                document.getElementById('username').value = post.user;
                document.getElementById('title').value = post.title;
                document.getElementById('content').value = post.content;
                
                isEditing = true;
                editId = id;
                document.getElementById('submitPost').textContent = "Simpan Perubahan";
                
                document.querySelector('.post-form-card').scrollIntoView({ behavior: 'smooth' });
            }
        };

        // 8. Toggle Comment Box
        window.toggleCommentBox = function(id) {
            const box = document.getElementById(`comment-box-${id}`);
            if (box.style.display === 'none') {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        };

         // 9. Add Comment
         // 9. Add Comment
         window.addComment = function(id) {
             const nameInput = document.getElementById(`comment-name-${id}`);
             const textInput = document.getElementById(`comment-input-${id}`);
             
             const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Anonim';
             const text = textInput.value.trim();
             
             if (!text) return;

             const posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
             const post = posts.find(p => p.id === id);
             if (post) {
                 if (!post.comments) post.comments = [];
                 post.comments.push({
                     user: name, 
                     text: text,
                     date: new Date().toISOString()
                 });
                 localStorage.setItem('communityPosts', JSON.stringify(posts));
                 renderFeed();
             }
         };
    }
});