import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Configurar este endpoint como server-side (no estático)
export const prerender = false;

// Inicializar Resend con API Key desde variables de entorno
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    // Log para debugging
    console.log('Recibiendo solicitud POST en /api/contact');
    console.log('Content-Type:', request.headers.get('content-type'));
    
    const data = await request.json();
    console.log('Datos recibidos:', data);
    
    // Validación básica
    const { name, email, phone, serviceType, message } = data;
    
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Por favor completa todos los campos requeridos.',
        }),
        { status: 400 }
      );
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Por favor ingresa un email válido.',
        }),
        { status: 400 }
      );
    }
    
    // Validar que la API Key de Resend esté configurada
    if (!import.meta.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY no está configurada en las variables de entorno');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Error de configuración del servidor. Por favor contacta al administrador.',
        }),
        { status: 500 }
      );
    }

    // Validar que el email remitente esté configurado
    if (!import.meta.env.RESEND_FROM_EMAIL) {
      console.error('RESEND_FROM_EMAIL no está configurado en las variables de entorno');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Error de configuración del servidor. Por favor contacta al administrador.',
        }),
        { status: 500 }
      );
    }

    // Validar que el email destino esté configurado
    const toEmail = import.meta.env.RESEND_TO_EMAIL || 'direccionsucursalmedellin@gmail.com';

    // Mapear el tipo de servicio a un nombre legible
    const serviceTypeMap: Record<string, string> = {
      turismo: 'Transporte Turístico',
      turistico: 'Turismo y Excursiones',
      empresarial: 'Transporte Empresarial',
      salud: 'Transporte Salud (EPS/IPS)',
      escolar: 'Transporte Escolar',
      eventos: 'Eventos Especiales',
      aeropuerto: 'Traslado al Aeropuerto',
      otro: 'Otro',
      peticion: 'Petición',
      queja: 'Queja',
      reclamo: 'Reclamo',
      sugerencia: 'Sugerencia',
      felicitacion: 'Felicitación',
    };
    const serviceTypeName = serviceTypeMap[serviceType] || serviceType || 'No especificado';
    
    // Determinar si es una solicitud de cotización o PQR
    const isQuoteRequest = data.subject && data.subject.includes('Cotización');
    const isPQRRequest = data.subject && data.subject.includes('PQR');
    
    // Construir el contenido del email en formato HTML
    const emailBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${isPQRRequest ? 'Nuevo Formulario PQR' : isQuoteRequest ? 'Nueva Solicitud de Cotización' : 'Nuevo Contacto'}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background-color: #f9f9f9;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h2 {
              color: #077b4c;
              margin-top: 0;
              border-bottom: 2px solid #077b4c;
              padding-bottom: 10px;
            }
            .field {
              margin-bottom: 15px;
            }
            .label {
              font-weight: bold;
              color: #555;
            }
            .value {
              color: #333;
              margin-top: 5px;
            }
            .message {
              background-color: #fff;
              padding: 15px;
              border-left: 4px solid #077b4c;
              margin-top: 20px;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>${isPQRRequest ? 'Nuevo Formulario PQR Recibido' : isQuoteRequest ? 'Nueva Solicitud de Cotización Recibida' : 'Nuevo Contacto Recibido'}</h2>
            
            <div class="field">
              <div class="label">Nombre:</div>
              <div class="value">${escapeHtml(name)}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${escapeHtml(email)}</div>
            </div>
            
            <div class="field">
              <div class="label">Teléfono:</div>
              <div class="value">${phone ? escapeHtml(phone) : 'No proporcionado'}</div>
            </div>
            
            <div class="field">
              <div class="label">${isPQRRequest ? 'Tipo de PQR:' : 'Tipo de Servicio:'}</div>
              <div class="value">${escapeHtml(serviceTypeName)}</div>
            </div>
            
            <div class="message">
              <div class="label">Mensaje:</div>
              <div class="value">${escapeHtml(message)}</div>
            </div>
            
            <div class="footer">
              <p><em>Enviado desde el ${isPQRRequest ? 'formulario PQR' : isQuoteRequest ? 'formulario de cotización' : 'formulario de contacto'} del sitio web de Transporte y Turismo Antioquia</em></p>
              <p><em>Fecha: ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</em></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar email usando Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: import.meta.env.RESEND_FROM_EMAIL,
      to: toEmail,
      subject: isPQRRequest
        ? `Formulario PQR (${serviceTypeName}) - ${name}`
        : isQuoteRequest
        ? `Solicitud de Cotización - ${serviceTypeName}`
        : `Nuevo contacto de ${name} - ${serviceTypeName}`,
      html: emailBody,
      replyTo: email,
    });

    if (emailError) {
      console.error('Error al enviar email con Resend:', emailError);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.',
        }),
        { status: 500 }
      );
    }

    console.log('Email enviado exitosamente con ID:', emailData?.id);
    console.log(isQuoteRequest ? 'Nueva solicitud de cotización recibida:' : 'Nuevo contacto recibido:', { name, email, phone, serviceType, message });
    
    return new Response(
      JSON.stringify({
        success: true,
        message: isPQRRequest
          ? '¡Tu PQR ha sido recibido! Te contactaremos pronto para dar respuesta.'
          : isQuoteRequest
          ? '¡Solicitud de cotización enviada! Te contactaremos pronto con tu propuesta.'
          : '¡Gracias por contactarnos! Te responderemos pronto.',
      }),
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error procesando formulario de contacto:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.',
      }),
      { status: 500 }
    );
  }
};

/**
 * Función auxiliar para escapar caracteres HTML y prevenir XSS
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}
