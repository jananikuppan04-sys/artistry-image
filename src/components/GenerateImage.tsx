import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Wand2, Download, RefreshCw, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GenerateImageProps {
  onImageGenerated?: (imageUrl: string) => void;
}

export const GenerateImage = ({ onImageGenerated }: GenerateImageProps) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate generation delay - in production, this would call the AI API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // For demo, use placeholder images
    const demoImages = [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format",
      "https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=800&auto=format",
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&auto=format",
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format",
    ];
    
    const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
    setGeneratedImage(randomImage);
    setIsGenerating(false);
    
    onImageGenerated?.(randomImage);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `generated-${Date.now()}.jpg`;
    link.click();
  };

  const handleRegenerate = () => {
    setGeneratedImage(null);
    handleGenerate();
  };

  return (
    <section className="min-h-screen px-4 py-24 flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground mb-6">
            <Wand2 className="w-4 h-4 text-primary" />
            AI Image Generation
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Create <span className="gradient-text">Unique Art</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Describe your vision and let AI bring it to life. Generate stunning,
            one-of-a-kind images in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-col gap-4 mb-6">
            <label htmlFor="prompt" className="text-sm font-medium">
              Describe your image
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A mystical forest at twilight with bioluminescent flowers and floating orbs of light..."
              className="w-full h-32 px-4 py-3 rounded-xl glass-card border-0 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Image generation prompt"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Try:</span>
            {[
              "Cyberpunk city",
              "Abstract art",
              "Fantasy landscape",
              "Surreal portrait",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setPrompt(suggestion)}
                className="px-3 py-1 rounded-full glass-card text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <Button
            variant="hero"
            size="lg"
            className="w-full"
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Image
              </>
            )}
          </Button>
        </motion.div>

        {/* Generated Image Display */}
        {generatedImage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 glass-card rounded-2xl overflow-hidden"
          >
            <img
              src={generatedImage}
              alt="Generated artwork"
              className="w-full h-auto"
            />
            <div className="p-6 flex flex-wrap gap-3 justify-center">
              <Button variant="creative" onClick={handleDownload}>
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button variant="outline" onClick={handleRegenerate}>
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </Button>
              <Button variant="secondary">
                <ImageIcon className="w-4 h-4" />
                Add to Gallery
              </Button>
            </div>
          </motion.div>
        )}

        {/* Placeholder when no image */}
        {!generatedImage && !isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 glass-card rounded-2xl p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Your generated image will appear here
            </p>
          </motion.div>
        )}

        {/* Loading State */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 glass-card rounded-2xl p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-creative-gradient flex items-center justify-center shadow-glow animate-pulse">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
            <p className="text-foreground font-medium">Creating your masterpiece...</p>
            <p className="text-muted-foreground text-sm mt-1">This may take a few moments</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
