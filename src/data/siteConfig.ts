export const siteConfig = {
  name: "Transporte y Turismo Antioquia",
  description: "Empresa líder en servicios de transporte y turismo en Antioquia",
  
  contact: {
    phone: "+573043368556",
    email: "info@transporteturismoantioquia.com",
    address: "Medellín, Antioquia, Colombia",
  },
  
  social: {
    facebook: "https://facebook.com/transporteturismoantioquia",
    instagram: "https://instagram.com/transporteturismoantioquia",
    whatsapp: "+573043368556",
  },
  
  portals: {
    employees: {
      name: "Acceso a Empleados",
      url: "http://portal2sgt.azurewebsites.net/Accounts/Account/Login"
    },
    affiliates: {
      name: "Portal Afiliados",
      url: "http://afiliados.sgt.com.co/"
    }
  },
  
  navigation: [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Flota", href: "/flota" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ],
  
  certifications: [
    "ISO 9001:2015",
    "ICONTEC NTC 5133",
    "Registro Nacional de Turismo",
  ],
  
  services: {
    main: [
      "Transporte Empresarial",
      "Turismo y Excursiones",
      "Eventos Especiales",
      "Transporte Escolar",
    ]
  }
};

export type SiteConfig = typeof siteConfig;
