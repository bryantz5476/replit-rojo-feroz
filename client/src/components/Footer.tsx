import { Scissors, Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-8 h-8 text-primary" />
              <span className="font-display text-2xl text-white tracking-wider">ELITE</span>
            </div>
            <p className="text-white/50 text-sm max-w-sm leading-relaxed">
              Barbería premium masculina donde el estilo urbano se encuentra con la precisión del lujo. 
              Tu imagen, nuestra pasión.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg text-white tracking-wide mb-4">SERVICIOS</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              <li><a href="#servicios" className="hover:text-white transition-colors">Corte Clásico</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Degradado Premium</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Barba Completa</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Afeitado Tradicional</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Pack Novio VIP</a></li>
            </ul>
          </div>

          <div id="contacto">
            <h4 className="font-display text-lg text-white tracking-wide mb-4">CONTACTO</h4>
            <ul className="space-y-3 text-white/50 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Calle de la Barbería 42<br />28001 Madrid</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+34912345678" className="hover:text-white transition-colors">+34 912 345 678</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:hola@elitebarberia.es" className="hover:text-white transition-colors">hola@elitebarberia.es</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            &copy; {currentYear} Elite Barbería. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-white/30 text-sm">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
