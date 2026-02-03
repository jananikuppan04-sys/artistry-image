import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onGenerateClick: () => void;
}

export const HeroSection = ({ searchQuery, onSearchChange, onGenerateClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-creative-gradient-subtle rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            AI-Powered Creative Gallery
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Discover & Create
          <br />
          <span className="gradient-text">Stunning Visuals</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Explore a curated collection of creative artwork or generate your own
          unique images with the power of AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              variant="search"
              inputSize="lg"
              placeholder="Search the gallery..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pr-4"
            />
          </div>
          <Button variant="hero" size="lg" onClick={onGenerateClick}>
            <Sparkles className="w-5 h-5" />
            Generate Art
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {["Abstract", "Nature", "Digital Art", "Photography", "3D Render"].map((tag) => (
            <button
              key={tag}
              onClick={() => onSearchChange(tag)}
              className="px-4 py-2 rounded-full glass-card text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
