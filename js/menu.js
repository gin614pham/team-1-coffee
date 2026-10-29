const SIZE_EXTRA = { S: 0, M: 5000, L: 10000 };
const TOPPING_EXTRA = {
  "タピオカ": 5000,
  "チーズクリーム": 10000,
};

const MENU = [
  {
    id: "cafe-sua",
    name: "アイスミルクコーヒー",
    basePrice: 25000,
    emoji: "☕",
    color: "#c4a484",
    available: true,
  },
  {
    id: "bac-xiu",
    name: "バクシウ",
    basePrice: 30000,
    emoji: "🥛",
    color: "#f0e0c8",
    available: true,
  },
  {
    id: "tra-dao",
    name: "ピーチオレンジレモングラスティー",
    basePrice: 35000,
    emoji: "🍑",
    color: "#f5b895",
    available: true,
  },
  {
    id: "matcha",
    name: "抹茶ラテ",
    basePrice: 42000,
    emoji: "🍵",
    color: "#a8c686",
    available: false,
  },
  {
    id: "cacao",
    name: "ココアフラッペ",
    basePrice: 38000,
    emoji: "🍫",
    color: "#b08968",
    available: true,
  },
  {
    id: "sinh-to-bo",
    name: "アボカドスムージー",
    basePrice: 45000,
    emoji: "🥑",
    color: "#9ccc65",
    available: true,
  },
];

const CART_KEY = "coffee-cart";
const ORDERS_KEY = "coffee-orders";

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

const QTY_ERROR = "数量は0より大きくしてください";

function normalizeQuantity(value) {
  return Number.isInteger(value) && value >= 1 ? value : 1;
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((line) => ({
      ...line,
      toppings: Array.isArray(line.toppings) ? line.toppings : [],
      quantity: normalizeQuantity(line.quantity),
    }));
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function toppingKey(toppings) {
  return [...toppings].sort().join("\0");
}

function isSameCartLine(a, b) {
  return (
    a.itemId === b.itemId &&
    a.size === b.size &&
    toppingKey(a.toppings) === toppingKey(b.toppings)
  );
}

function lineTotal(line) {
  return line.price * normalizeQuantity(line.quantity);
}

let cart = loadCart();
let qtyErrorLineId = null;

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
              ${sold ? '<span class="badge">売り切れ</span>' : ""}
            </h2>
            <div class="base-price">基本価格 ${formatVnd(item.basePrice)}</div>
          </div>
          <div class="options">
            <div class="opt-row">
              <span class="opt-label">サイズ</span>
              <label><input type="radio" name="size-${item.id}" value="S" checked /> S</label>
              <label><input type="radio" name="size-${item.id}" value="M" /> M (+5.000đ)</label>
              <label><input type="radio" name="size-${item.id}" value="L" /> L (+10.000đ)</label>
            </div>
            <div class="opt-row">
              <span class="opt-label">トッピング</span>
              <label><input type="checkbox" name="topping-${item.id}" value="タピオカ" /> タピオカ (+5.000đ)</label>
              <label><input type="checkbox" name="topping-${item.id}" value="チーズクリーム" /> チーズクリーム (+10.000đ)</label>
            </div>
          </div>
          <div class="item-foot">
            <div class="live-price">小計: <span id="live-${item.id}">${formatVnd(item.basePrice)}</span></div>
            <button
              type="button"
              class="btn-add"
              data-add="${item.id}"
              ${sold ? "disabled" : ""}
            >${sold ? "売り切れ" : "カートに入れる"}</button>
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
      const match = cart.find((line) =>
        isSameCartLine(line, { itemId: item.id, size, toppings })
      );
      if (match) {
        match.quantity = normalizeQuantity(match.quantity) + 1;
      } else {
        cart.push({
          lineId: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
          itemId: item.id,
          name: item.name,
          emoji: item.emoji,
          size,
          toppings: [...toppings],
          price,
          quantity: 1,
        });
      }
      qtyErrorLineId = null;
      saveCart(cart);
      renderCart();
    });
  });
}

function cartTotal() {
  return cart.reduce((sum, line) => sum + lineTotal(line), 0);
}

function showQtyError(lineId) {
  qtyErrorLineId = lineId;
  renderCart();
}

function setLineQuantity(lineId, nextQty) {
  const line = cart.find((item) => item.lineId === lineId);
  if (!line) return;
  if (!Number.isInteger(nextQty) || nextQty < 1) {
    showQtyError(lineId);
    return;
  }
  line.quantity = nextQty;
  qtyErrorLineId = null;
  saveCart(cart);
  renderCart();
}

