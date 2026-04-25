import { motion } from "framer-motion";
import { Link } from "wouter";
import { FaLock } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col justify-between">
          <div>
            <h2 className="font-serif font-light text-6xl md:text-7xl tracking-[0.08em] leading-none mb-4">FLOG</h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-6 h-[1px] bg-white/20"></div>
              <p className="font-sans text-[9px] tracking-[0.4em] text-white/30 uppercase">FLower lOG · 꽃보나보</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-sans text-xs tracking-widest text-muted-foreground mb-6 uppercase">Navigation</h3>
          <ul className="space-y-4 font-sans font-light text-sm tracking-wide">
            <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="/magazine" className="hover:text-primary transition-colors">Magazine</a></li>
            <li><a href="/mind-profile" className="hover:text-primary transition-colors">Mind Profile</a></li>
            <li><a href="/join" className="hover:text-primary transition-colors">Join</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-xs tracking-widest text-muted-foreground mb-6 uppercase">Contact</h3>
          <ul className="space-y-4 font-sans font-light text-sm tracking-wide">
            <li>info@flog.kr</li>
            <li>Seoul, South Korea</li>
            <li>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors text-xs tracking-widest uppercase"
              >
                <FaLock className="text-[9px]" />
                관리자 페이지
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-12 mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs font-light text-muted-foreground tracking-widest">
        <p>&copy; {new Date().getFullYear()} FLOG. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Design & Code</p>
      </div>
    </footer>
  );
}
