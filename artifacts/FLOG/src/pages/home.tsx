import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { getHomeDataFromDB, DEFAULT_HOME, type HomeData } from "@/lib/magazine-store";
import mag1 from "@/assets/images/magazine_1.jpg";
import mag2 from "@/assets/images/magazine_2.jpg";
import mag3 from "@/assets/images/magazine_3.jpg";
import prof1 from "@/assets/images/profile_1.jpg";
import prof2 from "@/assets/images/profile_2.jpg";
import prof3 from "@/assets/images/profile_3.jpg";

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

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative w-full bg-black overflow-hidden" style={{ height: "85vh" }}>
        {/* Slideshow */}
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

        {/* Bottom gradient for text */}
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

        {/* Bottom: title + subtitle + indicators */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-16 pb-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Dash indicators */}
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
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-foreground/50 shrink-0">latest issue</span>
            <div className="flex-1 h-[1px] bg-foreground/10" />
          </div>

          {/* Grid: left magazine + right scrollable gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 md:items-start">

            {/* Left: Magazine card — A4 ratio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8 }}
              className="group cursor-pointer"
            >
              <Link href="/magazine">
                <div className="relative overflow-hidden" style={{ aspectRatio: "210/297" }}>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ backgroundImage: `url('${home.magazinePreview.imageUrl}')` }}
                  />
                </div>
              </Link>
            </motion.div>

            {/* Right: 2×3 scrollable grid — desktop: height locked to left card / mobile: all visible */}
            <div className="gallery-scroll">
              <div className="grid grid-cols-2 gap-2">
                {(home.galleryImages?.length
                  ? home.galleryImages
                  : [mag1, mag2, prof1, mag3, prof2, prof3] as unknown as string[]
                ).map((src, i) => (
                  <div key={i} className="overflow-hidden">
                    <img
                      src={src}
                      alt=""
                      className="w-full block object-cover transition-transform duration-500 hover:scale-[1.04]"
                      style={{ aspectRatio: "4/5" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Subsection 2: Interviews Feed ── */}
        <div>
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-foreground/50 shrink-0">interviews</span>
            <div className="flex-1 h-[1px] bg-foreground/10" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {(home.interviews?.length ? home.interviews : [
              { imageUrl: prof1 as unknown as string, tag: "INTERVIEW", title: "나는 지금 여기 있다", name: "김지수 · 23" },
              { imageUrl: mag1 as unknown as string,  tag: "INTERVIEW", title: "관계를 배우는 중입니다", name: "이서윤 · 25" },
              { imageUrl: prof2 as unknown as string, tag: "INTERVIEW", title: "계절이 바뀌면 나도 바뀌어", name: "박도현 · 22" },
              { imageUrl: mag2 as unknown as string,  tag: "INTERVIEW", title: "아직 모르는 게 더 많아요", name: "최예린 · 24" },
              { imageUrl: prof3 as unknown as string, tag: "INTERVIEW", title: "좋아하는 걸 찾는 시간", name: "정민준 · 26" },
              { imageUrl: mag3 as unknown as string,  tag: "INTERVIEW", title: "우리의 20대는 진행 중", name: "한소희 · 21" },
            ]).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: "easeOut" }}
                className="group cursor-pointer relative overflow-hidden rounded-sm"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full block object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ aspectRatio: "3/4" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-400" />
                <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-6">
                  <span className="font-sans text-[7px] md:text-[11px] tracking-[0.3em] uppercase text-white/60 block mb-1 md:mb-2">{item.tag}</span>
                  <p className="font-sans text-white text-[12px] md:text-[18px] leading-snug font-medium">{item.title}</p>
                  <p className="font-sans text-white/55 text-[9px] md:text-[13px] mt-1.5 md:mt-2 tracking-wide">{item.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </section>
      {/* ─── CTA ─── */}
    </>
  );
}
