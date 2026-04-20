import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { images } from "@/config/images";
import { weddingNavLinkButtonTypographyClassName } from "@/config/weddingSectionLayout";

const PasswordPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center bg-[var(--wedding-palette-wine-red)] p-4">
      <div className="w-full max-w-4xl animate-fade-in-up opacity-0">
        <div className="relative mx-auto w-full">
          <img
            src={images.passwordTicket}
            alt="Wedding ticket password prompt"
            className="relative z-10 block w-full h-auto"
          />

          <div className="absolute left-[42%] top-[77%] z-20 w-[62%] -translate-x-1/2 -translate-y-1/2 sm:left-[42%] sm:top-[74%] sm:w-[54%] md:left-[42%] md:top-[73%]">
            <form
              onSubmit={handleSubmit}
              className={`w-full transition-transform ${
                isShaking ? "animate-shake" : ""
              }`}
            >
              <div className="mx-auto flex w-full items-center gap-2">
                <div className="relative w-[74%]">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className="h-12 w-full border-[#d8b7bd] bg-[#fffaf6]/95 px-4 pr-11 text-center text-base !outline-none !ring-0 !shadow-none !focus:outline-none !focus:ring-0 !focus:shadow-none !focus:border-[#d8b7bd] !focus-visible:outline-none !focus-visible:ring-0 !focus-visible:ring-offset-0 !focus-visible:shadow-none !focus-visible:border-[#d8b7bd]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-wine/75 transition hover:text-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wedding-palette-orange)] focus-visible:ring-offset-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  className={`h-12 w-[26%] shrink-0 rounded-full border-2 border-[var(--wedding-palette-orange)] !bg-[var(--wedding-palette-orange)] px-4 normal-case !text-[var(--wedding-palette-white-background)] !outline-none !ring-0 hover:!bg-[var(--wedding-palette-orange)] hover:!text-[var(--wedding-palette-white-background)] focus-visible:!ring-0 focus-visible:!ring-offset-0 ${weddingNavLinkButtonTypographyClassName}`}
                >
                  Enter
                </Button>
              </div>

              {error && (
                <p className="mt-2 text-center text-destructive text-sm animate-fade-in">{error}</p>
              )}
            </form>
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
