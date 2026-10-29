const ORDERS_KEY = "coffee-orders";

const STATUS_FLOW = ["調理待ち", "調理中", "受取可能", "受取済み"];
const ADVANCE_LABEL = {
  "調理待ち": "調理を始める",
  "調理中": "受取可能にする",
  "受取可能": "受取済みにする",
  "受取済み": "受取済み",
  "キャンセル済み": "キャンセル済み",
};

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
  if (!order || order.status === "キャンセル済み" || order.status === "受取済み") return;
  order.status = nextStatus(order.status);
  saveOrders(orders);
  renderCounter();
}

function renderCounter() {
  const root = document.getElementById("counter-orders");
  const orders = loadOrders();

  if (!orders.length) {
    root.innerHTML = '<p class="cart-empty">注文はまだありません。</p>';
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
                : "トッピングなし";
              return `
                <li class="cart-line">
                  <div class="cart-line-main">
                    <div>
                      <p class="cart-line-title">${escapeHtml(line.emoji)} ${escapeHtml(line.name)}</p>
                      <p class="cart-line-meta">サイズ ${escapeHtml(line.size)} · ${escapeHtml(toppingText)}</p>
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
                <p class="order-code">注文番号 <strong>${escapeHtml(order.id)}</strong></p>
                <p class="status-badge">${escapeHtml(order.status)}</p>
              </div>
              <p class="order-meta">${escapeHtml(order.customerName)} · テーブル ${escapeHtml(order.tableNumber)}</p>
              <ul class="cart-list">${list}</ul>
              <div class="cart-total">
                <span>合計</span>
                <strong>${formatVnd(order.total)}</strong>
              </div>
              <button
                type="button"
                class="btn-advance"
                data-advance="${escapeHtml(order.id)}"
                ${order.status === "受取済み" || order.status === "キャンセル済み" ? "disabled" : ""}
              >
                ${escapeHtml(ADVANCE_LABEL[order.status] || order.status)}
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
