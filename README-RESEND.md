# 🚀 Integración de Resend - Instrucciones de Configuración

## 📋 Resumen

La integración de Resend para el formulario de contacto ya está implementada en el código. Para completar la configuración, sigue estos pasos.

## ⚠️ IMPORTANTE: Reiniciar el Servidor

**Antes de probar la integración, DEBES reiniciar el servidor de desarrollo:**

```bash
# Detén el servidor actual (Ctrl+C)
# Luego inicia nuevamente
npm run dev
```

Esto es necesario porque se modificó el archivo [`src/pages/api/contact.ts`](src/pages/api/contact.ts) para agregar `export const prerender = false;`, lo cual requiere un reinicio del servidor.

## ⚙️ Pasos de Configuración

### 1. Crear Cuenta en Resend

1. Visita [resend.com](https://resend.com) y crea una cuenta gratuita
2. Verifica tu dirección de correo electrónico
3. Ve a la sección de "API Keys" y crea una nueva API Key con permisos de envío

### 2. Verificar Dominio de Email

**Opción A: Usar tu propio dominio**
1. En Resend, ve a "Domains"
2. Agrega tu dominio (ej: `tudominio.com`)
3. Sigue las instrucciones para verificar el dominio (DNS records)
4. Una vez verificado, puedes usar emails como `noreply@tudominio.com`

**Opción B: Usar dominio de prueba (para desarrollo)**
- Puedes usar `onboarding@resend.dev` como email remitente
- Este dominio está pre-verificado por Resend
- **Nota:** Tiene limitaciones de envío

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (si no existe) con el siguiente contenido:

```env
# Resend Email API Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@tudominio.com
RESEND_TO_EMAIL=direccionsucursalmedellin@gmail.com
```

**Valores a configurar:**

| Variable | Valor |
|----------|-------|
| `RESEND_API_KEY` | La API Key que generaste en Resend |
| `RESEND_FROM_EMAIL` | Email remitente verificado (ej: `noreply@tudominio.com` o `onboarding@resend.dev`) |
| `RESEND_TO_EMAIL` | Email donde quieres recibir los formularios (ej: `direccionsucursalmedellin@gmail.com`) |

### 4. Reiniciar el Servidor de Desarrollo

Después de configurar las variables de entorno, reinicia el servidor:

```bash
# Detén el servidor actual (Ctrl+C)
# Luego inicia nuevamente
npm run dev
```

## 🧪 Probar la Integración

### Prueba Rápida

1. Abre el formulario de contacto en tu navegador
2. Completa todos los campos con datos de prueba
3. Envía el formulario
4. Verifica que recibas un email en la dirección configurada en `RESEND_TO_EMAIL`

### Verificar Logs

Si algo no funciona, revisa los logs del servidor:

```bash
# Verás mensajes como:
# - "Email enviado exitosamente con ID: xxx"
# - "Error al enviar email con Resend: xxx"
# - "RESEND_API_KEY no está configurada"
```

## 📧 Estructura del Email Recibido

El email que recibirás tendrá el siguiente formato:

**Asunto:** `Nuevo contacto de [Nombre] - [Tipo de Servicio]`

**Contenido:**
- Nombre del contacto
- Email del contacto
- Teléfono (si fue proporcionado)
- Tipo de servicio seleccionado
- Mensaje del usuario
- Fecha y hora de envío

## 🔒 Seguridad

- ✅ Las API Keys se almacenan en variables de entorno (no en el código)
- ✅ El contenido del email se escapa para prevenir XSS
- ✅ Se validan todos los campos antes de enviar
- ✅ Los errores se manejan apropiadamente

## 📚 Documentación Adicional

- **Plan de implementación:** [`plans/integracion-resend-formulario.md`](plans/integracion-resend-formulario.md)
- **Documentación completa:** [`docs/integracion-resend.md`](docs/integracion-resend.md)
- **Código del endpoint:** [`src/pages/api/contact.ts`](src/pages/api/contact.ts)

## 🐛 Solución de Problemas

### Error: "/api/contact POST requests are not available in static endpoints"

**Causa:** El endpoint API no está configurado como server-side.

**Solución:**
1. Verifica que el archivo [`src/pages/api/contact.ts`](src/pages/api/contact.ts:6) tiene `export const prerender = false;`
2. **Reinicia el servidor de desarrollo** (Ctrl+C, luego `npm run dev`)
3. Limpia el caché del navegador

### Error: "Error de configuración del servidor"

**Solución:** Verifica que las variables de entorno estén configuradas correctamente en el archivo `.env`.

### Error: "Hubo un error al enviar tu mensaje"

**Solución:**
1. Verifica que la API Key es válida
2. Confirma que el email remitente está verificado en Resend
3. Revisa los logs del servidor para más detalles

### El email no se recibe

**Solución:**
1. Revisa la carpeta de spam
2. Verifica que el dominio del email remitente esté verificado en Resend
3. Si usas el dominio de prueba, verifica los límites de envío

### Error: "SyntaxError: Unexpected end of JSON input"

**Causa:** El endpoint no está disponible en modo estático.

**Solución:**
1. Verifica que el archivo [`src/pages/api/contact.ts`](src/pages/api/contact.ts:6) tiene `export const prerender = false;`
2. **Reinicia el servidor de desarrollo** (Ctrl+C, luego `npm run dev`)

## 📞 Soporte

Si necesitas ayuda adicional:
1. Revisa la documentación en [`docs/integracion-resend.md`](docs/integracion-resend.md)
2. Consulta los logs del servidor
3. Visita la documentación de [Resend](https://resend.com/docs)

---

**¡Listo!** La integración está completa. Solo necesitas configurar las variables de entorno y verificar tu dominio en Resend para empezar a recibir emails.
