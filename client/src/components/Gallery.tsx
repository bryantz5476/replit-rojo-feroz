import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80",
    title: "Degradado Perfecto",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80",
    title: "Corte Clásico",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1560869713-bf9cc8fac1b3?w=400&q=80",
    title: "Afeitado Tradicional",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=400&q=80",
    title: "Transformación Total",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80",
    title: "Fade Skin",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80",
    title: "Corte Premium",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80",
    title: "Diseño Moderno",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=400&q=80",
    title: "Estilo Clásico",
  },
];

function GalleryCard({ item, onClick }: { item: typeof galleryItems[0]; onClick: () => void }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-lg cursor-pointer group h-full"
      onClick={onClick}
      data-testid={`card-gallery-${item.id}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-display text-lg text-white tracking-wide">{item.title}</h3>
      </div>

      <div className="absolute inset-0 ring-1 ring-white/10 rounded-lg pointer-events-none group-hover:ring-primary/50 transition-colors duration-300" />
    </motion.div>
  );
}

function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: typeof galleryItems[0];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
      data-testid="lightbox-overlay"
    >
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-4 right-4 text-white hover:bg-white/10 z-50"
        onClick={onClose}
        data-testid="button-close-lightbox"
      >
        <X className="w-6 h-6" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        data-testid="button-prev-image"
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        data-testid="button-next-image"
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl max-h-[80vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain rounded-lg"
        />
        <div className="mt-4 text-center">
          <h3 className="font-display text-2xl text-white tracking-wide">
            {item.title}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedItem, setSelectedItem] = useState<(typeof galleryItems)[0] | null>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrev = () => {
    const newIndex =
      selectedIndex === 0 ? galleryItems.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelectedItem(galleryItems[newIndex]);
  };

  const handleNext = () => {
    const newIndex =
      selectedIndex === galleryItems.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setSelectedItem(galleryItems[newIndex]);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-background"
      data-testid="section-gallery"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4 tracking-wide">
            GALERÍA DE <span className="text-primary">TRABAJOS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nuestra precisión en cada corte, nuestro estilo en cada diseño.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px] sm:auto-rows-[320px]">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={
                index % 5 === 0
                  ? "col-span-1 sm:col-span-2 lg:col-span-2 row-span-2"
                  : index % 3 === 0
                    ? "col-span-1 row-span-2"
                    : "col-span-1"
              }
            >
              <GalleryCard
                item={item}
                onClick={() => {
                  setSelectedItem(item);
                  setSelectedIndex(index);
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <Lightbox
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
