import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { getMindProfileDataFromDB, DEFAULT_MIND_PROFILE, type MindProfileData } from "@/lib/magazine-store";

const FALLBACKS = [
  "/mind-profile/profile_1.jpg",
  "/mind-profile/profile_2.jpg",
  "/mind-profile/profile_3.jpg",
];

const LAYOUTS = [
  { span: "col-span-1 md:col-span-2", aspect: "aspect-[16/9]" },
  { span: "col-span-1", aspect: "aspect-[3/4]" },
  { span: "col-span-1 md:col-span-3", aspect: "aspect-[21/9]" },
];

function PreviewModal({ images, onClose }: { images: string[]; onClose: () => void }) {
  const [page, setPage] = useState(0);
  const total = images.length;

  const prev = useCallback(() => setPage((p) => Math.max(p - 1, 0)), []);
  const next = useCallback(() => setPage((p) => Math.min(p + 1, total - 1)), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (total === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/92"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center w-full h-full px-4 md:px-16 py-8 md:py-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="w-full flex justify-between items-center mb-4 md:mb-6 max-w-3xl mx-auto">
          <div>
            <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-background/40">
              FLOG — Mind Profile
            </span>
            <h3 className="font-serif text-lg md:text-xl text-background/90 mt-0.5">
              마인드 프로필 예시
            </h3>
          </div>
          <button
            onClick={onClose}
            className="font-sans text-[9px] tracking-[0.45em] uppercase text-background/40 hover:text-background/80 transition-colors"
            aria-label="닫기"
          >
            Close ✕
          </button>
        </div>

        {/* Image with side arrows */}
        <div className="relative flex-1 flex items-center justify-center w-full max-w-3xl mx-auto gap-3 md:gap-6">
          <button
            onClick={prev}
            disabled={page === 0}
            className="shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-background/20 text-background/60 hover:text-background hover:border-background/60 disabled:opacity-15 disabled:cursor-default transition-all"
            aria-label="이전"
          >
            <span className="text-lg leading-none">←</span>
          </button>

          <div
            className="relative overflow-hidden bg-[#1a1a1a] shadow-2xl"
            style={{
              aspectRatio: "210 / 297",
              maxHeight: "calc(100vh - 180px)",
              width: "auto",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={page}
                src={images[page]}
                alt={`마인드 프로필 예시 ${page + 1}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            disabled={page === total - 1}
            className="shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-background/20 text-background/60 hover:text-background hover:border-background/60 disabled:opacity-15 disabled:cursor-default transition-all"
            aria-label="다음"
          >
            <span className="text-lg leading-none">→</span>
          </button>
        </div>

        {/* Page counter */}
        <div className="w-full max-w-3xl mx-auto mt-4 md:mt-5 flex justify-center">
          <span className="font-sans text-[11px] tracking-widest text-white">
            {String(page + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function MindProfile() {
  const [data, setData] = useState<MindProfileData>(DEFAULT_MIND_PROFILE);
  const [showPreview, setShowPreview] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    getMindProfileDataFromDB().then(setData);
  }, []);

  const images = LAYOUTS.map((layout, i) => ({
    ...layout,
    src: data.images?.[i] || FALLBACKS[i],
  }));

  const previewImages = (data.previewImages ?? []).filter(Boolean);

  const handleApply = () => {
    navigate("/join");
    setTimeout(() => {
      const el = document.getElementById("mind-profile");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  return (
    <div className="bg-[#1a1a1a] text-[#fbfaf6] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-24 max-w-2xl mx-auto space-y-6"
        >
          <span className="font-sans text-xs tracking-widest uppercase text-white/50">Photography</span>
          <h1 className="font-serif text-4xl md:text-5xl">마인드 프로필</h1>
          <p className="font-sans font-light text-white/70 leading-relaxed pt-4 whitespace-pre-line">
            {data.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className={`${img.span} ${img.aspect} relative overflow-hidden group cursor-pointer`}
            >
              <img
                src={img.src}
                alt="Mind Profile Portrait"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-[2s] ease-out"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span className="font-serif text-white italic tracking-widest">View Portrait</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9 }}
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => previewImages.length > 0 && setShowPreview(true)}
            disabled={previewImages.length === 0}
            className="font-sans text-[10px] tracking-[0.4em] uppercase border border-white/30 px-8 py-4 text-white/70 hover:border-white hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            마인드 프로필 예시
          </button>
          <button
            onClick={handleApply}
            className="font-sans text-[10px] tracking-[0.4em] uppercase bg-white text-[#1a1a1a] px-8 py-4 hover:bg-white/85 transition-colors"
          >
            신청하기
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showPreview && previewImages.length > 0 && (
          <PreviewModal images={previewImages} onClose={() => setShowPreview(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
