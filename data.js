// ========================================
// TechVault Demo - Mock Data Store
// ========================================

const TechVaultData = {
    // Products Inventory
    products: [
        {
            id: 1,
            sku: "TV-IP15-256",
            name: "iPhone 15 Pro",
            category: "smartphones",
            price: 1199.00,
            stock: 24,
            maxStock: 50,
            icon: "📱"
        },
        {
            id: 2,
            sku: "TV-GAL24-128",
            name: "Samsung Galaxy S24",
            category: "smartphones",
            price: 899.00,
            stock: 18,
            maxStock: 40,
            icon: "📱"
        },
        {
            id: 3,
            sku: "TV-MBP14-M3",
            name: "MacBook Pro 14\" M3",
            category: "laptops",
            price: 2199.00,
            stock: 8,
            maxStock: 20,
            icon: "💻"
        },
        {
            id: 4,
            sku: "TV-DELL-XPS15",
            name: "Dell XPS 15",
            category: "laptops",
            price: 1549.00,
            stock: 12,
            maxStock: 25,
            icon: "💻"
        },
        {
            id: 5,
            sku: "TV-IPAD-PRO",
            name: "iPad Pro 12.9\"",
            category: "tablets",
            price: 1099.00,
            stock: 15,
            maxStock: 30,
            icon: "📱"
        },
        {
            id: 6,
            sku: "TV-APMX-4G",
            name: "AirPods Max",
            category: "audio",
            price: 579.00,
            stock: 5,
            maxStock: 35,
            icon: "🎧"
        },
        {
            id: 7,
            sku: "TV-SONY-WH1K",
            name: "Sony WH-1000XM5",
            category: "audio",
            price: 349.00,
            stock: 22,
            maxStock: 40,
            icon: "🎧"
        },
        {
            id: 8,
            sku: "TV-WATCH-U2",
            name: "Apple Watch Ultra 2",
            category: "accessories",
            price: 899.00,
            stock: 3,
            maxStock: 25,
            icon: "⌚"
        },
        {
            id: 9,
            sku: "TV-PIXL-8PRO",
            name: "Google Pixel 8 Pro",
            category: "smartphones",
            price: 999.00,
            stock: 14,
            maxStock: 30,
            icon: "📱"
        },
        {
            id: 10,
            sku: "TV-LGRAM-17",
            name: "LG Gram 17\"",
            category: "laptops",
            price: 1799.00,
            stock: 6,
            maxStock: 15,
            icon: "💻"
        },
        {
            id: 11,
            sku: "TV-PS5-CONS",
            name: "PlayStation 5",
            category: "accessories",
            price: 499.00,
            stock: 2,
            maxStock: 20,
            icon: "🎮"
        },
        {
            id: 12,
            sku: "TV-ASUS-ROG",
            name: "ASUS ROG Ally",
            category: "accessories",
            price: 699.00,
            stock: 9,
            maxStock: 15,
            icon: "🎮"
        }
    ],

    // Orders
    orders: [
        {
            id: "ORD-2024-001",
            customer: "João Silva",
            email: "joao.silva@email.com",
            items: [
                { productId: 1, name: "iPhone 15 Pro", quantity: 1, price: 1199.00 }
            ],
            total: 1199.00,
            status: "delivered",
            date: "2024-01-18",
            time: "09:34"
        },
        {
            id: "ORD-2024-002",
            customer: "Maria Santos",
            email: "maria.santos@email.com",
            items: [
                { productId: 3, name: "MacBook Pro 14\" M3", quantity: 1, price: 2199.00 },
                { productId: 6, name: "AirPods Max", quantity: 1, price: 579.00 }
            ],
            total: 2778.00,
            status: "shipped",
            date: "2024-01-18",
            time: "11:22"
        },
        {
            id: "ORD-2024-003",
            customer: "Pedro Costa",
            email: "pedro.costa@email.com",
            items: [
                { productId: 7, name: "Sony WH-1000XM5", quantity: 2, price: 698.00 }
            ],
            total: 698.00,
            status: "processing",
            date: "2024-01-19",
            time: "08:15"
        },
        {
            id: "ORD-2024-004",
            customer: "Ana Ferreira",
            email: "ana.ferreira@email.com",
            items: [
                { productId: 5, name: "iPad Pro 12.9\"", quantity: 1, price: 1099.00 }
            ],
            total: 1099.00,
            status: "pending",
            date: "2024-01-19",
            time: "10:45"
        },
        {
            id: "ORD-2024-005",
            customer: "Ricardo Oliveira",
            email: "ricardo.o@email.com",
            items: [
                { productId: 11, name: "PlayStation 5", quantity: 1, price: 499.00 },
                { productId: 12, name: "ASUS ROG Ally", quantity: 1, price: 699.00 }
            ],
            total: 1198.00,
            status: "pending",
            date: "2024-01-19",
            time: "14:30"
        }
    ],

    // Shopping Cart
    cart: [],

    // Activity log
    activities: [
        {
            type: "order",
            message: "Novo pedido #ORD-2024-005 recebido",
            time: "Há 2 minutos",
            icon: "🛒"
        },
        {
            type: "stock",
            message: "Stock de Apple Watch Ultra 2 em baixo (3 unidades)",
            time: "Há 15 minutos",
            icon: "⚠️"
        },
        {
            type: "order",
            message: "Pedido #ORD-2024-002 foi enviado",
            time: "Há 1 hora",
            icon: "📦"
        },
        {
            type: "stock",
            message: "Reposição de iPhone 15 Pro (+20 unidades)",
            time: "Há 2 horas",
            icon: "📥"
        },
        {
            type: "alert",
            message: "PlayStation 5 com stock crítico (2 unidades)",
            time: "Há 3 horas",
            icon: "🔴"
        }
    ],

    // KPIs
    kpis: {
        revenue: 24580,
        orders: 47,
        products: 186,
        syncRate: 99.9
    },

    // Sales data for chart
    salesData: {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        values: [4200, 5800, 4900, 7200, 6100, 8500, 5400]
    },

    // Category labels
    categories: {
        smartphones: "Smartphones",
        laptops: "Laptops",
        tablets: "Tablets",
        audio: "Áudio",
        accessories: "Acessórios"
    },

    // Status labels
    statusLabels: {
        pending: "Pendente",
        processing: "Processando",
        shipped: "Enviado",
        delivered: "Entregue"
    },

    // Methods
    getProductById(id) {
        return this.products.find(p => p.id === id);
    },

    getOrderById(id) {
        return this.orders.find(o => o.id === id);
    },

    getLowStockProducts() {
        return this.products.filter(p => p.stock <= 5);
    },

    getTotalCartValue() {
        return this.cart.reduce((sum, item) => {
            const product = this.getProductById(item.productId);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);
    },

    getCartItemCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    addToCart(productId) {
        const existingItem = this.cart.find(item => item.productId === productId);
        const product = this.getProductById(productId);

        if (!product || product.stock <= 0) return false;

        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity++;
                return true;
            }
            return false;
        } else {
            this.cart.push({ productId, quantity: 1 });
            return true;
        }
    },

    removeFromCart(productId) {
        const index = this.cart.findIndex(item => item.productId === productId);
        if (index > -1) {
            this.cart.splice(index, 1);
        }
    },

    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(i => i.productId === productId);
        const product = this.getProductById(productId);

        if (item && product) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else if (quantity <= product.stock) {
                item.quantity = quantity;
            }
        }
    },

    clearCart() {
        this.cart = [];
    },

    createOrder(customerName, customerEmail) {
        const orderNumber = this.orders.length + 1;
        const orderId = `ORD-2024-${String(orderNumber).padStart(3, '0')}`;
        const now = new Date();

        const items = this.cart.map(cartItem => {
            const product = this.getProductById(cartItem.productId);
            return {
                productId: cartItem.productId,
                name: product.name,
                quantity: cartItem.quantity,
                price: product.price * cartItem.quantity
            };
        });

        const order = {
            id: orderId,
            customer: customerName,
            email: customerEmail,
            items: items,
            total: this.getTotalCartValue(),
            status: "pending",
            date: now.toISOString().split('T')[0],
            time: now.toTimeString().slice(0, 5)
        };

        // Deduct stock
        this.cart.forEach(cartItem => {
            const product = this.getProductById(cartItem.productId);
            if (product) {
                product.stock -= cartItem.quantity;
            }
        });

        this.orders.unshift(order);
        this.kpis.orders++;
        this.kpis.revenue += order.total;

        // Add activity
        this.activities.unshift({
            type: "order",
            message: `Novo pedido #${orderId} de ${customerName}`,
            time: "Agora mesmo",
            icon: "🛒"
        });

        this.clearCart();
        return order;
    },

    updateOrderStatus(orderId, newStatus) {
        const order = this.getOrderById(orderId);
        if (order) {
            order.status = newStatus;
            this.activities.unshift({
                type: "order",
                message: `Pedido #${orderId} atualizado para ${this.statusLabels[newStatus]}`,
                time: "Agora mesmo",
                icon: newStatus === 'shipped' ? "📦" : "✅"
            });
        }
    },

    addProduct(name, category, price, stock) {
        const newId = Math.max(...this.products.map(p => p.id)) + 1;
        const sku = `TV-NEW-${String(newId).padStart(3, '0')}`;

        const icons = {
            smartphones: "📱",
            laptops: "💻",
            tablets: "📱",
            audio: "🎧",
            accessories: "⌚"
        };

        const product = {
            id: newId,
            sku: sku,
            name: name,
            category: category,
            price: parseFloat(price),
            stock: parseInt(stock),
            maxStock: parseInt(stock) * 2,
            icon: icons[category] || "📦"
        };

        this.products.push(product);
        this.kpis.products++;

        this.activities.unshift({
            type: "stock",
            message: `Novo produto adicionado: ${name}`,
            time: "Agora mesmo",
            icon: "📥"
        });

        return product;
    }
};

// Expose to global scope
window.TechVaultData = TechVaultData;
