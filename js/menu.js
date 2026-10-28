const SIZE_EXTRA = { S: 0, M: 5000, L: 10000 };
const TOPPING_EXTRA = {
  "trân châu": 5000,
  "kem cheese": 10000,
};

const MENU = [
  {
    id: "cafe-sua",
    name: "Cà phê sữa đá",
    basePrice: 25000,
    emoji: "☕",
    color: "#c4a484",
    available: true,
  },
  {
    id: "bac-xiu",
    name: "Bạc xỉu",
    basePrice: 30000,
    emoji: "🥛",
    color: "#f0e0c8",
    available: true,
  },
  {
    id: "tra-dao",
    name: "Trà đào cam sả",
    basePrice: 35000,
    emoji: "🍑",
    color: "#f5b895",
    available: true,
  },
  {
    id: "matcha",
    name: "Matcha latte",
    basePrice: 42000,
    emoji: "🍵",
    color: "#a8c686",
    available: false,
  },
  {
    id: "cacao",
    name: "Cacao đá xay",
    basePrice: 38000,
    emoji: "🍫",
    color: "#b08968",
    available: true,
  },
  {
    id: "sinh-to-bo",
    name: "Sinh tố bơ",
    basePrice: 45000,
    emoji: "🥑",
    color: "#9ccc65",
    available: true,
  },
];

const CART_KEY = "coffee-cart";

function formatVnd(amount) {
  return amount.toLocaleString("vi-VN") + "đ";
}

function calcPrice(basePrice, size, toppings) {
  const toppingSum = toppings.reduce(
    (sum, name) => sum + (TOPPING_EXTRA[name] || 0),
    0
  );
  return basePrice + (SIZE_EXTRA[size] || 0) + toppingSum;
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

let cart = loadCart();

function getItemState(itemId) {
  const root = document.querySelector(`[data-item-id="${itemId}"]`);
  const size = root.querySelector('input[name="size-' + itemId + '"]:checked').value;
  const toppings = [...root.querySelectorAll('input[name="topping-' + itemId + '"]:checked')].map(
    (el) => el.value
  );
  return { size, toppings };
}

function updateLivePrice(item) {
  const { size, toppings } = getItemState(item.id);
  const price = calcPrice(item.basePrice, size, toppings);
  const el = document.getElementById("live-" + item.id);
  el.textContent = formatVnd(price);
}

function renderMenu() {
  const menuEl = document.getElementById("menu");
  menuEl.innerHTML = MENU.map((item) => {
    const sold = !item.available;
    return `
      <article class="item${sold ? " is-soldout" : ""}" data-item-id="${item.id}">
        <div class="emoji" style="background:${item.color}" aria-hidden="true">${item.emoji}</div>
        <div class="item-body">
          <div class="item-top">
            <h2>
              ${item.name}
              ${sold ? '<span class="badge">Hết</span>' : ""}
            </h2>
            <div class="base-price">Giá gốc ${formatVnd(item.basePrice)}</div>
          </div>
          <div class="options">
            <div class="opt-row">
              <span class="opt-label">Size</span>
              <label><input type="radio" name="size-${item.id}" value="S" checked /> S</label>
              <label><input type="radio" name="size-${item.id}" value="M" /> M (+5.000đ)</label>
              <label><input type="radio" name="size-${item.id}" value="L" /> L (+10.000đ)</label>
            </div>
            <div class="opt-row">
              <span class="opt-label">Topping</span>
              <label><input type="checkbox" name="topping-${item.id}" value="trân châu" /> Trân châu (+5.000đ)</label>
              <label><input type="checkbox" name="topping-${item.id}" value="kem cheese" /> Kem cheese (+10.000đ)</label>
            </div>
          </div>
          <div class="item-foot">
            <div class="live-price">Tạm tính: <span id="live-${item.id}">${formatVnd(item.basePrice)}</span></div>
            <button
              type="button"
              class="btn-add"
              data-add="${item.id}"
              ${sold ? "disabled" : ""}
            >${sold ? "Hết" : "Thêm vào giỏ"}</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  MENU.forEach((item) => {
    const root = document.querySelector(`[data-item-id="${item.id}"]`);
    root.querySelectorAll("input").forEach((input) => {
      input.addEventListener("change", () => updateLivePrice(item));
    });
  });

  menuEl.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = MENU.find((m) => m.id === btn.dataset.add);
      if (!item || !item.available) return;
      const { size, toppings } = getItemState(item.id);
      const price = calcPrice(item.basePrice, size, toppings);
      cart.push({
        lineId: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        itemId: item.id,
        name: item.name,
        emoji: item.emoji,
        size,
        toppings: [...toppings],
        price,
      });
      saveCart(cart);
      renderCart();
    });
  });
}

function cartTotal() {
  return cart.reduce((sum, line) => sum + line.price, 0);
}

function renderCart() {
  const el = document.getElementById("cart-content");
  if (!cart.length) {
    el.innerHTML = '<p class="cart-empty">Giỏ đang trống.</p>';
    return;
  }

  el.innerHTML = `
    <ul class="cart-list">
      ${cart
        .map((line) => {
          const toppingText = line.toppings.length
            ? line.toppings.join(", ")
            : "không topping";
          return `
            <li class="cart-line">
              <div class="cart-line-main">
                <div>
                  <p class="cart-line-title">${line.emoji} ${line.name}</p>
                  <p class="cart-line-meta">Size ${line.size} · ${toppingText}</p>
                </div>
                <div class="cart-line-price">${formatVnd(line.price)}</div>
              </div>
              <button type="button" class="btn-remove" data-remove="${line.lineId}">Bỏ</button>
            </li>
          `;
        })
        .join("")}
    </ul>
    <div class="cart-total">
      <span>Tổng tiền</span>
      <strong>${formatVnd(cartTotal())}</strong>
    </div>
  `;

  el.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      cart = cart.filter((line) => line.lineId !== btn.dataset.remove);
      saveCart(cart);
      renderCart();
    });
  });
}

renderMenu();
renderCart();
