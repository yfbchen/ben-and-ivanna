import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PasswordPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const { login } = useAuth();
  const barcodeBars = [
    4, 2, 6, 3, 1, 5, 2, 4, 7, 2,
    3, 1, 6, 2, 4, 5, 2, 3, 7, 1,
    4, 2, 6, 3, 2, 5, 1, 4, 6, 2,
    3, 5, 2, 7, 1, 4, 2, 6, 3, 5,
    2, 4, 1, 7, 3, 2, 5, 4, 6, 2,
    3, 1, 5, 2, 7, 3,
  ];

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
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-3xl animate-fade-in-up opacity-0">
        <div className="relative mx-auto flex min-h-[320px] w-full flex-col overflow-hidden rounded-2xl border border-[#d8b7bd] bg-[#722f37] shadow-[0_12px_35px_rgba(0,0,0,0.2)] sm:flex-row">
          <div className="relative flex flex-1 flex-col justify-center px-6 py-10 sm:px-10">
            <div
              className="pointer-events-none absolute inset-3 rounded-[14px] border-2 border-[#f2e2d4]/70"
              aria-hidden="true"
            />
            <div className="mx-auto w-full max-w-md text-center">
              <h1 className="font-display text-4xl text-[#f8ede4] sm:text-5xl">
                Ben &amp; Ivanna
              </h1>
              <p className="mt-2 font-serif text-xl tracking-wide text-[#ead5c8] sm:text-2xl">
                Our Wedding
              </p>

              <form onSubmit={handleSubmit} className="mt-12 space-y-3">
                <div className={`transition-transform ${isShaking ? "animate-shake" : ""}`}>
                  <div className="mx-auto flex w-full flex-col gap-2 sm:flex-row sm:items-center">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      className="h-10 border-[#d8b7bd] bg-[#fffaf6] text-center text-base"
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      className="h-10 self-center rounded-xl border border-gold/40 bg-gold-light px-6 text-sm text-wine hover:bg-gold-light/90"
                    >
                      Enter
                    </Button>
                  </div>
                </div>

                {error && (
                  <p className="text-destructive text-sm animate-fade-in">{error}</p>
                )}
              </form>
            </div>
          </div>

          <div className="relative flex h-28 w-full shrink-0 border-t border-dashed border-[#d8b7bd] bg-[#722f37] sm:h-auto sm:w-28 sm:border-l sm:border-t-0">
            <div className="flex-1 py-3 pl-4 pr-0 sm:py-4">
              <div className="mx-auto flex h-[64%] w-[82%] flex-row items-end justify-center gap-px overflow-hidden sm:hidden" aria-hidden="true">
                {barcodeBars.map((barWidth, index) => (
                  <div
                    key={`mobile-${index}-${barWidth}`}
                    className="bg-[#f8ede4]"
                    style={{
                      width: `${Math.max(1, barWidth * 0.8)}px`,
                      height: "100%",
                    }}
                  />
                ))}
              </div>
              <div className="mx-auto hidden h-full w-[82%] flex-col justify-center gap-px overflow-hidden sm:flex" aria-hidden="true">
                {barcodeBars.map((height, index) => (
                  <div
                    key={`desktop-${index}-${height}`}
                    className="bg-[#f8ede4]"
                    style={{
                      height: `${Math.max(1, height * 0.8)}px`,
                      width: "100%",
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:static sm:left-auto sm:bottom-auto sm:translate-x-0 flex w-16 justify-center sm:w-4 sm:items-center sm:justify-start">
              <span className="text-[10px] tracking-[0.12em] text-[#f8ede4] sm:text-xs sm:-ml-1 sm:[writing-mode:vertical-rl]">
                091226
              </span>
            </div>
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
