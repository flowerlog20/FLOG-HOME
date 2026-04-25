import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/about", label: "ABOUT" },
    { href: "/magazine", label: "MAGAZINE" },
    { href: "/mind-profile", label: "MIND PROFILE" },
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
        <div className="container mx-auto px-6 py-6 md:px-12 md:py-8 flex justify-between items-center text-[#fbfaf6]">
          <Link
            href="/"
            className="font-sans font-light text-xl tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
            onClick={() => setIsOpen(false)}
          >
            FLOG
          </Link>

          <nav className="hidden md:flex space-x-8 text-sm tracking-widest font-sans font-light">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "hover:opacity-70 transition-opacity",
                  location === link.href && "opacity-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            data-testid="button-hamburger"
            className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block h-[1px] bg-[#fbfaf6] origin-center"
              style={{ width: "24px" }}
            />
            <motion.span
              animate={isOpen ? { opacity: 0, x: 6 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-[1px] bg-[#fbfaf6]"
              style={{ width: "16px" }}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block h-[1px] bg-[#fbfaf6] origin-center"
              style={{ width: "24px" }}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-foreground flex flex-col"
          >
            <div className="flex flex-col justify-end h-full px-8 pb-16 pt-28">
              <nav className="flex flex-col gap-2">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block font-serif text-5xl text-background/80 hover:text-background transition-colors leading-tight py-2",
                        location === link.href && "text-background/40"
                      )}
                      data-testid={`link-mobile-${link.href.replace("/", "")}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-16 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-background/30">FLower lOG</p>
                  <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-background/20 mt-1">Seoul · Est. 2024</p>
                </div>
                <p className="font-sans text-[10px] tracking-[0.3em] text-background/20 uppercase">FLOWER LOG</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
