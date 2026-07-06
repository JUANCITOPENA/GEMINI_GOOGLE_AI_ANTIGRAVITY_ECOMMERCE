// app.js

const app = {
    data: {
        vehiculos: [],
        motos: []
    },
    currentCategory: 'vehiculos',
    cart: [],
    
    init: async function() {
        try {
            const response = await fetch('vehiculo.json');
            const jsonData = await response.json();
            this.data.vehiculos = jsonData.vehiculos || [];
            this.data.motos = jsonData.motos || [];
            this.renderProducts();
        } catch (error) {
            console.error('Error cargando los datos:', error);
            Swal.fire('Error', 'No se pudieron cargar los datos de los vehículos.', 'error');
        }
    },

    formatCurrency: function(value) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    },

    filterCategory: function(category) {
        this.currentCategory = category;
        this.renderProducts();
    },

    search: function() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        this.renderProducts(query);
    },

    renderProducts: function(query = '') {
        const container = document.getElementById('productsContainer');
        container.innerHTML = '';
        
        const items = this.data[this.currentCategory];
        
        const filteredItems = items.filter(item => {
            return item.marca.toLowerCase().includes(query) || 
                   item.modelo.toLowerCase().includes(query) ||
                   item.caracteristicas.toLowerCase().includes(query);
        });

        filteredItems.forEach(item => {
            const offerHtml = item.oferta_alquiler ? `<span class="offer-badge">${item.oferta_alquiler}</span>` : '';
            const logoHtml = item.logo ? `<img src="${item.logo}" class="brand-logo" alt="${item.marca}">` : '';
            
            const cardHtml = `
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="card vehicle-card h-100">
                        ${offerHtml}
                        ${logoHtml}
                        <div class="card-img-wrapper" onclick="app.openImageModal('${item.imagen}')">
                            <img src="${item.imagen}" alt="${item.modelo}">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h5 class="card-title mb-0">${item.marca} ${item.modelo}</h5>
                                <span class="badge bg-secondary">#${item.codigo}</span>
                            </div>
                            <p class="text-muted small mb-2"><i class="fas fa-info-circle"></i> ${item.tipo} | ${item.motor} | ${item.combustible}</p>
                            
                            <ul class="price-list mt-auto">
                                <li><span>Venta:</span> <strong>${this.formatCurrency(item.precio_venta)}</strong></li>
                                <li><span>Alquiler (Día):</span> <strong>${this.formatCurrency(item.precio_alquiler_dia)}</strong></li>
                                <li><span>Alquiler (Hora):</span> <strong>${this.formatCurrency(item.precio_alquiler_hora)}</strong></li>
                            </ul>
                            
                            <div class="row g-2 mt-3">
                                <div class="col-6">
                                    <button class="btn btn-alquilar w-100 btn-action" onclick="app.openRentalModal(${item.codigo}, '${this.currentCategory}')">
                                        <i class="fas fa-key"></i> Alquilar
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-comprar w-100 btn-action" onclick="app.buyItem(${item.codigo}, '${this.currentCategory}')">
                                        <i class="fas fa-shopping-bag"></i> Comprar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += cardHtml;
        });
    },

    openImageModal: function(imgSrc) {
        document.getElementById('modalExpandedImage').src = imgSrc;
        const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        imageModal.show();
    },

    getItemByCode: function(codigo, category) {
        return this.data[category].find(i => i.codigo === codigo);
    },

    buyItem: function(codigo, category) {
        const item = this.getItemByCode(codigo, category);
        if (!item) return;

        this.cart.push({
            id: Date.now(),
            codigo: item.codigo,
            item: item,
            type: 'venta',
            price: item.precio_venta,
            quantity: 1,
            label: 'Venta'
        });

        this.updateCartUI();
        Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: `${item.marca} ${item.modelo} agregado al carrito para compra.`,
            timer: 1500,
            showConfirmButton: false
        });
    },

    openRentalModal: function(codigo, category) {
        const item = this.getItemByCode(codigo, category);
        if (!item) return;

        document.getElementById('rentalProductId').value = codigo;
        document.getElementById('rentalProductCategory').value = category;
        document.getElementById('rentalQuantity').value = 1;
        document.getElementById('rentalType').value = 'dia';
        
        this.calculateRental();

        const rentalModal = new bootstrap.Modal(document.getElementById('rentalModal'));
        rentalModal.show();
    },

    calculateRental: function() {
        const codigo = parseInt(document.getElementById('rentalProductId').value);
        const category = document.getElementById('rentalProductCategory').value;
        const item = this.getItemByCode(codigo, category);
        
        const type = document.getElementById('rentalType').value;
        const qty = parseInt(document.getElementById('rentalQuantity').value) || 1;
        
        let price = type === 'dia' ? item.precio_alquiler_dia : item.precio_alquiler_hora;
        let subtotal = price * qty;
        
        document.getElementById('rentalSubtotal').innerText = this.formatCurrency(subtotal);
    },

    confirmRental: function() {
        const codigo = parseInt(document.getElementById('rentalProductId').value);
        const category = document.getElementById('rentalProductCategory').value;
        const item = this.getItemByCode(codigo, category);
        
        const type = document.getElementById('rentalType').value;
        const qty = parseInt(document.getElementById('rentalQuantity').value) || 1;
        
        let unitPrice = type === 'dia' ? item.precio_alquiler_dia : item.precio_alquiler_hora;
        let subtotal = unitPrice * qty;
        let typeLabel = type === 'dia' ? 'Días' : 'Horas';

        this.cart.push({
            id: Date.now(),
            codigo: item.codigo,
            item: item,
            type: 'alquiler',
            price: subtotal,
            quantity: qty,
            label: `Alquiler (${qty} ${typeLabel})`
        });

        this.updateCartUI();
        
        const rentalModal = bootstrap.Modal.getInstance(document.getElementById('rentalModal'));
        if (rentalModal) rentalModal.hide();

        Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: `${item.marca} ${item.modelo} agregado al carrito para alquiler.`,
            timer: 1500,
            showConfirmButton: false
        });
    },

    removeCartItem: function(id) {
        this.cart = this.cart.filter(c => c.id !== id);
        this.updateCartUI();
    },

    updateCartUI: function() {
        const cartBadge = document.getElementById('cartBadge');
        cartBadge.innerText = this.cart.length;

        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';

        let total = 0;

        this.cart.forEach(c => {
            total += c.price;
            cartItems.innerHTML += `
                <tr>
                    <td><img src="${c.item.imagen}" alt="IMG" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"></td>
                    <td>${c.item.marca} ${c.item.modelo} <br><small class="text-muted">Cod: ${c.item.codigo}</small></td>
                    <td><span class="badge bg-${c.type === 'venta' ? 'success' : 'primary'}">${c.label}</span></td>
                    <td>${this.formatCurrency(c.price)}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="app.removeCartItem(${c.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });

        document.getElementById('cartTotal').innerText = this.formatCurrency(total);
    },

    closeModalsSafely: function() {
        const cartModalEl = document.getElementById('cartModal');
        const cartModal = bootstrap.Modal.getInstance(cartModalEl);
        if (cartModal) cartModal.hide();
        
        // Remove backdrops if any left
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(b => b.remove());
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    },

    generatePDF: function() {
        if (this.cart.length === 0) {
            Swal.fire('Atención', 'El carrito está vacío.', 'warning');
            return;
        }

        const customerName = document.getElementById('customerName').value;
        const paymentMethod = document.getElementById('paymentMethod').value;
        const deliveryDate = document.getElementById('deliveryDate').value;

        if (!customerName || !paymentMethod || !deliveryDate) {
            Swal.fire('Error', 'Debe completar todos los datos de facturación.', 'error');
            return;
        }

        // Determine Document Title based on types
        const hasVenta = this.cart.some(c => c.type === 'venta');
        const hasAlquiler = this.cart.some(c => c.type === 'alquiler');
        
        let docTitle = "";
        if (hasVenta && !hasAlquiler) docTitle = "FACTURA DE VENTA";
        else if (!hasVenta && hasAlquiler) docTitle = "CONTRATO DE ALQUILER Y ACUERDO DE RESPONSABILIDAD";
        else docTitle = "FACTURA DE VENTA Y CONTRATO DE ALQUILER";

        const dateStr = new Date().toLocaleDateString('es-DO', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' });

        // Generate Rows
        let rowsHtml = '';
        let total = 0;
        this.cart.forEach(c => {
            total += c.price;
            rowsHtml += `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px;"><img src="${c.item.imagen}" style="width: 80px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
                    <td style="padding: 10px;">${c.item.codigo}</td>
                    <td style="padding: 10px;">${c.item.marca} ${c.item.modelo} - ${c.item.caracteristicas.substring(0, 40)}...</td>
                    <td style="padding: 10px;">${c.label.toUpperCase()}</td>
                    <td style="padding: 10px; text-align: right; font-weight: bold;">${this.formatCurrency(c.price)}</td>
                </tr>
            `;
        });
        
        const totalHtml = `
            <tr>
                <td colspan="4" style="padding: 15px 10px; text-align: right; font-weight: bold; font-size: 16px;">TOTAL A PAGAR:</td>
                <td style="padding: 15px 10px; text-align: right; font-weight: bold; font-size: 16px; color: #d32f2f;">${this.formatCurrency(total)}</td>
            </tr>
        `;

        // Contract Section if Rentals exist
        let contractSection = '';
        if (hasAlquiler) {
            contractSection = `
                <div style="margin-top: 40px; padding: 20px; border: 2px solid #333; page-break-inside: avoid; background-color: #fafafa;">
                    <h4 style="text-align: center; margin-top: 0; color: #333;">ACUERDO DE RESPONSABILIDAD DE ALQUILER</h4>
                    <p style="font-size: 12px; text-align: justify; line-height: 1.5;">
                        Yo, <strong>${customerName}</strong>, asumo la total responsabilidad sobre el/los vehículo(s) alquilado(s) durante el periodo acordado. Me comprometo a devolver la unidad en las mismas condiciones físicas y mecánicas en que me fue entregada. Autorizo a Luxury Motors Elite Corp. a retener fondos o realizar cargos adicionales en caso de daños, multas o retrasos en la fecha de devolución (${deliveryDate}).
                    </p>
                    <div style="margin-top: 50px; width: 100%; display: flex; justify-content: space-between;">
                        <div style="width: 45%; text-align: center; border-top: 1px solid #000; padding-top: 5px;">
                            <p style="font-size: 12px; margin:0;">Firma del Cliente</p>
                        </div>
                        <div style="width: 45%; text-align: center; border-top: 1px solid #000; padding-top: 5px;">
                            <p style="font-size: 12px; margin:0;">Autorizado por Luxury Motors</p>
                        </div>
                    </div>
                </div>
            `;
        }

        const logoSrc = "assets/logo_pagina.png";

        const htmlString = `
            <div style="padding: 40px; font-family: Arial, sans-serif; color: #000; background: #fff; width: 100%; box-sizing: border-box;">
                <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 20px;">
                    <img src="${logoSrc}" style="height: 60px; margin-bottom: 10px; border-radius: 4px;" alt="Logo Empresa">
                    <h1 style="margin: 0; font-size: 24px;">${docTitle}</h1>
                    <p style="margin: 5px 0 0 0; font-size: 14px;">Fecha: ${dateStr}</p>
                </div>
                
                <div style="margin-bottom: 30px; padding: 15px; border: 1px solid #ccc; background-color: #f9f9f9; border-radius: 5px;">
                    <h4 style="margin-top: 0;">DATOS DEL CLIENTE</h4>
                    <p style="margin: 5px 0;"><b>Cliente:</b> ${customerName} | <b>Método de Pago:</b> ${paymentMethod}</p>
                    <p style="margin: 5px 0;"><b>Fecha Estimada Entrega/Devolución:</b> ${deliveryDate}</p>
                </div>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 14px;">
                    <thead style="background-color: #333; color: #fff;">
                        <tr>
                            <th style="padding: 10px; text-align: left;">FOTO</th>
                            <th style="padding: 10px; text-align: left;">CÓDIGO</th>
                            <th style="padding: 10px; text-align: left;">DESCRIPCIÓN</th>
                            <th style="padding: 10px; text-align: left;">TIPO</th>
                            <th style="padding: 10px; text-align: right;">MONTO</th>
                        </tr>
                    </thead>
                    <tbody>${rowsHtml}</tbody>
                    <tfoot>${totalHtml}</tfoot>
                </table>

                ${contractSection}
            </div>
        `;

        this.closeModalsSafely();

        Swal.fire({
            title: 'Procesando...',
            text: 'Generando su documento premium, por favor espere.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const opt = {
            margin:       10,
            filename:     'Documento_LuxuryMotors.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, scrollY: 0, scrollX: 0 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        window.scrollTo(0, 0);

        setTimeout(() => {
            html2pdf().set(opt).from(htmlString).save().then(() => {
                this.cart = [];
                this.updateCartUI();
                document.getElementById('billingForm').reset();
                Swal.fire('¡Éxito!', 'Su compra/alquiler ha sido procesado y el PDF ha sido generado correctamente.', 'success');
            }).catch(err => {
                console.error(err);
                Swal.fire('Error', 'Hubo un problema al generar el PDF.', 'error');
            });
        }, 500); // Pequeño delay para que el modal termine de cerrar
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
