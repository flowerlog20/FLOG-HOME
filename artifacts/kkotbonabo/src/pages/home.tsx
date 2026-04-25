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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=2788&auto=format&fit=crop')] bg-cover bg-[center_20%] opacity-100"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/15 via-foreground/0 to-foreground/25"></div>

        {/* Top strip — micro metadata bar */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="absolute top-0 left-0 right-0 z-10 mt-[72px] md:mt-[80px] px-6 md:px-12"
        >
          <div className="flex justify-between items-center py-3 border-t border-white/10">
            <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-white/35">FLower lOG</span>
            <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-white/35">Seoul · Est. 2024</span>
            <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-white/35 hidden md:block">20대 기록 저장소</span>
          </div>
        </motion.div>

        {/* Left edge label — vertical */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.4 }}
          className="absolute left-5 md:left-8 top-1/2 -translate-y-1/2 z-10 hidden md:block"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-white/25">Bloom Archive No.01</span>
        </motion.div>

        {/* MAIN TITLE BLOCK — split axis composition */}
        <div className="absolute inset-0 flex flex-col justify-center z-10">
          <motion.div initial="hidden" animate="show" variants={container}>

            {/* FLOWER — right-anchored, above the line */}
            <div className="overflow-hidden pr-6 md:pr-12">
              <motion.h1
                variants={item}
                className="font-serif font-light leading-[0.85] tracking-[-0.01em] text-[15vw] md:text-[13vw] lg:text-[12vw] text-white text-right"
              >
                FLOWER
              </motion.h1>
            </div>

            {/* Center axis — full-width rule with small marker */}
            <motion.div
              variants={item}
              className="relative flex items-center my-3 md:my-4"
            >
              <div className="flex-1 h-[1px] bg-white/20"></div>
              <span className="font-sans text-[8px] tracking-[0.4em] text-white/25 px-4 uppercase shrink-0">FLower lOG</span>
              <div className="flex-1 h-[1px] bg-white/20"></div>
            </motion.div>

            {/* LOG — left-offset, below the line */}
            <div className="overflow-hidden pl-6 md:pl-12">
              <motion.h1
                variants={item}
                className="font-serif font-light leading-[0.85] tracking-[0.08em] text-[15vw] md:text-[13vw] lg:text-[12vw] text-white/65 pl-[20vw] md:pl-[24vw]"
              >
                LOG
              </motion.h1>
            </div>

          </motion.div>
        </div>

        {/* BLOOM ARCHIVE — bottom left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.2 }}
          className="absolute bottom-10 left-6 md:left-12 z-10"
        >
          <div className="flex items-center gap-4">
            <span className="font-sans text-[9px] tracking-[0.5em] uppercase text-white/35">Bloom Archive</span>
            <div className="h-[1px] w-6 bg-white/20"></div>
            <span className="font-sans text-[9px] tracking-[0.5em] uppercase text-white/25">No.01</span>
          </div>
        </motion.div>

        {/* Scroll indicator — bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 right-6 md:right-12 flex flex-col items-center gap-3 z-10"
        >
          <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
            <motion.div
              animate={{ y: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 top-0 h-1/2 bg-white/60"
            />
          </div>
        </motion.div>
      </section>
      {/* PHILOSOPHY SECTION */}
      <section className="py-24 md:py-36 bg-background relative z-10 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex gap-10 md:gap-20 items-start">

            {/* Left: vertical label */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden md:flex flex-col items-center gap-4 pt-1 shrink-0"
            >
              <div className="w-[1px] h-10 bg-foreground/20"></div>
              <span
                className="font-sans text-[8px] tracking-[0.45em] uppercase text-foreground/30"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Philosophy
              </span>
            </motion.div>

            {/* Right: quote in Hahmlet, cascading layout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-lg"
            >
              <p
                className="text-xl md:text-2xl leading-[1.9] text-foreground/75 font-light"
                style={{ fontFamily: "'Hahmlet', serif" }}
              >
                우리는 20대를 기록합니다. 가장 젊은 날의 고민, 관계, 라이프스타일 그리고 내면의 목소리까지.
              </p>
              <p
                className="text-xl md:text-2xl leading-[1.9] text-foreground/50 font-light mt-1 ml-6 md:ml-10"
                style={{ fontFamily: "'Hahmlet', serif" }}
              >
                불안과 설렘, 성장의 모든 결을 담아, 먼 훗날 당신이 꺼내볼 수 있는 기억의 서랍이 되겠습니다.
              </p>
              <div className="mt-8 ml-1 flex items-center gap-3">
                <div className="w-4 h-[1px] bg-foreground/20"></div>
                <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/30">FLOG</span>
              </div>
            </motion.div>

          </div>
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
              <p className="font-sans font-light leading-loose text-foreground/80 max-w-md">당신의 오늘은 어떤 페이지입니까? FLOG는 20대의 일상을 활자로 새겨, 오래 남을 이야기로 만듭니다.</p>
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
            FLOG의 에디터, 포토그래퍼, 그리고 모델이 되어주세요.
          </p>
          <Link href="/join" className="inline-block bg-background text-foreground px-12 py-5 font-sans tracking-widest text-sm uppercase hover:bg-primary hover:text-background transition-colors duration-500">
            Join Us
          </Link>
        </motion.div>
      </section>
    </>
  );
}
