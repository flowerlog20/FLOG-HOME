import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { getHomeDataFromDB, DEFAULT_HOME, type HomeData } from "@/lib/magazine-store";

export default function Home() {
  const [home, setHome] = useState<HomeData>(DEFAULT_HOME);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    getHomeDataFromDB().then(setHome);
  }, []);

  const images = home.heroImages.length > 0 ? home.heroImages : [home.hero.imageUrl];

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isPlaying && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setSlideIndex(i => (i + 1) % images.length);
      }, 5000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, images.length]);

  const goPrev = () => setSlideIndex(i => (i - 1 + images.length) % images.length);
  const goNext = () => setSlideIndex(i => (i + 1) % images.length);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
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
        <AnimatePresence>
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-[center_20%]"
            style={{ backgroundImage: `url('${images[slideIndex]}')` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/15 via-foreground/0 to-foreground/25"></div>

        {/* Slideshow controls — only shown if more than 1 image */}
        {images.length > 1 && (
          <>
            {/* Prev button */}
            <button
              onClick={goPrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
              aria-label="이전 이미지"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* Next button */}
            <button
              onClick={goNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
              aria-label="다음 이미지"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 3L13 9L7 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* Pause/Play + dots — bottom center */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(p => !p)}
                className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
                aria-label={isPlaying ? "슬라이드 정지" : "슬라이드 재생"}
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <rect x="2" y="1" width="3.5" height="12" rx="1"/>
                    <rect x="8.5" y="1" width="3.5" height="12" rx="1"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M3 1.5L12 7L3 12.5V1.5Z"/>
                  </svg>
                )}
              </button>
              <div className="flex items-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    className={`rounded-full transition-all duration-300 ${i === slideIndex ? "w-4 h-1 bg-white/70" : "w-1 h-1 bg-white/30 hover:bg-white/50"}`}
                    aria-label={`${i + 1}번 이미지`}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Top strip */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="absolute top-0 left-0 right-0 z-10 mt-[72px] md:mt-[80px] px-6 md:px-12"
        >
          <div className="flex justify-between items-center py-3 border-t border-white/10">
            <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-white/35">FLower lOG</span>
            <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-white/35">{home.hero.metaRight}</span>
            <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-white/35 hidden md:block">{home.hero.metaLeft}</span>
          </div>
        </motion.div>

        {/* Left edge label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.4 }}
          className="absolute left-5 md:left-8 top-1/2 -translate-y-1/2 z-10 hidden md:block"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-white/25">Bloom Archive No.01</span>
        </motion.div>

        {/* MAIN TITLE BLOCK */}
        <div className="absolute inset-0 flex flex-col justify-center z-10">
          <motion.div initial="hidden" animate="show" variants={container}>
            <motion.div
              variants={item}
              className="relative flex items-center my-3 md:my-4"
            >
              <div className="flex-1 h-[1px] bg-white/20"></div>
              <span className="font-sans text-[8px] tracking-[0.4em] text-white/25 px-4 uppercase shrink-0">FLower lOG</span>
              <div className="flex-1 h-[1px] bg-white/20"></div>
            </motion.div>
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

        {/* Scroll indicator */}
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
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${home.magazinePreview.imageUrl}')` }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8"
            >
              <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">MAGAZINE</span>
              <h3 className="font-serif text-4xl md:text-5xl">{home.magazinePreview.title}</h3>
              <p className="font-sans font-light leading-loose text-foreground/80 max-w-md">{home.magazinePreview.desc}</p>
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
              <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">MIND PROFILE</span>
              <h3 className="font-serif text-4xl md:text-5xl">{home.mindProfilePreview.title}</h3>
              <p className="font-sans font-light leading-loose text-foreground/80 max-w-md">{home.mindProfilePreview.desc}</p>
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
              <div
                className="absolute inset-0 bg-cover bg-center opacity-90 hover:scale-105 transition-transform duration-1000"
                style={{ backgroundImage: `url('${home.mindProfilePreview.imageUrl}')` }}
              />
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
          <h2 className="font-serif text-4xl md:text-6xl italic">{home.cta.title}</h2>
          <p className="font-sans font-light text-lg text-white/70">{home.cta.desc}</p>
          <Link href="/join" className="inline-block bg-background text-foreground px-12 py-5 font-sans tracking-widest text-sm uppercase hover:bg-primary hover:text-background transition-colors duration-500">
            Join Us
          </Link>
        </motion.div>
      </section>
    </>
  );
}
