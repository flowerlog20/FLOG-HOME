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
      <section className="relative w-full h-[100dvh] flex flex-col justify-between overflow-hidden bg-black">
        {/* Background slideshow */}
        <AnimatePresence>
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${images[slideIndex]}')` }}
          />
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.42)" }} />
        <div className="absolute top-0 inset-x-0 h-64" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)" }} />
        <div className="absolute bottom-0 inset-x-0 h-64" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)" }} />

        {/* Slideshow controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
              aria-label="이전 이미지"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
              aria-label="다음 이미지"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 3L13 9L7 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}

        {/* Top info grid */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full px-6 md:px-10 pt-28 flex justify-between font-sans text-[9px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white"
        >
          <div className="flex flex-col gap-1.5">
            <p>FLOWER LOG MAGAZINE</p>
            <p>{home.hero.metaLeft}</p>
          </div>
          <div className="flex flex-col gap-1.5 text-right">
            <p>{home.hero.metaRight}</p>
            <p>BLOOM ARCHIVE</p>
          </div>
        </motion.div>

        {/* Bottom: massive FLOG logotype + strip */}
        <div className="relative z-10 w-full flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full text-center px-2 leading-[0.85] mb-3 md:mb-5"
          >
            <h1
              className="font-serif font-light text-white text-center mx-auto"
              style={{
                fontSize: "clamp(6rem, 28vw, 36rem)",
                letterSpacing: "0.04em",
                textShadow: "0 2px 24px rgba(0,0,0,0.5)",
              }}
            >
              FLOG
            </h1>
          </motion.div>

          {/* Bottom strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full flex justify-between items-center px-6 md:px-10 pb-6 md:pb-8 font-sans text-[9px] md:text-[11px] font-bold tracking-[0.2em] uppercase pt-4 text-white"
            style={{ borderTop: "1px solid rgba(255,255,255,0.25)" }}
          >
            <p>20대 라이프 매거진</p>
            {/* Pause/Play + dots */}
            {images.length > 1 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  className="flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  aria-label={isPlaying ? "슬라이드 정지" : "슬라이드 재생"}
                >
                  {isPlaying ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <rect x="1" y="0.5" width="3" height="11" rx="0.8"/>
                      <rect x="8" y="0.5" width="3" height="11" rx="0.8"/>
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M2 1L11 6L2 11V1Z"/>
                    </svg>
                  )}
                </button>
                <div className="flex items-center gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      className={`rounded-full transition-all duration-300 ${i === slideIndex ? "w-4 h-1 bg-white/80" : "w-1 h-1 bg-white/35 hover:bg-white/60"}`}
                      aria-label={`${i + 1}번 이미지`}
                    />
                  ))}
                </div>
              </div>
            )}
            <p>flowerlog20.com</p>
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
