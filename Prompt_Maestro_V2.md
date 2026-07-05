----------------------------------------------------------------------------------------------------------------------------
# PROMPT MAESTRO: SISTEMA E-COMMERCE Y ALQUILER DE VEHÍCULOS PREMIUM (V5.1 ROLEPLAY CORPORATIVO)
----------------------------------------------------------------------------------------------------------------------------

## 📌 EL RETO (CONTEXTO CORPORATIVO)
**Cliente:** *Luxury Motors Elite Corp.* (Firma internacional de vehículos de alta gama).
**Presupuesto:** $45,000 USD.
**Deadline (Tiempo de entrega):** 48 horas para el Minimum Viable Product (MVP) funcional.
**Antecedentes:** La firma acaba de despedir a su anterior equipo de TI porque entregaron una interfaz aburrida y un sistema de facturación lleno de bugs. El CEO te contactó de emergencia tras ver tu prestigio profesional y tu perfil en linkedin.
**Entrevista Inicial (Extracto del CEO):** 
> *"Nuestros clientes compran autos de $250,000 dólares; nuestra plataforma no puede verse barata ni fallar. Necesitamos un catálogo web asombroso, donde puedan alquilar o comprar de inmediato. Y lo más crítico: el sistema debe generar nuestras Facturas y Contratos de Responsabilidad en PDF de forma automática y perfecta, con las fotos de los vehículos. Si logras entregar esto sin que la página se congele y con una estética verdaderamente Premium, el contrato de mantenimiento anual es tuyo."*

# Paradigma de la Programación

Tú, como ingeniero, sabes que el paradigma de la programación cambió:  
los **prompts**, el **Vibe Coding**, la **IA**, el **MCP** y los **agentes**  
han transformado el mercado de la programación para siempre.  

No importa si para bien o para mal, ahí está el dilema:  

- ¿Lo vas a hacer a la antigua?  
- ¿O vas a ayudarte y usar la IA?  
- ¿Crees que el **MVP** lo puedes tener a tiempo?  
- ¿Buscas ayuda o te enfrentas al reto?  

etc.
----------------------------------------------------------------------------------------------------------------------------

**Tu Rol:** Eres el Ingeniero de Software Principal y Arquitecto Frontend (Nivel Experto) que asumió este desafío. Tu misión es desarrollar esta aplicación web SPA (Single Page Application) desde cero, asegurando que la lógica comercial, la experiencia de usuario (UX/UI) y la generación de documentos sean absolutamente infalibles. No puedes permitirte un solo error. Aceptas el reto y te adhieres a los siguientes requerimientos técnicos.

## 1. STACK TECNOLÓGICO Y LIBRERÍAS

Debes usar estrictamente estas herramientas y CDNs:
* **Estructura:** HTML5 semántico.
* **Estilos:** CSS3 Vanilla incrustado y en un archivo `style.css` auxiliar + **Bootstrap 5.3.3** (`bootstrap.min.css`).
* **Iconografía:** FontAwesome 6.5.1 (`all.min.css`).
* **Lógica:** JavaScript Vanilla (ES6+).
* **Alertas y UI:** SweetAlert2 (`sweetalert2@11`).
* **Generación de PDF:** html2pdf.js (`html2pdf.bundle.min.js`).

---

## 2. ORIGEN DE DATOS (`vehiculo.json`)

Debes realizar un `fetch()` asíncrono a un archivo local `vehiculo.json`. Este archivo tiene dos arreglos raíces: `"vehiculos"` y `"motos"`. 
**ESTRUCTURA DE CADA OBJETO (OBLIGATORIA):**
- `"codigo"` (Number), `"marca"` (String), `"logo"` (String), `"tipo"` (String), `"modelo"` (String), `"caracteristicas"` (String), `"imagen"` (String), `"numeroPuertas"` (Number), `"motor"` (String), `"combustible"` (String), `"categoria"` (String), `"precio_compra"` (Number), `"precio_venta"` (Number), `"precio_alquiler_hora"` (Number), `"precio_alquiler_dia"` (Number), `"oferta_alquiler"` (String), `"existencia"` (Number).

---

## 3. UI/UX: AESTHETICS PREMIUM Y BARRA DE NAVEGACIÓN FIJA

No uses CSS genérico; quiero que programes una interfaz asombrosa.
* **Logotipo Oficial:** OBLIGATORIO usar la ruta local `assets/logo_pagina.png` para el logotipo principal de la empresa. Debe colocarse visiblemente **centrado en el Hero Banner (justo encima del título "CATÁLOGO PREMIUM")** y también centrado en el encabezado de las facturas y contratos en PDF. El menú Navbar debe utilizar un ícono de carro.
* **Menú y Buscador Fijo (Sticky Top / Fixed):** La barra de navegación (Navbar) con el buscador y **las pestañas (Tabs de Vehículos y Motos)** DEBEN ser fijas en la parte superior (`position: sticky` o `fixed` con alto `z-index`). Al hacer scroll hacia abajo, el usuario SIEMPRE debe ver el menú, la barra de búsqueda y poder cambiar de pestañas sin perderlas de vista. Usa el efecto "Glassmorphism" (fondo semi-transparente, `backdrop-filter: blur`) para este menú.
* **Hero Banner:** Encabezado grande con fondo oscuro debajo del menú fijo.
* **Efectos en Tarjetas (Cards):** Al pasar el mouse (`hover`), las tarjetas deben elevarse y proyectar sombra. La imagen debe hacer un zoom in suave.
* **Botón Flotante del Carrito:** Botón flotante inferior derecho con badge dinámico, que gire levemente en hover.

