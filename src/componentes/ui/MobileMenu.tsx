import { useState } from 'react';

interface NavItem {
  name: string;
  href: string;
  isActive?: boolean;
}

interface Portal {
  name: string;
  url: string;
}

interface MobileMenuProps {
  items: NavItem[];
  portals?: {
    employees: Portal;
    affiliates: Portal;
  };
}

export default function MobileMenu({ items, portals }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={toggleMenu}
        className="text-dark hover:text-primary focus:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2"
        aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Menú móvil */}
      {isOpen && (
        <>
          {/* Overlay para cerrar al hacer clic fuera */}
          <div
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
          
          {/* Panel del menú */}
          <div
            id="mobile-menu"
            className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50 border-t"
            role="navigation"
            aria-label="Menú de navegación móvil"
          >
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md font-[Poppins] font-medium transition-colors ${
                    item.isActive
                      ? 'text-primary font-bold bg-light'
                      : 'text-dark hover:text-primary hover:bg-light'
                  }`}
                  onClick={closeMenu}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Sección de Portales */}
              {portals && (
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <p className="px-3 pb-2 text-xs font-[Poppins] font-semibold text-gray-500 uppercase tracking-wider">
                    Portales
                  </p>
                  <a
                    href={portals.employees.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-md font-[Poppins] font-medium text-dark hover:text-primary hover:bg-light transition-colors"
                    onClick={closeMenu}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {portals.employees.name}
                  </a>
                  <a
                    href={portals.affiliates.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-md font-[Poppins] font-medium text-dark hover:text-primary hover:bg-light transition-colors"
                    onClick={closeMenu}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {portals.affiliates.name}
                  </a>
                </div>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
}

