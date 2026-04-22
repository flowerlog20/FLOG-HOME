import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Home() {
  // Staggering variants for text
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-screen w-full bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=2788&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-foreground/30"></div>

        {/* Top-right: Vertical tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="absolute top-8 right-6 md:right-16 z-10 hidden md:block"
          style={{ writingMode: "vertical-rl" }}
        >
          <span className="font-sans text-[9px] tracking-[0.32em] uppercase text-white/35">꽃을 보듯 나를 보다</span>
        </motion.div>

        {/* Center-right: Issue number (decorative) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-3"
        >
          <div className="w-[1px] h-14 bg-white/15"></div>
          <span className="font-serif text-[10px] text-white/25 italic">No.01</span>
          <div className="w-[1px] h-14 bg-white/15"></div>
        </motion.div>

        {/* Main title — bottom-left, massive, editorial */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 pb-20">
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
          >
            {/* Metadata row */}
            <motion.div
              variants={item}
              className="flex items-center gap-6 mb-5"
            >
              <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/40">Vol. 1 · 2024</span>
              <div className="h-[1px] w-12 bg-white/20"></div>
              <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/40">Record of Youth</span>
            </motion.div>

            {/* Headline — left-aligned, bleeds to edge */}
            <div className="overflow-hidden">
              <motion.h1
                variants={item}
                className="font-serif leading-[0.9] text-[13vw] md:text-[11vw] lg:text-[10vw] text-white whitespace-nowrap"
              >
                가장 찬란한
              </motion.h1>
            </div>

            {/* Second line — indented + italic, with description inline on desktop */}
            <div className="flex items-end gap-8 overflow-hidden">
              <motion.h1
                variants={item}
                className="font-serif italic leading-[0.9] text-[13vw] md:text-[11vw] lg:text-[10vw] text-white/85 whitespace-nowrap pl-[5vw] md:pl-[7vw]"
              >
                우리의 계절
              </motion.h1>
              <motion.p
                variants={item}
                className="hidden lg:block font-sans font-light text-[11px] text-white/40 max-w-[180px] leading-relaxed pb-2 shrink-0"
              >
                20대의 젊음을<br />기록으로 남기는<br />비영리단체
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator — bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 right-6 md:right-12 flex flex-col items-center gap-3 z-10"
        >
          <div className="w-[1px] h-14 bg-white/25 overflow-hidden relative">
            <motion.div
              animate={{ y: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 top-0 h-1/2 bg-white/70"
            />
          </div>
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/35" style={{ writingMode: "vertical-rl" }}>Scroll</span>
        </motion.div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-32 md:py-48 bg-background relative z-10">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-serif text-3xl md:text-5xl leading-relaxed md:leading-relaxed text-foreground">
              "20대를 살아가는 모두가 스스로 <span className="text-primary italic">꽃</span>임을 깨닫기를 바라고, 먼 훗날 우리의 젊은 시절을 추억할 수 있는 <span className="border-b border-foreground pb-1">기록 저장소</span>가 되겠습니다."
            </h2>
          </motion.div>
        </div>
      </section>

      {/* MAGAZINE PREVIEW */}
      <section className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="aspect-[3/4] bg-muted relative overflow-hidden"
            >
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497250681554-1823791a8bc4?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125 opacity-80 mix-blend-multiply hover:scale-105 transition-transform duration-1000"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8"
            >
              <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">Publication</span>
              <h3 className="font-serif text-4xl md:text-5xl">20대 라이프 매거진</h3>
              <p className="font-sans font-light leading-loose text-foreground/80 max-w-md">
                현대를 살아가는 20대의 라이프스타일과 내면을 활자로 기록합니다. 종이의 질감, 잉크의 냄새, 그리고 우리의 이야기.
              </p>
              <div className="pt-8">
                <Link href="/magazine" className="inline-block border-b border-foreground pb-1 font-sans text-sm tracking-widest uppercase hover:text-primary hover:border-primary transition-colors">
                  Explore Archive
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MIND PROFILE PREVIEW */}
      <section className="py-24 md:py-48 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center flex-col-reverse md:flex-row-reverse">
            
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8 md:pr-12 md:col-start-1"
            >
              <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">Photography</span>
              <h3 className="font-serif text-4xl md:text-5xl">마인드 프로필</h3>
              <p className="font-sans font-light leading-loose text-foreground/80 max-w-md">
                단순히 외면을 담는 것이 아닌, 당신의 내면과 지금의 감정을 사진으로 남깁니다. 가장 자연스러운 모습 속에서 피어나는 각자의 꽃을 포착합니다.
              </p>
              <div className="pt-8">
                <Link href="/mind-profile" className="inline-block border-b border-foreground pb-1 font-sans text-sm tracking-widest uppercase hover:text-primary hover:border-primary transition-colors">
                  View Portraits
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="aspect-[4/5] bg-muted relative overflow-hidden md:col-start-2"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop')] bg-cover bg-center opacity-90 hover:scale-105 transition-transform duration-1000"></div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 bg-foreground text-background text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          <h2 className="font-serif text-4xl md:text-6xl italic">우리와 함께 피어나요</h2>
          <p className="font-sans font-light text-lg text-white/70">
            꽃보나보의 에디터, 포토그래퍼, 그리고 모델이 되어주세요.
          </p>
          <Link href="/join" className="inline-block bg-background text-foreground px-12 py-5 font-sans tracking-widest text-sm uppercase hover:bg-primary hover:text-background transition-colors duration-500">
            Join Us
          </Link>
        </motion.div>
      </section>
    </>
  );
}
