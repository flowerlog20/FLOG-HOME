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
      <section className="relative w-full bg-black overflow-hidden" style={{ height: "80vh" }}>
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

        {/* Light overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)" }} />

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              aria-label="이전 이미지"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 3L7 10L13 17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              aria-label="다음 이미지"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 3L13 10L7 17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}

        {/* Centered FLOG logotype */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-serif italic text-white select-none pointer-events-none"
            style={{
              fontSize: "clamp(5rem, 22vw, 28rem)",
              letterSpacing: "0.06em",
              mixBlendMode: "overlay",
              opacity: 0.9,
            }}
          >
            FLOG
          </motion.h1>
        </div>

        {/* Bottom: pause/play + dash indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {images.length > 1 && (
            <button
              onClick={() => setIsPlaying(p => !p)}
              className="mr-1 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              aria-label={isPlaying ? "슬라이드 정지" : "슬라이드 재생"}
            >
              {isPlaying ? (
                <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor">
                  <rect x="1" y="0" width="3" height="11" rx="0.5"/>
                  <rect x="7" y="0" width="3" height="11" rx="0.5"/>
                </svg>
              ) : (
                <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor">
                  <path d="M1 0.5L10.5 5.5L1 10.5V0.5Z"/>
                </svg>
              )}
            </button>
          )}
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className="transition-all duration-300"
              style={{
                width: i === slideIndex ? "28px" : "18px",
                height: "2px",
                background: i === slideIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
              aria-label={`${i + 1}번 이미지`}
            />
          ))}
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
