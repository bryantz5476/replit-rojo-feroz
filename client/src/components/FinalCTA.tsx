import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Quote, Star, MapPin, Clock, Mail, Phone } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Carlos M.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    text: "La mejor barbería de la ciudad. El degradado queda perfecto siempre. Ya soy cliente habitual desde hace 2 años.",
    rating: 5,
  },
  {
    id: 2,
    name: "Andrés R.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    text: "El ambiente es increíble y los barberos son verdaderos profesionales. Cada visita es una experiencia premium.",
    rating: 5,
  },
  {
    id: 3,
    name: "Miguel L.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    text: "Probé muchas barberías antes de encontrar esta. La atención al detalle y la calidad del servicio no tienen competencia.",
    rating: 5,
  },
  {
    id: 4,
    name: "David S.",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&q=80",
    text: "El afeitado tradicional con navaja es una experiencia que todo hombre debería probar. Absolutamente recomendado.",
    rating: 5,
  },
];

const partners = [
  { id: 1, name: "Baxter of California" },
  { id: 2, name: "American Crew" },
  { id: 3, name: "Reuzel" },
  { id: 4, name: "Layrite" },
  { id: 5, name: "Suavecito" },
];

function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[280px] overflow-hidden" data-testid="testimonial-carousel">
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonials[currentIndex].id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center text-center px-4"
        >
          <Quote className="w-10 h-10 text-primary mb-6" />

          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            "{testimonials[currentIndex].text}"
          </p>

          <div className="flex items-center gap-4">
            <img
              src={testimonials[currentIndex].avatar}
              alt={testimonials[currentIndex].name}
              className="w-14 h-14 rounded-full object-cover border-2 border-primary"
            />
            <div className="text-left">
              <p className="font-display text-lg text-white tracking-wide">
                {testimonials[currentIndex].name}
              </p>
              <div className="flex gap-0.5">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-primary" : "bg-white/30 hover:bg-white/50"
              }`}
            data-testid={`button-testimonial-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-black relative overflow-hidden"
      data-testid="section-final-cta"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(225,6,0,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(225,6,0,0.08),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-wide">
            ¿LISTO PARA EL <span className="text-primary">CAMBIO</span>?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos que ya confían en nosotros para su imagen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <TestimonialCarousel />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-8 mb-16 opacity-50"
        >
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="font-display text-xl text-white/60 tracking-widest"
              data-testid={`logo-partner-${partner.id}`}
            >
              {partner.name}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card/50 backdrop-blur-sm border border-card-border rounded-md p-8 md:p-12 max-w-5xl mx-auto"
        >
          <h3 className="font-display text-3xl sm:text-4xl text-white text-center mb-12 tracking-wide">
            RESERVA TU <span className="text-primary">CITA</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <div className="space-y-8 flex flex-col justify-center">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-xl text-white mb-1 tracking-wide">Dirección</h4>
                  <p className="text-muted-foreground">Calle de la Barbería 42, Madrid</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-xl text-white mb-1 tracking-wide">Horario</h4>
                  <p className="text-muted-foreground">Lunes - Sábado: 10:00 - 21:00</p>
                  <p className="text-muted-foreground">Domingo: Cerrado</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-xl text-white mb-1 tracking-wide">Correo</h4>
                  <p className="text-muted-foreground">contacto@premiumbarber.com</p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-display tracking-wider w-full sm:w-auto"
                >
                  RESERVA TU CITA
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500/10 font-display tracking-wider w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  WHATSAPP
                </Button>
              </div>
            </div>

            {/* Map */}
            <div className="h-[350px] w-full rounded-lg overflow-hidden border border-white/10 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.646369042231!2d-3.706037684604068!3d40.41670467936526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287c6c3e7431%3A0x62725d2a71560936!2sC.%20de%20la%20Barber%C3%ADa%2C%20Centro%2C%2028005%20Madrid!5e0!3m2!1sen!2ses!4v1645543210000!5m2!1sen!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
