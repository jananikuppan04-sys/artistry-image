import { Navbar } from "@/components/Navbar";
import { GenerateImage } from "@/components/GenerateImage";

const Generate = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <GenerateImage />
      </main>
    </div>
  );
};

export default Generate;