function parseQuantityInput(raw) {
  const trimmed = String(raw).trim();
  if (!trimmed) return null;
  if (!/^\d+$/.test(trimmed)) return null;
  return Number(trimmed);
}

function renderCart() {
  const el = document.getElementById("cart-content");
  if (!cart.length) {
    el.innerHTML = '<p class="cart-empty">カートは空です。</p>';
    return;
  }

  el.innerHTML = `
    <ul class="cart-list">
      ${cart
        .map((line) => {
          const quantity = normalizeQuantity(line.quantity);
          const toppingText = line.toppings.length
            ? line.toppings.join(", ")
            : "トッピングなし";
          const errorHtml =
            qtyErrorLineId === line.lineId
              ? `<p class="qty-error">${QTY_ERROR}</p>`
              : "";
          return `
            <li class="cart-line">
              <div class="cart-line-main">
                <div>
                  <p class="cart-line-title">${line.emoji} ${line.name}</p>
                  <p class="cart-line-meta">サイズ ${line.size} · ${toppingText}</p>
                </div>
                <div class="cart-line-price">${formatVnd(lineTotal(line))}</div>
              </div>
              <div class="qty-row">
                <button type="button" class="btn-qty" data-dec="${line.lineId}" aria-label="減らす">−</button>
                <input
                  class="qty-input"
                  type="text"
                  inputmode="numeric"
                  value="${quantity}"
                  data-qty="${line.lineId}"
                  aria-label="数量"
                />
                <button type="button" class="btn-qty" data-inc="${line.lineId}" aria-label="増やす">+</button>
                <button type="button" class="btn-remove" data-remove="${line.lineId}">削除</button>
              </div>
              ${errorHtml}
            </li>
          `;
        })
        .join("")}
    </ul>
    <div class="cart-total">
      <span>合計</span>
      <strong>${formatVnd(cartTotal())}</strong>
    </div>
  `;

  el.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      cart = cart.filter((line) => line.lineId !== btn.dataset.remove);
      qtyErrorLineId = null;
      saveCart(cart);
      renderCart();
    });
  });

  el.querySelectorAll("[data-inc]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const line = cart.find((item) => item.lineId === btn.dataset.inc);
      if (!line) return;
      setLineQuantity(line.lineId, normalizeQuantity(line.quantity) + 1);
    });
  });

  el.querySelectorAll("[data-dec]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const line = cart.find((item) => item.lineId === btn.dataset.dec);
      if (!line) return;
      const quantity = normalizeQuantity(line.quantity);
      if (quantity <= 1) {
        showQtyError(line.lineId);
        return;
      }
      setLineQuantity(line.lineId, quantity - 1);
    });
  });

  el.querySelectorAll("[data-qty]").forEach((input) => {
    input.addEventListener("change", () => {
      const parsed = parseQuantityInput(input.value);
      if (parsed === null || parsed < 1) {
        showQtyError(input.dataset.qty);
        return;
      }
      setLineQuantity(input.dataset.qty, parsed);
    });
  });
}

function loadOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function createOrderId(orders) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id;
  do {
    id = "";
    for (let i = 0; i < 4; i += 1) {
      id += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  } while (orders.some((order) => order.id === id));
  return id;
}

function placeOrder(customerName, tableNumber) {
  const orders = loadOrders();
  const order = {
    id: createOrderId(orders),
    customerName,
    tableNumber,
    lines: cart.map((line) => ({
      lineId: line.lineId,
      itemId: line.itemId,
      name: line.name,
      emoji: line.emoji,
      size: line.size,
      toppings: [...line.toppings],
      price: line.price,
      quantity: normalizeQuantity(line.quantity),
    })),
    total: cartTotal(),
    status: "調理待ち",
  };
  orders.push(order);
  saveOrders(orders);
  return order;
}

function initOrderForm() {
  const form = document.getElementById("order-form");
  const errorEl = document.getElementById("order-error");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("customer-name").value.trim();
    const table = document.getElementById("table-number").value.trim();
    const problems = [];
    if (!cart.length) problems.push("カートは空です。");
    if (!name) problems.push("お名前を入力してください。");
    if (!table) problems.push("テーブル番号を入力してください。");
    if (problems.length) {
      errorEl.hidden = false;
      errorEl.textContent = problems.join(" ");
      return;
    }

    errorEl.hidden = true;
    errorEl.textContent = "";
    const order = placeOrder(name, table);
    window.location.href = "order.html?id=" + encodeURIComponent(order.id);
  });
}

renderMenu();
renderCart();
initOrderForm();
