<div align="center">
  <img src="assets/logo_pagina.png" alt="Luxury Motors Elite Corp Logo" width="200"/>
  <h1>🏎️ Luxury Motors Elite Corp - E-Commerce & Alquiler Premium</h1>
  <p><em>Plataforma web de catálogo premium para venta y alquiler de vehículos de alta gama.</em></p>
</div>

---

## 📌 El Reto (Contexto Corporativo)

**Cliente:** *Luxury Motors Elite Corp.* (Firma internacional de vehículos de alta gama).

Este proyecto es un **Minimum Viable Product (MVP)** funcional construido en tiempo récord (48 horas). La plataforma está diseñada para una audiencia que adquiere vehículos de lujo (+$250,000 USD), por lo que la interfaz no puede verse barata ni fallar. Ofrece un catálogo web asombroso donde los usuarios pueden alquilar o comprar de inmediato.

**Lo más crítico del sistema:** Generación de **Facturas y Contratos de Responsabilidad en PDF** de forma automática, perfecta y con fotos de los vehículos, sin congelar la página, manteniendo una estética verdaderamente Premium.

---

## 🚀 Características Principales

*   **✨ UI/UX Premium (Vibe Coding):** Interfaz asombrosa con efectos *Glassmorphism*, animaciones suaves, sombras, hover dinámicos y un diseño oscuro/premium.
*   **📌 Navegación Fija (Sticky):** Menú Navbar fijo en la parte superior, buscador dinámico y pestañas (Vehículos/Motos) que siempre acompañan al usuario mientras hace scroll.
*   **🛒 Carrito Flotante Inteligente:** Un botón flotante inferior derecho con badge dinámico, separando visualmente compras y alquileres en su modal interactivo.
*   **📄 Generación de PDF Infalible:** Algoritmo avanzado que usa Template Strings de JavaScript para inyectar directamente a `html2pdf.js`. 
    *   Genera **"FACTURA DE VENTA"** si solo hay compras.
    *   Genera **"CONTRATO DE ALQUILER Y ACUERDO DE RESPONSABILIDAD"** con firmas si solo hay alquileres.
    *   Genera **"FACTURA DE VENTA Y CONTRATO DE ALQUILER"** si hay ambas operaciones.
    *   ¡Incluye la miniatura del vehículo en el documento PDF!
*   **📊 Datos Dinámicos:** Consumo de catálogo directamente desde `vehiculo.json` mediante peticiones asíncronas (`fetch`).

---

## 🛠️ Stack Tecnológico

La plataforma fue desarrollada utilizando las siguientes herramientas y librerías, priorizando rendimiento y estética sin dependencias pesadas:

*   ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) **Estructura:** HTML5 Semántico.
*   ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) **Estilos:** CSS3 Vanilla incrustado y en `style.css`.
*   ![Bootstrap](https://img.shields.io/badge/Bootstrap_5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white) **Framework UI:** Bootstrap 5.3.3.
*   ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) **Lógica:** JavaScript Vanilla (ES6+).
*   ![FontAwesome](https://img.shields.io/badge/FontAwesome_6.5-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white) **Iconografía:** FontAwesome 6.5.1.
*   ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-8A2BE2?style=for-the-badge) **Alertas:** SweetAlert2.
*   ![html2pdf](https://img.shields.io/badge/html2pdf.js-FF6F00?style=for-the-badge) **Motor PDF:** html2pdf.bundle.min.js.

---

## 📂 Estructura del Proyecto

```text
VENTAS Y ALQUILER DE AUTOS/
│
├── assets/                 # Imágenes, logotipo oficial y foto del arquitecto
├── index.html              # Estructura principal y plantillas (SPA)
├── style.css               # Estilos personalizados (Glassmorphism, UI Premium)
├── app.js                  # Lógica de negocio, renderizado del catálogo, modales y PDF
├── vehiculo.json           # Origen de datos de vehículos y motos (Simulación de DB)
├── Contrato_Alquiler...pdf # Ejemplo del documento generado en PDF
├── Prompt_Maestro_V2.md    # Requisitos originales e instrucciones corporativas
└── README.md               # Este archivo de documentación
```

---

## 💻 Instalación y Uso

Dado que es una Single Page Application (SPA) pura basada en frontend, no requiere bases de datos locales ni compilación de Node.js.

1.  **Clonar o Descargar** esta carpeta en tu ordenador.
2.  **Servidor Local (OBLIGATORIO para el `fetch` del JSON):** Debido a restricciones de seguridad del navegador (CORS) con archivos `file://`, debes servir la carpeta con un servidor web local:
    *   *Opción 1 (VS Code):* Instala la extensión **Live Server**, haz clic derecho en `index.html` y selecciona "Open with Live Server".
    *   *Opción 2 (Python):* Abre la terminal en esta carpeta y ejecuta `python -m http.server 8000`. Luego entra a `http://localhost:8000`.
3.  **Uso:** Navega entre vehículos, usa el buscador, agrega items al carrito y prueba la generación automática de contratos y facturas.

---

## 👨‍💻 Autor y Arquitecto

<div align="center">
  <img src="assets/FOTO_PORTADA_JUANCITO.png" width="130" style="border-radius: 50%; border: 4px solid #fff;" alt="Ing. Juancito Peña">
  <h3>Ing. Juancito Peña Vizcaíno</h3>
  <p><strong>Desarrollador Full Stack | Analista de Datos | Científico de Datos | Docente Universitario</strong></p>
  <p><em>💡 Creador de contenido especializado en arquitectura de software, bases de datos avanzadas, análisis de datos y soluciones tecnológicas modernas.</em></p>
  
  [![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@JuancitoDevV)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JUANCITOPENA)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/juancitope%C3%B1a/)
  [![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/juancito.pena.v/)
</div>

<br>
<p align="center">© 2026 Catálogo de Vehículos Premium | Arquitectura por <strong>Ing. Juancito Peña</strong></p>
