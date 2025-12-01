import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Palette, Target, Crown, Star } from "lucide-react";

const pillars = [
  {
    id: 1,
    icon: Palette,
    title: "Estilo Personal",
    description: "Tu corte, tu identidad. Asesoramiento experto para encontrar el look que te define y potencia tu presencia.",
    reviews: 847,
    rating: 4.9,
    backContent: "Cada cliente es único. Analizamos tu rostro, estilo de vida y personalidad para crear un corte que sea auténticamente tuyo.",
  },
  {
    id: 2,
    icon: Target,
    title: "Técnica Precisa",
    description: "Maestría en cada pasada. Años de experiencia y formación continua para resultados impecables.",
    reviews: 1243,
    rating: 5.0,
    backContent: "Dominamos las técnicas clásicas y las más vanguardistas. Navaja, tijera, máquina - herramientas en manos expertas.",
  },
  {
    id: 3,
    icon: Crown,
    title: "Ambiente DeLuxe",
    description: "La actitud de la calle con el refinamiento del lujo. Un espacio donde te sientes en casa pero sales como un rey.",
    reviews: 962,
    rating: 4.8,
    backContent: "Música, ambiente, atención premium. No es solo un corte, es una experiencia completa que mereces vivir.",
  },
];

function FlipCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="perspective-1000 h-[320px] w-full"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      data-testid={`card-pillar-${pillar.id}`}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full h-full preserve-3d cursor-pointer"
      >
        <div className="absolute inset-0 backface-hidden bg-card border border-card-border rounded-md p-8 flex flex-col">
          <div className="flex items-start justify-between mb-6">
            <div className="p-4 bg-primary/10 rounded-md">
              <pillar.icon className="w-8 h-8 text-primary" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-white font-medium">{pillar.rating}</span>
              <span className="text-muted-foreground">({pillar.reviews})</span>
            </div>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl text-white mb-3 tracking-wide">
            {pillar.title}
          </h3>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed flex-grow">
            {pillar.description}
          </p>

          <div className="mt-4 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Hover para más</span>
          </div>
        </div>

        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-primary rounded-md p-8 flex flex-col justify-center">
          <p className="text-white text-lg leading-relaxed font-light">
            {pillar.backContent}
          </p>
          <div className="mt-6 flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-white/20 border-2 border-primary flex items-center justify-center text-xs text-white font-medium"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-white/80 text-sm">+{pillar.reviews} clientes satisfechos</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ValueProposition() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-background"
      data-testid="section-value-proposition"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4 tracking-wide">
            POR QUÉ <span className="text-primary">ELEGIRNOS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No somos solo una barbería. Somos tu destino para transformar tu imagen y actitud.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <FlipCard key={pillar.id} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