---

## 4. ESTRUCTURA Y COMPONENTES DE LA INTERFAZ

**A. TARJETAS DE VEHÍCULOS (CARDS):**

Renderiza dinámicamente. Mostrar badge de oferta flotante. Encabezado con logo, marca, modelo y código. Precios detallados en lista (Venta, Alquiler Día, Alquiler Hora). Dos botones de igual tamaño: "Alquilar" y "Comprar".


## 5. LÓGICA DE NEGOCIO Y GENERACIÓN DE PDF (INFALIBLE)

Aquí debes ser extremadamente cuidadoso para que la página NO se cuelgue, el PDF NO salga en blanco, y se muestren los valores y textos correctos de acuerdo a lo facturado.

**A. MODALES INTERACTIVOS:**

- **Modal de Alquiler:** Permite elegir "Día/Hora" y calcular subtotal antes de agregar.
- **Modal del Carrito:** Lista compras y alquileres claramente diferenciados.

**B. EL TRUCO INFALIBLE PARA PDFS PERFECTOS (STRING LITERAL):**

Históricamente, al usar elementos ocultos (`display: none`) para generar PDFs en html2pdf.js, el PDF suele salir en blanco o con errores de formato. **LA REGLA MAESTRA ES NO USAR UN DIV OCULTO EN EL HTML**.
En su lugar, debes construir TODO el diseño del PDF (factura/contrato) dinámicamente como un **String Literal (`Template String`)** en JavaScript e inyectarlo directamente a `html2pdf().from(htmlString)`. Asegúrate de no introducir errores de sintaxis en JavaScript.

**REGLAS ESTRICTAS PARA GENERAR EL STRING DEL PDF:**

1. **Analiza el Carrito Dinámicamente:**

   - Si SOLO hay Ventas -> Título: **"FACTURA DE VENTA"** (Excluir cláusula de firmas del HTML String).
   - Si SOLO hay Alquileres -> Título: **"CONTRATO DE ALQUILER Y ACUERDO DE RESPONSABILIDAD"** (Incluir cláusula y firmas).
   - Si hay MIXTO (Ventas y Alquileres) -> Título: **"FACTURA DE VENTA Y CONTRATO DE ALQUILER"** (Incluir cláusula y firmas).

2. **Construye las Filas:** Haz un `forEach` del carrito y genera los `<tr>` con los montos exactos y súmalos al total. **OBLIGATORIO: Asegúrate de incluir 
una columna "FOTO" con la miniatura (`<img src="...">`) de cada vehículo usando `item.imagen`**.

3. **Cierra los Modales antes de Generar:** Para evitar que la pantalla se congele (`backdrop`), ciérralo así: `bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();` e inmediatamente remueve todo `div.modal-backdrop` si quedó alguno en el DOM.

4. **Dispara html2pdf:**
   ```javascript
   html2pdf().set(opt).from(htmlStringDefinitivo).save().then(() => {
       // Limpiar carrito y UI
       // Mostrar SweetAlert de éxito.
   });
   ```
De esta forma garantizamos que la librería genere el PDF internamente usando el string 100% renderizado, evitando cualquier PDF en blanco, previniendo cuelgues, y garantizando los montos y cláusulas correctas según la forma de venta o alquiler.

**B. FOOTER (PIE DE PÁGINA) MAESTRO (OBLIGATORIO Y LITERAL):**

Como desarrollador y creador del proyecto, y para promocionarte, agrega un pie de página (footer) personalizado a tu gusto. En este caso, usaré el siguiente código como ejemplo mejorado::

Para el pie de página, DEBES COPIAR Y PEGAR exactamente el siguiente bloque de código HTML y CSS en el archivo principal. No lo resumas ni cambies las clases ni los enlaces, ya que es el sello oficial del Arquitecto. El borde de la foto de perfil es blanco (`#ffffff`).

