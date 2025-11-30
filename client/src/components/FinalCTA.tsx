import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Star, Quote, Clock, Phone, User, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

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

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().min(9, "Introduce un teléfono válido").regex(/^[0-9+\s]+$/, "Formato de teléfono inválido"),
});

type FormData = z.infer<typeof formSchema>;

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      
      if (progress >= 1) {
        clearInterval(interval);
        setCount(target);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isInView, target, duration]);

  return <span ref={ref} className="animate-counter">{count}</span>;
}

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
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-primary" : "bg-white/30 hover:bg-white/50"
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/leads", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Solicitud enviada",
        description: "Nos pondremos en contacto contigo muy pronto.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo enviar la solicitud. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    submitMutation.mutate(data);
  };

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
          className="bg-card/50 backdrop-blur-sm border border-card-border rounded-md p-8 md:p-12 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-white font-display text-lg tracking-wide">
              Quedan <span className="text-primary font-bold"><AnimatedCounter target={7} /></span> plazas hoy
            </span>
          </div>

          <h3 className="font-display text-3xl sm:text-4xl text-white text-center mb-8 tracking-wide">
            RESERVA TU <span className="text-primary">CITA</span>
          </h3>

          {!isSubmitted ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="form-lead-capture">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              placeholder="Tu nombre"
                              className="pl-10 bg-background/50 border-white/10 text-white placeholder:text-white/40"
                              data-testid="input-name"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              placeholder="Tu teléfono"
                              className="pl-10 bg-background/50 border-white/10 text-white placeholder:text-white/40"
                              data-testid="input-phone"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-display text-lg tracking-wider py-6 bg-primary hover:bg-primary/90"
                  disabled={submitMutation.isPending}
                  data-testid="button-submit-lead"
                >
                  {submitMutation.isPending ? (
                    "Enviando..."
                  ) : (
                    <>
                      Quiero mi cita
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h4 className="font-display text-2xl text-white mb-2">¡Recibido!</h4>
              <p className="text-white/60">Te contactaremos muy pronto para confirmar tu cita.</p>
            </motion.div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="" data-testid="link-agendar-final">
              <Button
                size="lg"
                className="font-display tracking-wider animate-breath bg-primary hover:bg-primary/90 text-white"
                data-testid="button-agendar-final"
              >
                AGENDA TU CORTE AHORA
              </Button>
            </a>
            <a href="#servicios" data-testid="link-ver-precios">
              <Button
                variant="outline"
                size="lg"
                className="font-display tracking-wider border-white/20 text-white hover:bg-white/10"
                data-testid="button-ver-precios"
              >
                VER PRECIOS
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 text-sm">
            Horario: Lun - Sáb 10:00 - 21:00 | Dom cerrado
          </p>
          <p className="text-white/40 text-sm mt-1">
            Calle de la Barbería 42, Madrid
          </p>
        </motion.div>
      </div>
    </section>
  );
}
