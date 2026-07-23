import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/about", label: "ABOUT" },
    { href: "/magazine", label: "MAGAZINE" },
    { href: "/mind-profile", label: "MIND PROFILE" },
    { href: "/event", label: "EVENT" },
    { href: "/join", label: "JOIN" },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
      >
        <div className="mx-auto px-6 py-5 md:px-10 flex items-center justify-between text-[#fbfaf6]">

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1 text-[#fbfaf6]"
            onClick={() => setIsOpen(true)}
            aria-label="메뉴 열기"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          {/* Logo + sub-brand */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-serif font-light text-3xl md:text-4xl tracking-[0.06em] leading-none hover:opacity-70 transition-opacity"
              onClick={() => setIsOpen(false)}
            >
              FLOG
            </Link>
            <span className="hidden lg:inline-block font-sans text-[9px] tracking-[0.22em] font-bold text-[#fbfaf6]/60 uppercase border-l border-[#fbfaf6]/30 pl-4">
              FLOWER LOG MAGAZINE
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-[10px] lg:text-[11px] tracking-[0.2em] uppercase transition-opacity",
                  location === link.href
                    ? "font-bold opacity-100"
                    : "font-semibold opacity-60 hover:opacity-90"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right info (desktop) */}
          <div className="hidden md:block font-sans text-[9px] font-bold tracking-[0.2em] uppercase opacity-50">
            Seoul · Est. 2026
          </div>

          {/* Mobile placeholder to keep logo centered */}
          <div className="md:hidden w-[22px]" />
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-foreground flex flex-col pt-20 px-8"
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 p-2 text-background/60 hover:text-background transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="메뉴 닫기"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* Nav links */}
            <nav className="flex flex-col gap-0 mt-10">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block font-serif text-4xl text-background/80 hover:text-background transition-colors leading-tight py-3 border-b border-white/10",
                      location === link.href && "text-background/35"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer strip */}
            <div className="mt-auto pb-12 flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-background/50 font-bold">FLOWER LOG MAGAZINE</span>
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-background/30 font-bold">Seoul · Est. 2026</span>
              </div>
              <span className="font-sans text-[10px] tracking-[0.3em] text-background/30 uppercase font-bold">FLOG</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
