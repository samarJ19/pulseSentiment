import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchMe } from "@/util/auth";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    fetchMe().then(({ role }) => {
      if (!isMounted || !role) return;
      if (role === "ADMIN") {
        navigate("/admindashboard", { replace: true });
      } else {
        navigate("/feedbackform", { replace: true });
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  // Hide scrollbar on mount, restore on unmount
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="relative h-100vh overflow-hidden  w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/pulsebackground.png')" }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12 md:py-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white md:text-2xl">
            PulseSentiment
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 hover:text-white"
            asChild
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button className="bg-white text-black hover:bg-white/90" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative top-16 z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 text-center">
        <p className="mb-8 max-w-2xl text-lg text-white/90 md:text-xl">
          Anonymous feedback platform that helps teams improve communication,
          workload balance, and overall wellbeing.
        </p>
        <div className="flex flex-col  gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-white/20 font-bold border-2 border-slate-400 text-black hover:bg-white/90"
            asChild
          >
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/20 font-bold border-2 border-slate-400 text-black hover:bg-white/90"
            asChild
          >
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
