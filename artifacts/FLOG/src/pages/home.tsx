import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { getHomeDataFromDB, type HomeData } from "@/lib/magazine-store";

/* ── Loading placeholder ───────────────────────────── */
function ImagePlaceholder({ ratio, className = "" }: { ratio: string; className?: string }) {
  return (
    <div
      className={`w-full bg-foreground/5 flex items-center justify-center ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-foreground/30">
        Loading...
      </span>
    </div>
  );
}

export default function Home() {
  const [home, setHome] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    getHomeDataFromDB().then(data => {
      setHome(data);
      setLoading(false);
    });
  }, []);

  const images = home?.heroImages?.length ? home.heroImages : (home?.hero?.imageUrl ? [home.hero.imageUrl] : []);

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

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative w-full bg-black overflow-hidden" style={{ height: "85vh" }}>

        {/* Loading state */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/40">Loading...</span>
          </div>
        )}

        {/* Slideshow */}
        {!loading && images.length > 0 && (
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
        )}

        {/* Bottom gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 45%, transparent 70%)" }}
        />

        {/* Prev arrow */}
        <button
          onClick={goPrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          aria-label="이전"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M14 4L8 11L14 18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={goNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          aria-label="다음"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M8 4L14 11L8 18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Center text overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
            className="text-center px-6"
          >
            <p className="font-serif text-[38px] md:text-[72px] lg:text-[88px] font-bold text-white tracking-[0.12em] leading-none drop-shadow-sm">
              FLOWER LOG
            </p>
            <p className="font-sans text-[11px] md:text-[15px] text-white/75 tracking-[0.3em] mt-3 md:mt-5">
              가장 찬란했던 순간을 기록하다
            </p>
          </motion.div>
        </div>

        {/* Dot/dash indicators */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-16 pb-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2">
              {images.length > 1 && (
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  className="mr-1 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  aria-label={isPlaying ? "정지" : "재생"}
                >
                  {isPlaying ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                      <rect x="1" y="0" width="2.5" height="10" rx="0.5"/>
                      <rect x="6.5" y="0" width="2.5" height="10" rx="0.5"/>
                    </svg>
                  ) : (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                      <path d="M1 0.5L9.5 5L1 9.5V0.5Z"/>
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
                    width: i === slideIndex ? "32px" : "20px",
                    height: "2px",
                    background: i === slideIndex ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                  aria-label={`${i + 1}번`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── EDITORIAL GRID ─── */}
      <section className="bg-white py-12 md:py-16 px-5 md:px-12">

        {/* ── Subsection 1: Latest Issue ── */}
        <div className="mb-16 md:mb-20">
          <div className="mb-6 md:mb-8">
            <h2 className="font-serif text-[28px] md:text-[42px] font-bold tracking-tight text-foreground leading-none mb-3 md:mb-4">
              LATEST ISSUE
            </h2>
            <div className="w-full h-[1.5px] bg-foreground" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 md:items-start">

            {/* Left: Magazine card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8 }}
              className="group cursor-pointer"
            >
              <Link href="/magazine">
                <div className="relative overflow-hidden" style={{ aspectRatio: "210/297" }}>
                  {loading || !home?.magazinePreview?.imageUrl ? (
                    <ImagePlaceholder ratio="210/297" className="absolute inset-0" />
                  ) : (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                      style={{ backgroundImage: `url('${home.magazinePreview.imageUrl}')` }}
                    />
                  )}
                </div>
              </Link>
            </motion.div>

            {/* Right: 2×3 gallery grid */}
            <div className="gallery-scroll">
              <div className="grid grid-cols-2 gap-2">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <ImagePlaceholder key={i} ratio="4/5" />
                  ))
                ) : home?.galleryImages?.length ? (
                  home.galleryImages.map((src, i) => (
                    <div key={i} className="overflow-hidden">
                      <img
                        src={src}
                        alt=""
                        className="w-full block object-cover transition-transform duration-500 hover:scale-[1.04]"
                        style={{ aspectRatio: "4/5" }}
                      />
                    </div>
                  ))
                ) : (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-full bg-foreground/5 flex items-center justify-center"
                      style={{ aspectRatio: "4/5" }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Subsection 2: Interviews Feed ── */}
        <div>
          <div className="mb-6 md:mb-8">
            <h2 className="font-serif text-[28px] md:text-[42px] font-bold tracking-tight text-foreground leading-none mb-3 md:mb-4">
              INTERVIEWS
            </h2>
            <div className="w-full h-[1.5px] bg-foreground" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <ImagePlaceholder ratio="3/4" className="mb-3 md:mb-4" />
                  <div className="h-2 w-16 bg-foreground/10 mb-2 rounded-full" />
                  <div className="h-3 w-full bg-foreground/10 mb-1 rounded-full" />
                  <div className="h-2 w-20 bg-foreground/10 rounded-full" />
                </div>
              ))
            ) : home?.interviews?.length ? (
              home.interviews.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: "easeOut" }}
                  className="group cursor-pointer"
                >
                  <div className="overflow-hidden mb-3 md:mb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full block object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      style={{ aspectRatio: "3/4" }}
                    />
                  </div>
                  <span className="font-sans text-[9px] md:text-[11px] tracking-[0.3em] uppercase text-foreground/45 block mb-1.5 md:mb-2">
                    {item.tag}
                  </span>
                  <p className="font-sans text-foreground text-[13px] md:text-[15px] leading-snug font-semibold group-hover:underline underline-offset-2">
                    {item.title}
                  </p>
                  <p className="font-sans text-foreground/50 text-[10px] md:text-[12px] mt-1 tracking-wide">
                    {item.name}
                  </p>
                </motion.div>
              ))
            ) : null}
          </div>
        </div>

      </section>
    </>
  );
}
