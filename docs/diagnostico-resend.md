# 🩺 Diagnóstico y Solución de Errores - Resend Integration

## 📋 Errores Reportados

### Error 1: Endpoint no disponible en modo estático
```
[WARN] [router] /api/contact POST requests are not available in static endpoints. 
Mark this page as server-rendered (`export const prerender = false;`) 
or update your config to `output: 'server'` to make all your pages server-rendered by default.
```

**Estado:** ✅ **CORREGIDO**

**Solución aplicada:** Se agregó `export const prerender = false;` al archivo [`src/pages/api/contact.ts`](src/pages/api/contact.ts:6)

### Error 2: Error de JSON
```
Error procesando formulario de contacto: SyntaxError: Unexpected end of JSON input
```

**Estado:** ⚠️ **POSIBLEMENTE CORREGIDO**

**Causa probable:** Este error ocurre cuando el endpoint no está disponible en modo estático, lo que hace que la solicitud falle y el cuerpo de la respuesta esté vacío.

**Solución:** Al corregir el Error 1, este error debería resolverse automáticamente.

---

## 🔧 Pasos para Resolver el Problema

### 1. Reiniciar el Servidor de Desarrollo

**IMPORTANTE:** Después de modificar el código, es necesario reiniciar el servidor para que los cambios surtan efecto.

```bash
# Detén el servidor actual (Ctrl+C)
# Luego inicia nuevamente
npm run dev
```

### 2. Verificar Configuración de Resend

#### 2.1 Verificar que el dominio está verificado

El email remitente configurado es: `transporteyturismo@rv24.ovh`

**Pasos para verificar:**
1. Inicia sesión en [resend.com](https://resend.com)
2. Ve a la sección "Domains"
3. Busca el dominio `rv24.ovh`
4. Verifica que el estado sea "Verified"

**Si el dominio NO está verificado:**
1. Agrega el dominio `rv24.ovh` en Resend
2. Sigue las instrucciones para agregar los registros DNS
3. Espera a que el dominio se verifique (puede tomar hasta 24 horas)

**Opción alternativa (para pruebas rápidas):**
Cambia el email remitente al dominio de prueba de Resend:
```env
RESEND_FROM_EMAIL=onboarding@resend.dev
```

#### 2.2 Verificar que la API Key es válida

La API Key configurada es: `re_hxQQwof7_3ho8Fj5tgSTjYm4E3FurzZk1`

**Pasos para verificar:**
1. Inicia sesión en [resend.com](https://resend.com)
2. Ve a la sección "API Keys"
3. Verifica que la API Key existe y está activa
4. Confirma que tiene permisos de envío ("sending_access" o "full_access")

### 3. Probar la Integración

#### Prueba 1: Verificar que el endpoint responde

```bash
# Prueba con curl (o usa Postman)
curl -X POST http://localhost:4321/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "3001234567",
    "serviceType": "turismo",
    "message": "Test message"
  }'
```

**Resultado esperado:**
- Si funciona: Deberías recibir un email en `druiz8497@gmail.com`
- Si falla: Revisa los logs del servidor para más detalles

#### Prueba 2: Enviar formulario desde el navegador

1. Abre el formulario de contacto en tu navegador
2. Completa todos los campos con datos de prueba
3. Envía el formulario
4. Verifica que recibas un email en `druiz8497@gmail.com`

### 4. Revisar Logs del Servidor

Los logs del servidor mostrarán información útil para diagnosticar problemas:

```bash
# Logs esperados cuando todo funciona:
Recibiendo solicitud POST en /api/contact
Content-Type: application/json
Datos recibidos: { name: '...', email: '...', ... }
Email enviado exitosamente con ID: xxx
Nuevo contacto recibido: { name: '...', email: '...', ... }

# Logs si hay error de configuración:
RESEND_API_KEY no está configurada en las variables de entorno
RESEND_FROM_EMAIL no está configurado en las variables de entorno

# Logs si hay error de Resend:
Error al enviar email con Resend: { name: '...', message: '...' }
```

---

## 🐛 Solución de Problemas Comunes

### Problema: "Error de configuración del servidor"

**Causa:** Las variables de entorno no están configuradas correctamente.

**Solución:**
1. Verifica que el archivo `.env` existe en la raíz del proyecto
2. Confirma que las variables tienen valores válidos
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
3. Si usas el dominio de prueba, verifica los límites de envío
4. Revisa el dashboard de Resend para ver el estado del email

### Problema: Error de JSON al enviar el formulario

**Causa:** El endpoint no está disponible en modo estático.

**Solución:**
1. Verifica que el archivo [`src/pages/api/contact.ts`](src/pages/api/contact.ts:6) tiene `export const prerender = false;`
2. Reinicia el servidor de desarrollo
3. Limpia el caché del navegador

---

## ✅ Checklist de Verificación

Antes de reportar un problema, verifica lo siguiente:

- [ ] El servidor de desarrollo se reinició después de los cambios
- [ ] El archivo `.env` existe en la raíz del proyecto
- [ ] Las variables de entorno están configuradas correctamente
- [ ] El dominio del email remitente está verificado en Resend
- [ ] La API Key es válida y tiene permisos de envío
- [ ] Los logs del servidor muestran información útil
- [ ] El email no está en la carpeta de spam

---

## 📞 Pasos Siguientes

Si después de seguir estos pasos el problema persiste:

1. **Revisa los logs del servidor** para obtener más detalles del error
2. **Verifica el dashboard de Resend** para ver el estado de los emails
3. **Consulta la documentación** en [`docs/integracion-resend.md`](integracion-resend.md)
4. **Contacta al soporte de Resend** si hay problemas con la API

---

**Última actualización:** 28 de enero de 2026
