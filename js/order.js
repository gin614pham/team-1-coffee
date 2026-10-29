const ORDERS_KEY = "coffee-orders";

function formatVnd(amount) {
  return amount.toLocaleString("vi-VN") + "đ";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

function cancelOrder(orderId) {
  const orders = loadOrders();
  const order = orders.find((item) => item.id === orderId);
  if (!order || order.status !== "Chờ pha") return;
  order.status = "Đã hủy";
  saveOrders(orders);
  renderOrder();
}

function renderOrder() {
  const root = document.getElementById("order-status");
  const id = new URLSearchParams(window.location.search).get("id");
  const order = loadOrders().find((item) => item.id === id);

  if (!order) {
    root.innerHTML = '<p class="cart-empty">Không thấy đơn này.</p>';
    return;
  }

  const lines = Array.isArray(order.lines) ? order.lines : [];
  const list = lines
    .map((line) => {
      const toppings = Array.isArray(line.toppings) ? line.toppings : [];
      const toppingText = toppings.length ? toppings.join(", ") : "không topping";
      return `
        <li class="cart-line">
          <div class="cart-line-main">
            <div>
              <p class="cart-line-title">${escapeHtml(line.emoji)} ${escapeHtml(line.name)}</p>
              <p class="cart-line-meta">Size ${escapeHtml(line.size)} · ${escapeHtml(toppingText)}</p>
            </div>
            <div class="cart-line-price">${formatVnd(line.price)}</div>
          </div>
        </li>
      `;
    })
    .join("");

  root.innerHTML = `
    <article class="order-card">
      <div class="order-head">
        <p class="order-code">Mã đơn <strong>${escapeHtml(order.id)}</strong></p>
        <p class="status-badge">${escapeHtml(order.status)}</p>
      </div>
      <p class="order-meta">${escapeHtml(order.customerName)} · Bàn ${escapeHtml(order.tableNumber)}</p>
      <ul class="cart-list">${list}</ul>
      <div class="cart-total">
        <span>Tổng tiền</span>
        <strong>${formatVnd(order.total)}</strong>
      </div>
      <button type="button" class="btn-cancel" data-cancel="${escapeHtml(order.id)}">
        Hủy
      </button>
    </article>
  `;

  root.querySelector("[data-cancel]").addEventListener("click", () => {
    cancelOrder(root.querySelector("[data-cancel]").dataset.cancel);
  });
}

renderOrder();
