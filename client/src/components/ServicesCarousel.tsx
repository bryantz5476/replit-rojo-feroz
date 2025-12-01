import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Sparkles, Check } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Corte Clásico",
    price: 15,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80",
    benefits: ["Técnica tradicional refinada", "Lavado incluido", "Productos premium"],
    duration: "30 min",
    limited: false,
  },
  {
    id: 2,
    name: "Degradado Premium",
    price: 20,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80",
    benefits: ["Fade de precisión milimétrica", "Diseño personalizado", "Acabado mate o brillo"],
    duration: "45 min",
    limited: false,
  },
  {
    id: 3,
    name: "Barba Completa",
    price: 12,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80",
    benefits: ["Perfilado con navaja", "Aceites naturales", "Hidratación profunda"],
    duration: "25 min",
    limited: false,
  },
  {
    id: 4,
    name: "Corte + Barba",
    price: 25,
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80",
    benefits: ["Servicio completo", "Ahorro de 2€", "Experiencia VIP"],
    duration: "50 min",
    limited: true,
  },
  {
    id: 5,
    name: "Afeitado Tradicional",
    price: 18,
    image: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=400&q=80",
    benefits: ["Navaja caliente", "Toalla vapor", "Bálsamo aftershave"],
    duration: "35 min",
    limited: true,
  },
  {
    id: 6,
    name: "Tratamiento Capilar",
    price: 30,
    image: "https://images.unsplash.com/photo-1560869713-bf9cc8fac1b3?w=400&q=80",
    benefits: ["Diagnóstico profesional", "Mascarilla reparadora", "Masaje craneal"],
    duration: "40 min",
    limited: false,
  },
  {
    id: 7,
    name: "Diseño de Cejas",
    price: 8,
    image: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=400&q=80",
    benefits: ["Perfilado preciso", "Define tu mirada", "Sin dolor"],
    duration: "15 min",
    limited: false,
  },
  {
    id: 8,
    name: "Pack Novio VIP",
    price: 60,
    image: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=400&q=80",
    benefits: ["Corte + Barba + Facial", "Cava incluido", "Sesión privada"],
    duration: "90 min",
    limited: true,
  },
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <div
      className="flex-shrink-0 w-72 bg-card border border-card-border rounded-md group hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(225,6,0,0.3)]"
      data-testid={`card-service-${service.id}`}
    >
      <div className="relative h-48 overflow-hidden rounded-t-md">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {service.limited && (
          <Badge
            variant="default"
            className="absolute top-3 right-3 bg-primary text-white border-none"
          >
            Solo fin de semana
          </Badge>
        )}

        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Clock className="w-4 h-4" />
            <span>{service.duration}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3 gap-2">
          <h3 className="font-display text-xl text-white tracking-wide">{service.name}</h3>
          <span className="text-primary font-display text-2xl">{service.price}€</span>
        </div>

        <ul className="space-y-2 mb-4">
          {service.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <a href="" data-testid={`link-reservar-${service.id}`}>
          <Button
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10"
            data-testid={`button-reservar-${service.id}`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Reservar
          </Button>
        </a>
      </div>
    </div>
  );
}

export default function ServicesCarousel() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Solo 2 copias para loop infinito simple
  const duplicatedServices = [...services, ...services];

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-24 bg-background overflow-hidden"
      data-testid="section-services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4 tracking-wide">
            NUESTROS <span className="text-primary">SERVICIOS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Desde el clásico hasta lo más vanguardista. Encuentra el servicio que se adapta a ti.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full">
        <div className="pause-animation overflow-hidden">
          <div className="flex gap-6 animate-infinite-scroll w-max">
            {duplicatedServices.map((service, index) => (
              <ServiceCard key={`service-${index}`} service={service} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-muted-foreground text-sm mb-4">
            Pasa el cursor sobre el carrusel para pausar
          </p>
          <a href="" data-testid="link-ver-todos-servicios">
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              Ver Todos los Servicios
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
