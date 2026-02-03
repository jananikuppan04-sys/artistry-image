import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { GalleryGrid } from "@/components/GalleryGrid";
import { galleryImages } from "@/data/galleryData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleGenerateClick = () => {
    navigate("/generate");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onGenerateClick={handleGenerateClick}
        />
        <GalleryGrid images={galleryImages} searchQuery={searchQuery} />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Artistry. Crafted with creativity and AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
