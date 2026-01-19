// ========================================
// TechVault Demo - Main Application
// ========================================

(function () {
    'use strict';

    // ========================================
    // Navigation & View Management
    // ========================================

    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');

    function switchView(viewName) {
        // Update navigation
        navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.view === viewName);
        });

        // Update views
        views.forEach(view => {
            view.classList.toggle('active', view.id === `${viewName}-view`);
        });

        // Refresh view content
        switch (viewName) {
            case 'dashboard':
                renderDashboard();
                break;
            case 'inventory':
                renderInventory();
                break;
            case 'orders':
                renderOrders();
                break;
            case 'storefront':
                renderStorefront();
                break;
        }
    }

    // Navigation click handlers
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            switchView(item.dataset.view);
        });
    });

    // ========================================
    // Dashboard Module
    // ========================================

    function renderDashboard() {
        updateKPIs();
        renderActivityFeed();
        renderSalesChart();
        updateLowStockBadge();
    }

    function updateKPIs() {
        const data = TechVaultData.kpis;
        document.getElementById('kpi-revenue').textContent = `€${data.revenue.toLocaleString()}`;
        document.getElementById('kpi-orders').textContent = data.orders;
        document.getElementById('kpi-products').textContent = data.products;
        document.getElementById('kpi-sync').textContent = `${data.syncRate}%`;
    }

    function renderActivityFeed() {
        const feed = document.getElementById('activityFeed');
        const activities = TechVaultData.activities.slice(0, 8);

        feed.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.type}">
                    ${activity.icon}
                </div>
                <div class="activity-content">
                    <p>${activity.message}</p>
                    <span>${activity.time}</span>
                </div>
            </div>
        `).join('');
    }

    function renderSalesChart() {
        const canvas = document.getElementById('salesChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const data = TechVaultData.salesData;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const padding = 50;
        const width = canvas.width - padding * 2;
        const height = canvas.height - padding * 2;
        const maxValue = Math.max(...data.values) * 1.1;
        const barWidth = width / data.labels.length * 0.6;
        const gap = width / data.labels.length * 0.4;

        // Draw gradient bars
        data.values.forEach((value, index) => {
            const x = padding + index * (barWidth + gap) + gap / 2;
            const barHeight = (value / maxValue) * height;
            const y = padding + height - barHeight;

            // Create gradient
            const gradient = ctx.createLinearGradient(x, y + barHeight, x, y);
            gradient.addColorStop(0, '#6366f1');
            gradient.addColorStop(1, '#a855f7');

            // Draw bar with rounded top
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barHeight, [8, 8, 0, 0]);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw label
            ctx.fillStyle = '#a1a1aa';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(data.labels[index], x + barWidth / 2, padding + height + 20);

            // Draw value
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`€${(value / 1000).toFixed(1)}k`, x + barWidth / 2, y - 10);
        });
    }

    function updateLowStockBadge() {
        const lowStock = TechVaultData.getLowStockProducts();
        const badge = document.getElementById('lowStockBadge');
        if (badge) {
            badge.textContent = lowStock.length;
            badge.style.display = lowStock.length > 0 ? 'block' : 'none';
        }
    }

    // ========================================
    // Inventory Module
    // ========================================

    function renderInventory(filter = '') {
        const tbody = document.querySelector('#inventoryTable tbody');
        let products = TechVaultData.products;

        if (filter) {
            const searchTerm = filter.toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(searchTerm) ||
                p.sku.toLowerCase().includes(searchTerm) ||
                p.category.toLowerCase().includes(searchTerm)
            );
        }

        tbody.innerHTML = products.map(product => {
            const stockPercent = (product.stock / product.maxStock) * 100;
            let stockClass = 'high';
            let statusBadge = 'badge-success';
            let statusText = 'Em Stock';

            if (stockPercent <= 15) {
                stockClass = 'low';
                statusBadge = 'badge-danger';
                statusText = 'Stock Crítico';
            } else if (stockPercent <= 40) {
                stockClass = 'medium';
                statusBadge = 'badge-warning';
                statusText = 'Stock Baixo';
            }

            return `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <span style="font-size: 24px;">${product.icon}</span>
                            <div>
                                <div style="font-weight: 500;">${product.name}</div>
                            </div>
                        </div>
                    </td>
                    <td><code style="color: var(--text-muted);">${product.sku}</code></td>
                    <td>${TechVaultData.categories[product.category]}</td>
                    <td><strong>€${product.price.toFixed(2)}</strong></td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span>${product.stock}</span>
                            <div class="stock-bar">
                                <div class="stock-bar-fill ${stockClass}" style="width: ${stockPercent}%"></div>
                            </div>
                        </div>
                    </td>
                    <td><span class="badge ${statusBadge}">${statusText}</span></td>
                    <td>
                        <button class="btn btn-icon" onclick="editProduct(${product.id})" title="Editar">✏️</button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Inventory search
    const inventorySearch = document.getElementById('inventorySearch');
    if (inventorySearch) {
        inventorySearch.addEventListener('input', (e) => {
            renderInventory(e.target.value);
        });
    }

    // ========================================
    // Orders Module
    // ========================================

    let currentOrderFilter = 'all';

    function renderOrders(filter = currentOrderFilter) {
        currentOrderFilter = filter;
        const tbody = document.querySelector('#ordersTable tbody');
        let orders = TechVaultData.orders;

        if (filter !== 'all') {
            orders = orders.filter(o => o.status === filter);
        }

        tbody.innerHTML = orders.map(order => {
            const statusClass = {
                pending: 'badge-pending',
                processing: 'badge-info',
                shipped: 'badge-warning',
                delivered: 'badge-success'
            };

            const itemsSummary = order.items.length > 1
                ? `${order.items[0].name} +${order.items.length - 1} mais`
                : order.items[0].name;

            return `
                <tr>
                    <td><strong style="color: var(--accent-primary);">${order.id}</strong></td>
                    <td>
                        <div>
                            <div style="font-weight: 500;">${order.customer}</div>
                            <div style="font-size: 12px; color: var(--text-muted);">${order.email}</div>
                        </div>
                    </td>
                    <td>${itemsSummary}</td>
                    <td><strong>€${order.total.toFixed(2)}</strong></td>
                    <td>
                        <div style="font-size: 13px;">${order.date}</div>
                        <div style="font-size: 12px; color: var(--text-muted);">${order.time}</div>
                    </td>
                    <td><span class="badge ${statusClass[order.status]}">${TechVaultData.statusLabels[order.status]}</span></td>
                    <td>
                        <button class="btn btn-icon" onclick="viewOrder('${order.id}')" title="Ver detalhes">👁️</button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Order filter tabs
    document.querySelectorAll('.view-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.view-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderOrders(tab.dataset.filter);
        });
    });

    // ========================================
    // Storefront Module
    // ========================================

    function renderStorefront() {
        const container = document.getElementById('storefrontProducts');
        const products = TechVaultData.products.filter(p => p.stock > 0);

        container.innerHTML = products.map(product => {
            const stockPercent = (product.stock / product.maxStock) * 100;
            let stockClass = 'high';
            if (stockPercent <= 15) stockClass = 'low';
            else if (stockPercent <= 40) stockClass = 'medium';

            return `
                <div class="product-card">
                    <div class="product-image">${product.icon}</div>
                    <div class="product-info">
                        <div class="product-category">${TechVaultData.categories[product.category]}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price">€${product.price.toFixed(2)}</div>
                        <div class="product-stock">
                            <span>${product.stock} disponíveis</span>
                            <div class="stock-bar" style="width: 60px;">
                                <div class="stock-bar-fill ${stockClass}" style="width: ${stockPercent}%"></div>
                            </div>
                        </div>
                        <button class="btn btn-primary" style="width: 100%;" onclick="addToCart(${product.id})">
                            <span>🛒</span> Adicionar
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        updateCartUI();
    }

    // ========================================
    // Cart Functions
    // ========================================

    function updateCartUI() {
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');
        const cartTotal = document.getElementById('cartTotal');

        cartCount.textContent = TechVaultData.getCartItemCount();
        cartTotal.textContent = `€${TechVaultData.getTotalCartValue().toFixed(2)}`;

        if (TechVaultData.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-state" style="padding: 40px 0;">
                    <div class="icon">🛒</div>
                    <h3>Carrinho Vazio</h3>
                    <p>Adicione produtos para começar</p>
                </div>
            `;
            return;
        }

        cartItems.innerHTML = TechVaultData.cart.map(item => {
            const product = TechVaultData.getProductById(item.productId);
            return `
                <div class="cart-item">
                    <div class="cart-item-image">${product.icon}</div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${product.name}</div>
                        <div class="cart-item-price">€${(product.price * item.quantity).toFixed(2)}</div>
                        <div class="cart-item-qty">
                            <button onclick="updateCartQty(${product.id}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateCartQty(${product.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    window.addToCart = function (productId) {
        const success = TechVaultData.addToCart(productId);
        if (success) {
            showToast('success', 'Adicionado!', 'Produto adicionado ao carrinho');
            updateCartUI();
        } else {
            showToast('error', 'Erro', 'Stock insuficiente');
        }
    };

    window.updateCartQty = function (productId, quantity) {
        TechVaultData.updateCartQuantity(productId, quantity);
        updateCartUI();
    };

    window.toggleCart = function () {
        const sidebar = document.getElementById('cartSidebar');
        sidebar.classList.toggle('open');
    };

    window.checkout = function () {
        if (TechVaultData.cart.length === 0) {
            showToast('warning', 'Carrinho Vazio', 'Adicione produtos antes de finalizar');
            return;
        }

        // Show sync animation
        showSyncAnimation();

        setTimeout(() => {
            // Create order
            const order = TechVaultData.createOrder('Cliente Demo', 'demo@techvault.pt');

            // Hide sync animation
            hideSyncAnimation();

            // Close cart
            toggleCart();

            // Show success
            showToast('success', 'Pedido Criado!', `Pedido ${order.id} processado com sucesso`);

            // Refresh views
            updateKPIs();
            renderActivityFeed();
            renderStorefront();
            updateLowStockBadge();
            renderInventory();
        }, 2000);
    };

    // ========================================
    // Sync Demo
    // ========================================

    window.simulatePurchase = function () {
        const syncLog = document.getElementById('syncLog');
        syncLog.innerHTML = '';

        const steps = [
            { delay: 0, message: '🛒 Pedido recebido do E-commerce...', color: '#3b82f6' },
            { delay: 800, message: '🔍 Verificando disponibilidade de stock...', color: '#f59e0b' },
            { delay: 1600, message: '✅ Stock disponível - Reservando produtos...', color: '#10b981' },
            { delay: 2400, message: '💳 Processando pagamento...', color: '#8b5cf6' },
            { delay: 3200, message: '📦 Gerando ordem de expedição...', color: '#6366f1' },
            { delay: 4000, message: '✨ Sincronização completa!', color: '#10b981' }
        ];

        showSyncAnimation();

        steps.forEach(step => {
            setTimeout(() => {
                const logItem = document.createElement('div');
                logItem.style.cssText = `
                    padding: 8px 12px;
                    margin-bottom: 8px;
                    background: var(--bg-tertiary);
                    border-left: 3px solid ${step.color};
                    border-radius: 4px;
                    font-size: 13px;
                    animation: slideIn 0.3s ease;
                `;
                logItem.textContent = step.message;
                syncLog.appendChild(logItem);
                syncLog.scrollTop = syncLog.scrollHeight;

                if (step.message.includes('completa')) {
                    hideSyncAnimation();
                    showToast('success', 'Demo Completo', 'A sincronização foi demonstrada com sucesso!');
                }
            }, step.delay);
        });
    };

    function showSyncAnimation() {
        document.getElementById('syncAnimation').classList.add('active');
    }

    function hideSyncAnimation() {
        document.getElementById('syncAnimation').classList.remove('active');
    }

    // ========================================
    // Modals
    // ========================================

    window.openAddProductModal = function () {
        document.getElementById('addProductModal').classList.add('active');
    };

    window.closeModal = function (modalId) {
        document.getElementById(modalId).classList.remove('active');
    };

    window.addProduct = function () {
        const name = document.getElementById('productName').value;
        const category = document.getElementById('productCategory').value;
        const price = document.getElementById('productPrice').value;
        const stock = document.getElementById('productStock').value;

        if (!name || !price || !stock) {
            showToast('error', 'Erro', 'Preencha todos os campos');
            return;
        }

        TechVaultData.addProduct(name, category, price, stock);
        closeModal('addProductModal');
        showToast('success', 'Produto Adicionado', `${name} foi adicionado ao inventário`);
        renderInventory();
        updateKPIs();
        renderActivityFeed();

        // Clear form
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productStock').value = '';
    };

    window.viewOrder = function (orderId) {
        const order = TechVaultData.getOrderById(orderId);
        if (!order) return;

        const modalBody = document.getElementById('orderModalBody');
        const actionBtn = document.getElementById('orderActionBtn');

        modalBody.innerHTML = `
            <div style="margin-bottom: 20px;">
                <h4 style="color: var(--accent-primary); margin-bottom: 8px;">${order.id}</h4>
                <p style="color: var(--text-secondary);">${order.date} às ${order.time}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <label class="form-label">Cliente</label>
                <p style="font-weight: 500;">${order.customer}</p>
                <p style="font-size: 13px; color: var(--text-muted);">${order.email}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <label class="form-label">Produtos</label>
                ${order.items.map(item => `
                    <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border-color);">
                        <span>${item.name} (x${item.quantity})</span>
                        <span style="font-weight: 500;">€${item.price.toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            
            <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 600;">
                <span>Total:</span>
                <span style="color: var(--accent-primary);">€${order.total.toFixed(2)}</span>
            </div>
        `;

        // Update action button based on status
        const nextStatus = {
            pending: 'processing',
            processing: 'shipped',
            shipped: 'delivered'
        };

        if (nextStatus[order.status]) {
            actionBtn.style.display = 'block';
            actionBtn.textContent = order.status === 'pending' ? 'Processar Pedido' :
                order.status === 'processing' ? 'Marcar como Enviado' :
                    'Marcar como Entregue';
            actionBtn.onclick = () => {
                TechVaultData.updateOrderStatus(orderId, nextStatus[order.status]);
                closeModal('orderModal');
                showToast('success', 'Pedido Atualizado', `Estado alterado para ${TechVaultData.statusLabels[nextStatus[order.status]]}`);
                renderOrders();
                renderActivityFeed();
            };
        } else {
            actionBtn.style.display = 'none';
        }

        document.getElementById('orderModal').classList.add('active');
    };

    window.editProduct = function (productId) {
        showToast('info', 'Demo', 'Funcionalidade de edição - em desenvolvimento');
    };

    // ========================================
    // Toast Notifications
    // ========================================

    function showToast(type, title, message) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // ========================================
    // Utility Functions
    // ========================================

    window.refreshData = function () {
        showToast('info', 'Atualizado', 'Dados atualizados com sucesso');
        renderDashboard();
    };

    // Close modals on outside click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    // ========================================
    // Initialize Application
    // ========================================

    function init() {
        // Add CSS for view visibility
        const style = document.createElement('style');
        style.textContent = `
            .view { display: none; }
            .view.active { display: block; }
        `;
        document.head.appendChild(style);

        // Render initial view
        renderDashboard();
        renderInventory();
        renderOrders();
        renderStorefront();
    }

    // Start app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
