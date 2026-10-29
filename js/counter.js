const ORDERS_KEY = "coffee-orders";

const STATUS_FLOW = ["Chờ pha", "Đang pha", "Sẵn sàng", "Đã nhận"];

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

function nextStatus(current) {
  const index = STATUS_FLOW.indexOf(current);
  if (index === -1) return current;
  if (index >= STATUS_FLOW.length - 1) return STATUS_FLOW[STATUS_FLOW.length - 1];
  return STATUS_FLOW[index + 1];
}

function advanceOrder(orderId) {
  const orders = loadOrders();
  const order = orders.find((item) => item.id === orderId);
  if (!order || order.status === "Đã hủy") return;
  order.status = nextStatus(order.status);
  saveOrders(orders);
  renderCounter();
}

function renderCounter() {
  const root = document.getElementById("counter-orders");
  const orders = loadOrders();

  if (!orders.length) {
    root.innerHTML = '<p class="cart-empty">Chưa có đơn nào.</p>';
    return;
  }

  root.innerHTML = `
    <div class="counter-list">
      ${orders
        .map((order) => {
          const lines = Array.isArray(order.lines) ? order.lines : [];
          const list = lines
            .map((line) => {
              const toppings = Array.isArray(line.toppings) ? line.toppings : [];
              const toppingText = toppings.length
                ? toppings.join(", ")
                : "không topping";
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

          return `
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
              <button type="button" class="btn-advance" data-advance="${escapeHtml(order.id)}">
                Chuyển trạng thái
              </button>
            </article>
          `;
        })
        .join("")}
    </div>
  `;

  root.querySelectorAll("[data-advance]").forEach((btn) => {
    btn.addEventListener("click", () => advanceOrder(btn.dataset.advance));
  });
}

renderCounter();
