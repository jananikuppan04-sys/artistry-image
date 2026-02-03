import { Navbar } from "@/components/Navbar";
import { AuthPage } from "@/components/AuthPage";

const Auth = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <AuthPage />
      </main>
    </div>
  );
};

export default Auth;
