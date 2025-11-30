import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryItems = [
  {
    id: 1,
    type: "image",
    before: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80",
    after: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80",
    title: "Degradado Perfecto",
    size: "large",
  },
  {
    id: 2,
    type: "image",
    before: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80",
    after: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80",
    title: "Corte Clásico",
    size: "small",
  },
  {
    id: 3,
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80",
    videoUrl: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164",
    title: "Timelapse Barba",
    size: "medium",
  },
  {
    id: 4,
    type: "image",
    before: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=400&q=80",
    after: "https://images.unsplash.com/photo-1560869713-bf9cc8fac1b3?w=400&q=80",
    title: "Afeitado Tradicional",
    size: "small",
  },
  {
    id: 5,
    type: "image",
    before: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=400&q=80",
    after: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=400&q=80",
    title: "Transformación Total",
    size: "medium",
  },
  {
    id: 6,
    type: "image",
    before: "https://images.unsplash.com/photo-1578663248567-c2d0c4aafb7e?w=400&q=80",
    after: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80",
    title: "Fade Skin",
    size: "small",
  },
];

function GalleryCard({ item, onClick }: { item: typeof galleryItems[0]; onClick: () => void }) {
  const [showAfter, setShowAfter] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 md:col-span-1 row-span-1 md:row-span-2",
    large: "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
  };

  const heightClasses = {
    small: "h-64",
    medium: "h-64 md:h-full",
    large: "h-64 md:h-full",
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`${sizeClasses[item.size as keyof typeof sizeClasses]} ${heightClasses[item.size as keyof typeof heightClasses]} relative overflow-hidden rounded-md cursor-pointer group`}
      onClick={onClick}
      onMouseEnter={() => item.type === "image" && setShowAfter(true)}
      onMouseLeave={() => item.type === "image" && setShowAfter(false)}
      data-testid={`card-gallery-${item.id}`}
    >
      <div className="absolute inset-0 transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_40px_rgba(225,6,0,0.3)]">
        {item.type === "image" ? (
          <>
            <motion.img
              src={item.before}
              alt={`${item.title} - Antes`}
              className="w-full h-full object-cover absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: showAfter ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              loading="lazy"
            />
            <motion.img
              src={item.after}
              alt={`${item.title} - Después`}
              className="w-full h-full object-cover absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: showAfter ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              loading="lazy"
            />
            <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs text-white font-medium">
              {showAfter ? "Después" : "Antes"}
            </div>
          </>
        ) : (
          <>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 group-hover:bg-black/20">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </div>
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-display text-lg text-white tracking-wide">{item.title}</h3>
          <p className="text-white/70 text-sm mt-1">
            {item.type === "image" ? "Desliza para ver la transformación" : "Click para reproducir"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Lightbox({ 
  item, 
  onClose, 
  onPrev, 
  onNext 
}: { 
  item: typeof galleryItems[0]; 
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [showAfter, setShowAfter] = useState(false);

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
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        data-testid="button-prev-image"
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
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
        {item.type === "image" ? (
          <div 
            className="relative aspect-video rounded-md overflow-hidden cursor-pointer"
            onMouseEnter={() => setShowAfter(true)}
            onMouseLeave={() => setShowAfter(false)}
          >
            <motion.img
              src={item.before}
              alt={`${item.title} - Antes`}
              className="w-full h-full object-cover absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: showAfter ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.img
              src={item.after}
              alt={`${item.title} - Después`}
              className="w-full h-full object-cover absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: showAfter ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute top-4 left-4 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-sm text-white font-medium">
              {showAfter ? "Después" : "Antes"} - Mueve el cursor para cambiar
            </div>
          </div>
        ) : (
          <video
            src={item.videoUrl}
            controls
            autoPlay
            className="w-full aspect-video rounded-md"
          />
        )}
        <div className="mt-4 text-center">
          <h3 className="font-display text-2xl text-white tracking-wide">{item.title}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrev = () => {
    const newIndex = selectedIndex === 0 ? galleryItems.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelectedItem(galleryItems[newIndex]);
  };

  const handleNext = () => {
    const newIndex = selectedIndex === galleryItems.length - 1 ? 0 : selectedIndex + 1;
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
            ANTES Y <span className="text-primary">DESPUÉS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            La prueba está en los resultados. Explora nuestras transformaciones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[180px]">
          {galleryItems.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={() => {
                setSelectedItem(item);
                setSelectedIndex(index);
              }}
            />
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
