# Documentación: Integración de Resend para Formulario de Contacto

## 📌 Resumen

Se ha implementado la integración de **Resend API** para enviar los datos del formulario de contacto por correo electrónico. Cuando un usuario envía el formulario, los datos se envían a una dirección de correo específica.

## 🚀 Configuración Requerida

### 1. Crear cuenta en Resend

1. Visita [resend.com](https://resend.com) y crea una cuenta
2. Verifica tu dominio de correo electrónico
3. Genera una API Key con permisos de envío

### 2. Configurar Variables de Entorno

Crea o edita el archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

```env
# Resend Email API Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@tudominio.com
RESEND_TO_EMAIL=direccionsucursalmedellin@gmail.com
```

**Descripción de las variables:**

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `RESEND_API_KEY` | API Key generada en Resend | `re_abc123def456` |
| `RESEND_FROM_EMAIL` | Email remitente verificado en Resend | `noreply@tudominio.com` |
| `RESEND_TO_EMAIL` | Email destino para recibir los formularios | `contacto@tudominio.com` |

**⚠️ Importante:** El email remitente (`RESEND_FROM_EMAIL`) debe estar verificado en tu cuenta de Resend. Si no tienes un dominio verificado, puedes usar el dominio de prueba de Resend: `onboarding@resend.dev`.

## 📧 Estructura del Email Enviado

### Asunto
```
Nuevo contacto de [Nombre] - [Tipo de Servicio]
```

### Contenido HTML

El email incluye un diseño profesional con:
- Encabezado con título
- Información del contacto (nombre, email, teléfono)
- Tipo de servicio seleccionado
- Mensaje del usuario
- Footer con fecha y hora de envío

### Ejemplo de Email Recibido

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; ... }
      .container { background-color: #f9f9f9; ... }
      h2 { color: #077b4c; ... }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Nuevo Contacto Recibido</h2>
      
      <div class="field">
        <div class="label">Nombre:</div>
        <div class="value">Juan Pérez</div>
      </div>
      
      <div class="field">
        <div class="label">Email:</div>
        <div class="value">juan@example.com</div>
      </div>
      
      <div class="field">
        <div class="label">Teléfono:</div>
        <div class="value">300 123 4567</div>
      </div>
      
      <div class="field">
        <div class="label">Tipo de Servicio:</div>
        <div class="value">Transporte Turístico</div>
      </div>
      
      <div class="message">
        <div class="label">Mensaje:</div>
        <div class="value">Necesito información sobre servicios turísticos...</div>
      </div>
      
      <div class="footer">
        <p>Enviado desde el formulario de contacto...</p>
        <p>Fecha: 28/01/2026, 12:00:00</p>
      </div>
    </div>
  </body>
</html>
```

## 🔧 Componentes Modificados

### 1. [`src/pages/api/contact.ts`](src/pages/api/contact.ts)

**Cambios principales:**

- Importación del SDK de Resend
- Inicialización del cliente de Resend con API Key
- Validación de variables de entorno
- Construcción del email en formato HTML
- Envío del email usando Resend API
- Manejo de errores mejorado
- Función `escapeHtml()` para prevenir XSS

**Flujo del endpoint:**

```typescript
1. Recibir datos del formulario
2. Validar campos requeridos (nombre, email, mensaje)
3. Validar formato de email
4. Verificar que API Key esté configurada
5. Construir email HTML con los datos
6. Enviar email via Resend API
7. Retornar respuesta de éxito o error
```

### 2. [`.env.example`](.env.example)

Se agregaron las variables de entorno de Resend:
```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_TO_EMAIL=
```

### 3. [`package.json`](package.json)

Se agregó la dependencia:
```json
{
  "dependencies": {
    "resend": "^latest"
  }
}
```

## 🔒 Seguridad

### Protección contra XSS

Se implementa la función `escapeHtml()` para escapar caracteres especiales en el contenido del email:

```typescript
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}
```

### Variables de Entorno

- Las API Keys **nunca** se hardcodean en el código fuente
- Se usan variables de entorno para todas las credenciales
- El archivo `.env` debe agregarse a `.gitignore` (ya configurado)

## 🧪 Pruebas

### Prueba 1: Envío Exitoso

1. Completa el formulario con datos válidos
2. Envía el formulario
3. Verifica que recibas un email en la dirección destino
4. Confirma que el email contiene todos los datos del formulario

### Prueba 2: Validación de Campos

1. Envía el formulario con campos incompletos
2. Verifica que recibas un mensaje de error
3. Confirma que el email NO se envió

### Prueba 3: Email Inválido

1. Ingresa un email con formato incorrecto (ej: `correo@invalido`)
2. Envía el formulario
3. Verifica que recibas un mensaje de error de validación

### Prueba 4: Error de API

1. Configura una API Key inválida en `.env`
2. Envía el formulario
3. Verifica que recibas un mensaje de error genérico
4. Revisa los logs del servidor para más detalles

## 📊 Monitoreo

### Logs del Servidor

El endpoint registra los siguientes eventos:

```typescript
// Email enviado exitosamente
console.log('Email enviado exitosamente con ID:', emailData?.id);
console.log('Nuevo contacto recibido:', { name, email, phone, serviceType, message });

// Error al enviar email
console.error('Error al enviar email con Resend:', emailError);

// API Key no configurada
console.error('RESEND_API_KEY no está configurada en las variables de entorno');
```

### Tracking con Resend

Resend proporciona un dashboard para monitorear:
- Emails enviados
- Tasa de entrega
- Emails rebotados
- Estadísticas de apertura y clics

Accede al dashboard en [resend.com/dashboard](https://resend.com/dashboard)

## 🐛 Solución de Problemas

### Problema: "Error de configuración del servidor"

**Causa:** Las variables de entorno no están configuradas correctamente.

**Solución:**
1. Verifica que el archivo `.env` existe en la raíz del proyecto
2. Confirma que `RESEND_API_KEY` tiene un valor válido
3. Reinicia el servidor de desarrollo

### Problema: "Hubo un error al enviar tu mensaje"

**Causa:** Error al comunicarse con la API de Resend.

**Solución:**
1. Verifica que la API Key es válida
2. Confirma que el email remitente está verificado en Resend
3. Revisa los logs del servidor para más detalles
4. Verifica tu cuenta de Resend para ver si hay límites de envío

### Problema: El email no se recibe

**Causa:** El email puede estar en spam o el dominio no está verificado.

**Solución:**
1. Revisa la carpeta de spam
2. Verifica que el dominio del email remitente esté verificado en Resend
3. Si usas el dominio de prueba (`onboarding@resend.dev`), verifica los límites de envío

### Problema: Formato del email incorrecto

**Causa:** Los caracteres especiales no se están escapando correctamente.

**Solución:**
1. Verifica que la función `escapeHtml()` se esté llamando para todos los campos
2. Revisa el HTML generado en los logs del servidor

## 📚 Referencias

- [Documentación de Resend](https://resend.com/docs)
- [Resend Node.js SDK](https://github.com/resend/resend-node)
- [Astro API Routes](https://docs.astro.build/en/guides/endpoints/)

## 🔄 Actualizaciones Futuras

Posibles mejoras a considerar:

1. **Email de confirmación al usuario**: Enviar un email automático confirmando la recepción del mensaje
2. **Almacenamiento en Strapi**: Guardar los formularios en el CMS para histórico
3. **Attachments**: Permitir adjuntar archivos al formulario
4. **Rate limiting**: Implementar límites de envío para prevenir abuso
5. **Webhooks**: Configurar webhooks de Resend para tracking de emails
6. **Plantillas de email**: Usar plantillas de email de Resend para mayor flexibilidad
7. **Analytics**: Implementar tracking de envíos de formularios

## 👥 Soporte

Si encuentras algún problema o necesitas ayuda con la integración:

1. Revisa los logs del servidor
2. Consulta la documentación de Resend
3. Revisa el plan de implementación en [`plans/integracion-resend-formulario.md`](../plans/integracion-resend-formulario.md)
4. Contacta al equipo de desarrollo

---

**Última actualización:** 28 de enero de 2026
