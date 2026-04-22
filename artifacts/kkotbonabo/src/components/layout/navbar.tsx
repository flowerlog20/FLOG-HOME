import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();

  const links = [
    { href: "/about", label: "ABOUT" },
    { href: "/magazine", label: "MAGAZINE" },
    { href: "/mind-profile", label: "MIND PROFILE" },
    { href: "/join", label: "JOIN" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
    >
      <div className="container mx-auto px-6 py-6 md:px-12 md:py-8 flex justify-between items-center text-[#fbfaf6]">
        <Link href="/" className="font-serif text-xl tracking-widest uppercase hover:opacity-70 transition-opacity">
          꽃보나보
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
      </div>
    </motion.header>
  );
}
