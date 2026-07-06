# 🏎️ LuxuryMotors - E-Commerce SPA de Vehículos Premium

![LuxuryMotors Banner](https://img.shields.io/badge/LuxuryMotors-SPA%20Veh%C3%ADculos%20Premium-000000?style=for-the-badge&logo=appveyor)

**LuxuryMotors** es una aplicación web tipo **Single Page Application (SPA)** de alto rendimiento para ventas y alquiler de vehículos de lujo y deportivos. Construida con una interfaz moderna y atractiva, permite a los usuarios buscar en tiempo real, visualizar características detalladas, gestionar un carrito inteligente para ventas/alquileres, simular pagos y **generar facturas o contratos de alquiler en PDF** (incluyendo fotografías de los vehículos).

Este proyecto nace como una demostración de poder en la "Batalla de IAs": **Gemini vs Google AI Studio vs Antigravity CLI**, demostrando cómo la Inteligencia Artificial acelera el desarrollo front-end profesional sin frameworks complejos.

---

## ✨ Características Premium

*   **⚡ Arquitectura SPA & JSON Local:** Inyección dinámica de vehículos desde archivos JSON locales mediante Promesas y Fetch API, garantizando una carga instantánea.
*   **🔎 Búsqueda Inteligente en Tiempo Real:** Filtra el catálogo instantáneamente mientras el usuario teclea en el buscador de la barra de navegación (efecto blur/glassmorphism).
*   **🛒 Carrito Híbrido (Compra y Alquiler):** Sistema que diferencia entre compras directas y alquileres por días, calculando dinámicamente precios y depósitos. Persistente mediante `LocalStorage`.
*   **🧾 Generación de Contratos y Facturas (PDF):** Utiliza `html2pdf.js` para renderizar recibos y contratos visualmente atractivos que incluyen los datos del cliente, totales calculados y **la fotografía del vehículo** involucrado.
*   **📱 UI/UX Exclusiva y Responsiva:** Diseño oscuro y elegante (Premium UI) con animaciones hover fluidas en tarjetas, diseñado con **Bootstrap 5.3** y **CSS3** puro.
*   **🔔 Alertas Interactivas:** Integración nativa de `SweetAlert2` para notificaciones elegantes, confirmaciones de vaciado de carrito y éxito de pago.

---

## 🛠️ Tecnologías Empleadas

*   **HTML5 & CSS3** (Variables nativas, flexbox, grid, glassmorphism)
*   **JavaScript (ES6+)** (Vanilla JS, Promesas, DOM dinámico)
*   **Bootstrap 5.3.3** (Layout responsivo y modales)
*   **SweetAlert2** (Alertas modales estéticas)
*   **html2pdf.js** (Generación avanzada de PDFs con imágenes)
*   **FontAwesome** (Iconografía vectorial)

---

## 🚀 Instalación y Despliegue Local

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/JUANCITOPENA/GEMINI_GOOGLE_AI_ANTIGRAVITY_ECOMMERCE.git
    ```
2.  **Abrir en tu editor (VS Code):**
    ```bash
    cd GEMINI_GOOGLE_AI_ANTIGRAVITY_ECOMMERCE
    code .
    ```
3.  **Ejecución:**
    Abre el archivo `index.html` utilizando la extensión **Live Server** para evitar problemas de CORS con la carga del archivo JSON local.

---

## 🌐 Enlaces Oficiales

*   **Ver Demo en Vivo (GitHub Pages):** [LuxuryMotors Live](https://juancitopena.github.io/GEMINI_GOOGLE_AI_ANTIGRAVITY_ECOMMERCE/)
*   **Video Explicativo:** [YouTube - Gemini vs AI Studio vs Antigravity](https://www.youtube.com/watch?v=TqqODDYtkIM)

> *"Democratizando la programación con Inteligencia Artificial, un prompt a la vez."*
> **— Ing. Juancito Peña**