```html
  <style>
    footer {
      background: linear-gradient(135deg, #0a0a0a, #1c1c1c);
      color: #fff;
      padding: 50px 0 30px;
      text-align: center;
      margin-top: 20px;
      box-shadow: 0 -5px 20px rgba(0,0,0,0.2);
    }
    footer img.footer-avatar {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      border: 4px solid #ffffff;
      margin-bottom: 20px;
      object-fit: cover;
      transition: transform 0.3s;
    }
    footer img.footer-avatar:hover {
      transform: scale(1.05);
      border-color: #f8f9fa;
    }
    footer h4 {
      font-weight: 800;
      color: #00bfff;
      font-size: 24px;
      margin-bottom: 10px;
    }
    footer p.bio {
      font-size: 16px;
      color: #ddd;
      max-width: 800px;
      margin: 0 auto 20px;
      line-height: 1.6;
    }
    .tech-stack {
      display: inline-block;
      background: rgba(0, 191, 255, 0.1);
      color: #00bfff;
      padding: 6px 14px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 13px;
      margin: 4px;
      border: 1px solid rgba(0, 191, 255, 0.3);
      transition: all 0.3s ease;
    }
    .tech-stack:hover {
      background: rgba(0, 191, 255, 0.2);
      transform: translateY(-2px);
    }
    .tech-stack i { margin-right: 6px; font-size: 15px; }
    .keyword { color: #00d2ff; font-weight: bold; }
    .keyword-ai { color: #ff007f; font-weight: bold; }
    .social-icons-footer { margin: 25px 0; }
    .social-icons-footer a {
      color: #fff;
      font-size: 24px;
      margin: 0 12px;
      transition: all 0.3s ease;
      display: inline-block;
    }
    .social-icons-footer a:hover {
      color: #00bfff;
      transform: translateY(-5px) scale(1.1);
      text-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
    }
    .btn-youtube {
      background: linear-gradient(90deg, #ff0000, #cc0000);
      color: #fff;
      border: none;
      padding: 12px 28px;
      border-radius: 30px;
      font-weight: 700;
      font-size: 16px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(255,0,0,0.3);
    }
    .btn-youtube:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(255,0,0,0.5);
    }
  </style>

  <!-- Footer -->
  <footer>
    <div class="container">
      <img src="assets/FOTO_PORTADA_JUANCITO.png" class="footer-avatar" alt="Ing. Juancito Peña">
      <h4>Ing. Juancito Peña Vizcaíno</h4>
     <p class="bio">
  <span class="keyword">Desarrollador Full Stack</span>, 
  <span style="color: #00ff88; font-weight: bold;">Analista de Datos</span> y 
  <span style="color: #ff8800; font-weight: bold;">Científico de Datos</span>, 
  además de <span class="keyword-ai">Docente universitario en tecnologías</span>. 
  Apasionado por la innovación, la <span class="keyword-ai">Inteligencia Artificial</span> y la educación digital.<br>
  💡 Creador de contenido especializado en arquitectura de software, bases de datos avanzadas, análisis de datos y soluciones tecnológicas modernas.
</p>

      
      <div class="mb-4">
        <span class="tech-stack"><i class="fab fa-html5" style="color: #e34f26;"></i> HTML</span>
        <span class="tech-stack"><i class="fab fa-css3-alt" style="color: #1572b6;"></i> CSS</span>
        <span class="tech-stack"><i class="fab fa-js" style="color: #f7df1e;"></i> JS</span>
        <span class="tech-stack"><i class="fab fa-bootstrap" style="color: #7952b3;"></i> Bootstrap</span>
        <span class="tech-stack"><i class="fab fa-php" style="color: #777bb4;"></i> PHP</span>
        <span class="tech-stack"><i class="fab fa-laravel" style="color: #ff2d20;"></i> Laravel</span>
        <span class="tech-stack"><i class="fas fa-code"></i> C#</span>
        <span class="tech-stack"><i class="fab fa-microsoft"></i> .NET MAUI</span>
        <span class="tech-stack"><i class="fab fa-python" style="color: #3776ab;"></i> Python</span>
        <span class="tech-stack"><i class="fas fa-database" style="color: #cc292b;"></i> SQL Server</span>
        <span class="tech-stack"><i class="fas fa-file-excel" style="color: #1D6F42;"></i> Excel</span>
        <span class="tech-stack"><i class="fas fa-chart-bar" style="color: #f2c811;"></i> Power BI</span>
      </div>

      <div class="social-icons-footer">
        <a href="https://www.youtube.com/@JuancitoDevV" target="_blank" title="YouTube"><i class="fab fa-youtube"></i></a>
        <a href="https://github.com/JUANCITOPENA" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/juancitope%C3%B1a/" target="_blank" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://www.instagram.com/juancito.pena.v/" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="https://www.facebook.com/juancito.p.v" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="https://twitter.com/JuancitoPenaV" target="_blank" title="X (Twitter)"><i class="fa-brands fa-x-twitter"></i></a>
      </div>

      <button class="btn-youtube" onclick="window.open('https://www.youtube.com/@JuancitoDevV','_blank')">
        🎥 Suscríbete a mi canal
      </button>

      <hr class="my-4" style="border-color:#333;">
      <p class="mb-0" style="color: #888; font-size: 14px;">© 2026 Catálogo de Vehículos Premium | Arquitectura por <span style="color: #ccc; font-weight: bold;">Ing. Juancito Peña</span></p>
    </div>
  </footer>
```

---