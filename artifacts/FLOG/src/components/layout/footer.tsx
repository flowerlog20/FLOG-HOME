import { Link } from "wouter";
import { FaLock } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-white border-t border-black/10 py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col justify-between">
          <div>
            <h2 className="font-serif font-light text-6xl md:text-7xl tracking-[0.06em] leading-none mb-4 text-foreground">FLOG</h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-6 h-[1px] bg-foreground/20"></div>
              <p className="font-sans text-[9px] tracking-[0.4em] text-foreground/40 uppercase font-bold">FLower lOG</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-sans text-[10px] tracking-[0.2em] text-foreground/40 mb-6 uppercase font-bold">Navigation</h3>
          <ul className="space-y-4">
            {["About Us", "Magazine", "Mind Profile", "Event", "Join"].map((label, i) => {
              const hrefs = ["/about", "/magazine", "/mind-profile", "/event", "/join"];
              return (
                <li key={i}>
                  <a
                    href={hrefs[i]}
                    className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-[10px] tracking-[0.2em] text-foreground/40 mb-6 uppercase font-bold">Contact</h3>
          <ul className="space-y-4">
            <li className="font-sans text-[10px] tracking-[0.15em] text-foreground/60">flowerlog20@gmail.com</li>
            <li className="font-sans text-[10px] tracking-[0.15em] text-foreground/60">Seoul, South Korea</li>
            <li>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 font-sans text-[9px] tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground/60 transition-colors"
              >
                <FaLock className="text-[8px]" />
                관리자 페이지
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center">
        <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-foreground/35 font-bold">&copy; {new Date().getFullYear()} FLOG. All rights reserved.</p>
        <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-foreground/35 font-bold mt-4 md:mt-0">Seoul · Est. 2026</p>
      </div>
    </footer>
  );
}
