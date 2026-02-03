import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Heart, Expand, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  author: string;
  category: string;
  likes: number;
  downloads: number;
}

interface GalleryGridProps {
  images: GalleryImage[];
  searchQuery: string;
}

export const GalleryGrid = ({ images, searchQuery }: GalleryGridProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());

  const filteredImages = images.filter(
    (img) =>
      img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDownload = (image: GalleryImage, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = image.src;
    link.download = `${image.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    link.click();
  };

  return (
    <section className="px-4 py-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold">
          {searchQuery ? `Results for "${searchQuery}"` : "Featured Gallery"}
        </h2>
        <span className="text-muted-foreground">
          {filteredImages.length} {filteredImages.length === 1 ? "image" : "images"}
        </span>
      </motion.div>

      {filteredImages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-xl text-muted-foreground">No images found for "{searchQuery}"</p>
          <p className="text-muted-foreground mt-2">Try a different search term or generate your own!</p>
        </motion.div>
      ) : (
        <div className="masonry-grid">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="masonry-item"
            >
              <div
                className="group relative rounded-xl overflow-hidden cursor-pointer hover-lift glass-card"
                onClick={() => setSelectedImage(image)}
                role="button"
                tabIndex={0}
                aria-label={`View ${image.title}`}
                onKeyDown={(e) => e.key === "Enter" && setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-foreground mb-1">{image.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <User className="w-3 h-3" />
                    {image.author}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={(e) => handleLike(image.id, e)}
                      className={likedImages.has(image.id) ? "text-primary" : ""}
                      aria-label={likedImages.has(image.id) ? "Unlike" : "Like"}
                    >
                      <Heart className={`w-4 h-4 ${likedImages.has(image.id) ? "fill-current" : ""}`} />
                      {image.likes + (likedImages.has(image.id) ? 1 : 0)}
                    </Button>
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={(e) => handleDownload(image, e)}
                      aria-label="Download image"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={() => setSelectedImage(image)}
                      aria-label="Expand image"
                    >
                      <Expand className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass-card text-xs font-medium">
                  {image.category}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedImage.title} by ${selectedImage.author}`}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-5xl w-full max-h-[90vh] glass-card rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="glass"
                size="icon"
                className="absolute top-4 right-4 z-10"
                onClick={() => setSelectedImage(null)}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </Button>
              
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-contain"
              />
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-4 h-4" />
                      {selectedImage.author}
                      <span className="mx-2">•</span>
                      {selectedImage.category}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={likedImages.has(selectedImage.id) ? "creative" : "outline"}
                      onClick={(e) => handleLike(selectedImage.id, e)}
                    >
                      <Heart className={`w-4 h-4 ${likedImages.has(selectedImage.id) ? "fill-current" : ""}`} />
                      {selectedImage.likes + (likedImages.has(selectedImage.id) ? 1 : 0)}
                    </Button>
                    <Button
                      variant="creative"
                      onClick={(e) => handleDownload(selectedImage, e)}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
