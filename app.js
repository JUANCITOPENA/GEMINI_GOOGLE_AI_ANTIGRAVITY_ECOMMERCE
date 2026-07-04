// App State
let inventory = { vehiculos: [], motos: [] };
let cart = JSON.parse(localStorage.getItem('luxury_cart')) || [];
let currentRentItem = null;

// DOM Elements
const vehiculosContainer = document.getElementById('vehiculosContainer');
const motosContainer = document.getElementById('motosContainer');
const searchInput = document.getElementById('searchInput');
const cartCount = document.getElementById('cartCount');
const cartTableBody = document.getElementById('cartTableBody');
const cartGrandTotal = document.getElementById('cartGrandTotal');
const expandedImage = document.getElementById('expandedImage');
const rentType = document.getElementById('rentType');
const rentDuration = document.getElementById('rentDuration');
const rentTotalModal = document.getElementById('rentTotalModal');
const confirmRentBtn = document.getElementById('confirmRentBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

// Format currency
const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
    await fetchInventory();
    renderAll();
    updateCartUI();
    setupEventListeners();
});

// Fetch Data
async function fetchInventory() {
    try {
        const response = await fetch('vehiculo.json');
        if (!response.ok) throw new Error('Error network');
        const data = await response.json();
        inventory.vehiculos = data.vehiculos || [];
        inventory.motos = data.motos || [];
    } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error de Conexión',
            text: 'No se pudo cargar el inventario. Verifique el archivo vehiculo.json'
        });
    }
}

