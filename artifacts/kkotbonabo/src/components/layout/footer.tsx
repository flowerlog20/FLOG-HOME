import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <h2 className="font-sans font-light text-3xl tracking-[0.15em] mb-2">FLOG</h2>
          <p className="font-sans text-[10px] tracking-[0.3em] text-muted-foreground/60 uppercase mb-6">FLower lOG · 꽃보나보</p>
          <p className="font-sans font-light text-muted-foreground max-w-sm leading-relaxed">
            꽃을 보듯 나를 보다. 20대를 살아가는 모두가 스스로 꽃임을 깨닫기를 바라고, 먼 훗날 우리의 젊은 시절을 추억할 수 있는 20대 기록 저장소가 되겠습니다.
          </p>
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
            <li>Instagram</li>
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
