# 🚀 Cómo desplegar FlowFinance en 10 minutos

## Lo que vas a lograr
Un link real (tuyo) que tus amigos abren en su teléfono
y pueden instalar FlowFinance como app nativa. Gratis. Sin App Store.

---

## PASO 1 — Crear cuenta en GitHub (si no tienes)
1. Ve a **github.com**
2. Clic en "Sign up"
3. Pon tu correo, crea contraseña y nombre de usuario
4. Confirma tu correo

---

## PASO 2 — Crear repositorio y subir los archivos
1. En GitHub, clic en el botón verde **"New"** (o el ícono +)
2. Nombre del repo: `flowfinance`
3. Selecciona **"Public"** (necesario para Vercel gratis)
4. Clic en **"Create repository"**
5. En la página que aparece, busca la opción **"uploading an existing file"**
6. Arrastra TODA la carpeta `flowfinance-pwa` a la zona de archivos
   ⚠️ Importante: sube la CARPETA, no solo el index.html
7. Clic en **"Commit changes"**

---

## PASO 3 — Desplegar en Vercel (gratis)
1. Ve a **vercel.com**
2. Clic en **"Sign up"** → elegir **"Continue with GitHub"**
3. Autoriza Vercel con GitHub
4. Clic en **"Add New Project"**
5. Busca tu repo `flowfinance` y clic en **"Import"**
6. No cambies nada → clic en **"Deploy"**
7. Espera ~30 segundos

¡Listo! Vercel te da un link tipo: `flowfinance-abc123.vercel.app`

---

## PASO 4 — Dominio personalizado (opcional pero recomendado)
Si quieres algo como `flowfinance.app` o `miflowfinance.com`:
1. Compra el dominio en **namecheap.com** (~$12 USD/año)
2. En Vercel → tu proyecto → "Settings" → "Domains"
3. Agrega tu dominio y sigue las instrucciones

---

## PASO 5 — Cómo instalarla en el teléfono

### En Android (Chrome):
1. Abre el link en Chrome
2. Aparece un banner abajo: **"Instalar FlowFinance"**
3. Toca **"Instalar"** → listo 🎉

### En iPhone (Safari):
1. Abre el link en **Safari** (no Chrome)
2. Toca el botón de compartir ⬆️ (cajita con flecha)
3. Desliza y toca **"Agregar a pantalla de inicio"**
4. Toca **"Agregar"** → listo 🎉

---

## PASO 6 — Compartir con tus amigos
Solo manda el link por WhatsApp:
> "Oye, estoy probando mi app de finanzas personales.
> ¿Me ayudas a probarla? Ábrela en tu cel: [tu-link]
> Instálala y dime qué te parece 🙏"

---

## ¿Qué hace la app sin internet?
- Funciona offline para ver tus datos (cacheados)
- El asesor IA necesita internet (llama a la API de Anthropic)

## ¿Cuánto cuesta?
- GitHub: Gratis
- Vercel: Gratis (hasta 100GB de datos/mes, más que suficiente)
- Dominio: Opcional, ~$12 USD/año
- Anthropic API: ~$5 USD/mes en uso normal de testing
