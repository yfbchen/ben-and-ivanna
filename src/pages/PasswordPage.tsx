import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";

const PasswordPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError("Incorrect password. Please try again.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center">
        <div className="animate-fade-in-up opacity-0">
          <Heart className="w-12 h-12 mx-auto mb-8 text-sage animate-gentle-float" />
          
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-wide">
            Welcome
          </h1>
          
          <p className="text-muted-foreground font-body text-lg mb-12">
            Please enter the password to view our wedding details
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={`transition-transform ${isShaking ? "animate-shake" : ""}`}>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="text-center text-lg"
              />
            </div>

            {error && (
              <p className="text-destructive text-sm animate-fade-in">{error}</p>
            )}

            <Button
              type="submit"
              variant="elegant"
              size="lg"
              className="w-full"
            >
              Enter
            </Button>
          </form>

          <div className="mt-16 flex items-center justify-center gap-4">
            <div className="h-px bg-border flex-1" />
            <span className="text-muted-foreground text-sm tracking-widest uppercase">
              I & B
            </span>
            <div className="h-px bg-border flex-1" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PasswordPage;
