import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

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
    duration: "0:45",
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

function VideoCard({ item, onClick }: { item: typeof galleryItems[0]; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (videoRef.current) {
      if (isHovering) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  }, [isHovering]);

  const sizeClasses = {
    small: "col-span-1",
    medium: "col-span-1 md:col-span-2",
    large: "col-span-1 md:col-span-2",
  };

  const heightClasses = {
    small: "h-64",
    medium: "h-96",
    large: "h-96",
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`${sizeClasses[item.size as keyof typeof sizeClasses]} ${heightClasses[item.size as keyof typeof heightClasses]} relative overflow-hidden rounded-md cursor-pointer group`}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      data-testid={`card-gallery-${item.id}`}
    >
      <div className="absolute inset-0 transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_40px_rgba(225,6,0,0.3)]">
        <img
          src={item.thumbnail}
          alt={item.title}
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy"
        />
        
        <video
          ref={videoRef}
          src={item.videoUrl}
          muted
          loop
          playsInline
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        />

        <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </div>
        </div>

        <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full text-xs text-white font-medium flex items-center gap-1">
          <Play className="w-3 h-3" fill="white" />
          TIMELAPSE
        </div>

        {item.duration && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs text-white font-mono">
            {item.duration}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-display text-lg text-white tracking-wide">{item.title}</h3>
          <p className="text-white/70 text-sm mt-1">
            {isPlaying ? "Reproduciendo - Click para ver completo" : "Pasa el cursor para previsualizar"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function GalleryCard({ item, onClick }: { item: typeof galleryItems[0]; onClick: () => void }) {
  const [showAfter, setShowAfter] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  if (item.type === "video") {
    return <VideoCard item={item} onClick={onClick} />;
  }

  const sizeClasses = {
    small: "col-span-1",
    medium: "col-span-1 md:col-span-2",
    large: "col-span-1 md:col-span-2",
  };

  const heightClasses = {
    small: "h-64",
    medium: "h-96",
    large: "h-96",
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`${sizeClasses[item.size as keyof typeof sizeClasses]} ${heightClasses[item.size as keyof typeof heightClasses]} relative overflow-hidden rounded-md cursor-pointer group`}
      onClick={onClick}
      onMouseEnter={() => setShowAfter(true)}
      onMouseLeave={() => setShowAfter(false)}
      data-testid={`card-gallery-${item.id}`}
    >
      <div className="absolute inset-0 transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_40px_rgba(225,6,0,0.3)]">
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-display text-lg text-white tracking-wide">{item.title}</h3>
          <p className="text-white/70 text-sm mt-1">
            Desliza para ver la transformación
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function VideoPlayer({ item, onClose }: { item: typeof galleryItems[0]; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);

    return () => {
      container?.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      const newTime = (value[0] / 100) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-4xl aspect-video rounded-md overflow-hidden bg-black"
      onClick={(e) => e.stopPropagation()}
    >
      <video
        ref={videoRef}
        src={item.videoUrl}
        autoPlay
        loop
        className="w-full h-full object-contain"
        onClick={togglePlay}
      />

      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute top-4 left-4 right-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-primary/90 rounded-full text-xs text-white font-medium flex items-center gap-1">
            <Play className="w-3 h-3" fill="white" />
            TIMELAPSE
          </div>
          <span className="text-white font-display text-lg">{item.title}</span>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="text-white hover:bg-white/20"
          onClick={onClose}
          data-testid="button-close-video"
        >
          <X className="w-5 h-5" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 p-4 space-y-3"
      >
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={handleSeek}
          className="cursor-pointer"
          data-testid="slider-video-progress"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={togglePlay}
              data-testid="button-play-pause"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={restart}
              data-testid="button-restart"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={toggleMute}
              data-testid="button-mute"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <span className="text-white/80 text-sm font-mono ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={toggleFullscreen}
            data-testid="button-fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center">
            <Play className="w-10 h-10 text-white ml-1" fill="white" />
          </div>
        </div>
      )}
    </div>
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
      {item.type === "image" && (
        <>
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
        </>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl max-h-[80vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "image" ? (
          <>
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
            <div className="mt-4 text-center">
              <h3 className="font-display text-2xl text-white tracking-wide">{item.title}</h3>
            </div>
          </>
        ) : (
          <VideoPlayer item={item} onClose={onClose} />
        )}
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-max">
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