// Render Cards
function renderCards(items, container, searchTerm = '') {
    container.innerHTML = '';
    const filtered = items.filter(item => 
        item.marca.toLowerCase().includes(searchTerm) || 
        item.modelo.toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
        container.innerHTML = '<div class="col-12 text-center text-muted"><p>No se encontraron resultados.</p></div>';
        return;
    }

    filtered.forEach(item => {
        const offerBadge = item.oferta_alquiler ? `<div class="offer-badge">${item.oferta_alquiler}</div>` : '';
        const cardHTML = `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card premium-card">
                    <div class="card-img-container" onclick="openImageModal('${item.imagen}')">
                        ${offerBadge}
                        <img src="${item.imagen || 'https://via.placeholder.com/400x200?text=Auto'}" alt="${item.marca} ${item.modelo}">
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="d-flex align-items-center">
                                ${item.logo ? `<img src="${item.logo}" width="30" class="me-2 rounded-circle" alt="logo">` : ''}
                                <div>
                                    <small class="text-muted d-block lh-1">${item.marca}</small>
                                    <strong class="fs-5 lh-1">${item.modelo}</strong>
                                </div>
                            </div>
                            <span class="badge bg-dark">#${item.codigo}</span>
                        </div>
                        
                        <p class="text-muted small mb-3"><i class="fa-solid fa-circle-info me-1"></i>${item.tipo} | ${item.motor} | ${item.combustible}</p>
                        
                        <ul class="list-group list-group-flush price-list mb-3 mt-auto">
                            <li class="list-group-item">
                                <span class="fw-bold">Venta:</span> 
                                <span class="fw-bold text-sale">${formatMoney(item.precio_venta)}</span>
                            </li>
                            <li class="list-group-item">
                                <span>Alquiler (Día):</span> 
                                <span class="fw-bold text-rent">${formatMoney(item.precio_alquiler_dia)}</span>
                            </li>
                            <li class="list-group-item">
                                <span>Alquiler (Hora):</span> 
                                <span>${formatMoney(item.precio_alquiler_hora)}</span>
                            </li>
                        </ul>
                        
                        <div class="row g-2 mt-auto">
                            <div class="col-6">
                                <button class="btn btn-outline-primary w-100 fw-bold" onclick="openRentModal(${item.codigo})">
                                    <i class="fa-solid fa-clock me-1"></i> Alquilar
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-primary w-100 fw-bold" onclick="addToCart(${item.codigo}, 'venta')">
                                    <i class="fa-solid fa-cart-arrow-down me-1"></i> Comprar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

function renderAll(searchTerm = '') {
    renderCards(inventory.vehiculos, vehiculosContainer, searchTerm.toLowerCase());
    renderCards(inventory.motos, motosContainer, searchTerm.toLowerCase());
}

// Find Item Helper
function findItem(codigo) {
    return inventory.vehiculos.find(v => v.codigo === codigo) || inventory.motos.find(m => m.codigo === codigo);
}

// Modals Setup dynamically
window.openImageModal = (src) => {
    expandedImage.src = src;
    new bootstrap.Modal(document.getElementById('imageModal')).show();
};

window.openRentModal = (codigo) => {
    currentRentItem = findItem(codigo);
    if (!currentRentItem) return;
    rentType.value = 'dia';
    rentDuration.value = 1;
    updateRentTotal();
    new bootstrap.Modal(document.getElementById('rentModal')).show();
};

function updateRentTotal() {
    if (!currentRentItem) return;
    const type = rentType.value;
    const duration = parseInt(rentDuration.value) || 0;
    const price = type === 'dia' ? currentRentItem.precio_alquiler_dia : currentRentItem.precio_alquiler_hora;
    rentTotalModal.textContent = formatMoney(price * duration);
}

// Cart Logic
window.addToCart = (codigo, operationType, rentConfig = null) => {
    const item = findItem(codigo);
    if (!item) return;

    let cartItem = {
        id: Date.now() + Math.random(),
        codigo: item.codigo,
        marca: item.marca,
        modelo: item.modelo,
        imagen: item.imagen,
        operacion: operationType,
    };

    if (operationType === 'venta') {
        cartItem.precio = item.precio_venta;
        cartItem.descripcion = 'Compra Definitiva';
        cartItem.subtotal = item.precio_venta;
    } else {
        const { tipo, duracion } = rentConfig;
        const precioUnitario = tipo === 'dia' ? item.precio_alquiler_dia : item.precio_alquiler_hora;
        cartItem.precio = precioUnitario;
        cartItem.descripcion = `Alquiler x ${duracion} ${tipo === 'dia' ? 'Días' : 'Horas'}`;
        cartItem.subtotal = precioUnitario * duracion;
    }

    cart.push(cartItem);
    saveCart();
    
    Swal.fire({
        icon: 'success',
        title: '¡Añadido al Carrito!',
        text: `${item.marca} ${item.modelo} ha sido agregado.`,
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
    });
};

function saveCart() {
    localStorage.setItem('luxury_cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    cartCount.textContent = cart.length;
    cartCount.classList.remove('bounce-anim');
    void cartCount.offsetWidth;
    cartCount.classList.add('bounce-anim');
    renderCartTable();
}

function renderCartTable() {
    cartTableBody.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-muted">El carrito está vacío</td></tr>';
        cartGrandTotal.textContent = '$0.00';
        return;
    }

    cart.forEach(item => {
        total += item.subtotal;
        const badgeColor = item.operacion === 'venta' ? 'bg-success' : 'bg-primary';
        cartTableBody.innerHTML += `
            <tr>
                <td><img src="${item.imagen}" class="rounded" width="60" style="object-fit:cover; height:40px;"></td>
                <td>
                    <div class="fw-bold">${item.marca} ${item.modelo}</div>
                    <small class="text-muted">Cod: ${item.codigo}</small>
                </td>
                <td><span class="badge ${badgeColor}">${item.descripcion}</span></td>
                <td class="fw-bold">${formatMoney(item.subtotal)}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    cartGrandTotal.textContent = formatMoney(total);
}

window.removeFromCart = (id) => {
    cart = cart.filter(i => i.id !== id);
    saveCart();
};

// Event Listeners
function setupEventListeners() {
    searchInput.addEventListener('input', (e) => {
        renderAll(e.target.value);
    });

    rentType.addEventListener('change', updateRentTotal);
    rentDuration.addEventListener('input', updateRentTotal);

    confirmRentBtn.addEventListener('click', () => {
        if (!currentRentItem) return;
        const duration = parseInt(rentDuration.value);
        if (duration < 1) {
            Swal.fire('Error', 'La cantidad de tiempo debe ser válida', 'error');
            return;
        }
        
        addToCart(currentRentItem.codigo, 'alquiler', {
            tipo: rentType.value,
            duracion: duration
        });
        
        const rModal = bootstrap.Modal.getInstance(document.getElementById('rentModal'));
        if(rModal) rModal.hide();
    });

    clearCartBtn.addEventListener('click', () => {
        Swal.fire({
            title: '¿Vaciar carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, vaciar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                cart = [];
                saveCart();
            }
        });
    });

    checkoutBtn.addEventListener('click', processCheckout);
}

// PDF Checkout Logic (ANTI-BLANK PAGE HTML STRING APPROACH)
function processCheckout() {
    if (cart.length === 0) {
        Swal.fire('Atención', 'El carrito está vacío.', 'warning');
        return;
    }

    const hasVenta = cart.some(item => item.operacion === 'venta');
    const hasAlquiler = cart.some(item => item.operacion === 'alquiler');
    
    const now = new Date();
    const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

    let docTitle = "";
    let filename = "";
    let contractSection = "";

    if (hasAlquiler && !hasVenta) {
        docTitle = "CONTRATO DE ALQUILER Y ACUERDO DE RESPONSABILIDAD";
        filename = 'Contrato_Alquiler_LuxuryMotors.pdf';
    } else if (hasVenta && !hasAlquiler) {
        docTitle = "FACTURA DE VENTA";
        filename = 'Factura_Venta_LuxuryMotors.pdf';
    } else {
        docTitle = "FACTURA DE VENTA Y CONTRATO DE ALQUILER";
        filename = 'Factura_y_Contrato_LuxuryMotors.pdf';
    }

    if (hasAlquiler) {
        contractSection = `
        <div style="margin-top: 40px; page-break-inside: avoid;">
            <h4 style="margin-bottom: 10px; text-decoration: underline; font-family: Arial, sans-serif;">CLÁUSULA DE RESPONSABILIDAD</h4>
            <p style="font-size: 12px; text-align: justify; line-height: 1.5; margin-bottom: 40px; font-family: Arial, sans-serif;">
                Por la presente, el CLIENTE se hace total y absolutamente responsable del buen uso, cuidado y conservación del vehículo alquilado durante el período establecido. Cualquier daño, infracción de tránsito, pérdida, o perjuicio ocasionado al vehículo o a terceros, será asumido en su totalidad por el CLIENTE. El vehículo debe ser retornado en las mismas condiciones mecánicas y estéticas en que fue entregado.
            </p>
            <table style="width: 100%; margin-top: 50px; font-family: Arial, sans-serif;">
                <tr>
                    <td style="width: 45%; text-align: center; border-top: 1px solid #000; padding-top: 10px;">Firma del Cliente</td>
                    <td style="width: 10%;"></td>
                    <td style="width: 45%; text-align: center; border-top: 1px solid #000; padding-top: 10px;">Firma de la Empresa</td>
                </tr>
            </table>
        </div>`;
    }

    let rowsHtml = '';
    let total = 0;
    cart.forEach(item => {
        total += item.subtotal;
        rowsHtml += `
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
                    <img src="${item.imagen}" style="width: 60px; height: 40px; object-fit: cover; border-radius: 4px;" alt="vehículo">
                </td>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.codigo}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">
                    <b>${item.marca} ${item.modelo}</b><br>
                    <small style="color: #666;">${item.descripcion}</small>
                </td>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.operacion.toUpperCase()}</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${formatMoney(item.subtotal)}</td>
            </tr>
        `;
    });

    const htmlString = `
    <div style="padding: 40px; font-family: Arial, sans-serif; color: #000; background: #fff; width: 100%;">
        <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 20px;">
            <img src="assets/logo_pagina.png" style="height: 60px; margin-bottom: 10px; border-radius: 4px;" alt="Logo Empresa">
            <h1 style="margin: 0; font-size: 24px;">${docTitle}</h1>
            <h3 style="margin: 5px 0 0 0; color: #555; font-size: 16px;">LUXURY MOTORS PREMIUM</h3>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Fecha: ${dateStr}</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 14px;">
            <thead>
                <tr style="background-color: #f8f9fa;">
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">FOTO</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">CÓDIGO</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">DESCRIPCIÓN</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">TIPO</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">MONTO</th>
                </tr>
            </thead>
            <tbody>
                ${rowsHtml}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold;">TOTAL:</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold; font-size: 18px;">${formatMoney(total)}</td>
                </tr>
            </tfoot>
        </table>

        ${contractSection}
        
        <div style="text-align: center; margin-top: 50px; font-size: 12px; color: #777;">
            Generado por Sistema E-commerce Premium - Ing. Juancito Peña Vizcaíno
        </div>
    </div>
    `;

    // ANTI FREEZE: Ocultar el modal correctamente antes de procesar el PDF
    const cartModalInstance = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    if (cartModalInstance) {
        cartModalInstance.hide();
    }
    
    // Forzar remoción manual de backdrop
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(b => b.remove());
    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = '';

    const opt = {
        margin:       10,
        filename:     filename,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(htmlString).save().then(() => {
        cart = [];
        localStorage.removeItem('luxury_cart');
        updateCartUI();
        
        Swal.fire({
            icon: 'success',
            title: 'Transacción Exitosa',
            text: 'El documento ha sido generado y descargado correctamente con todos sus valores.'
        });
    }).catch(err => {
        console.error(err);
        Swal.fire('Error', 'Hubo un error al generar el PDF.', 'error');
    });
}

const style = document.createElement('style');
style.innerHTML = `
@keyframes bounceCount {
    0%, 100% { transform: scale(1) translate(-50%, -50%); }
    50% { transform: scale(1.4) translate(-50%, -50%); }
}
.bounce-anim {
    animation: bounceCount 0.4s ease-out;
}
`;
document.head.appendChild(style);
