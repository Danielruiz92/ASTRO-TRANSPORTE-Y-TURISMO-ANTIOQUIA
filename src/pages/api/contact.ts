import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validación básica
    const { name, email, phone, message } = data;
    
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
    
    // Aquí integrarías con un servicio real:
    // - SendGrid, Mailgun, Resend, etc.
    // - Base de datos para guardar consultas
    // - Sistema CRM
    
    // Por ahora, simulamos éxito y logeamos
    console.log('Nuevo contacto recibido:', { name, email, phone, message });
    
    // Ejemplo de integración futura:
    // await sendEmail({
    //   to: 'direccionsucursalmedellin@gmail.com',
    //   subject: `Nuevo contacto de ${name}`,
    //   text: message,
    //   replyTo: email
    // });
    
    return new Response(
      JSON.stringify({
        success: true,
        message: '¡Gracias por contactarnos! Te responderemos pronto.',
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
