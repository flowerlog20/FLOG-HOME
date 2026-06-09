import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMagazineIssuesFromDB, type MagazineIssue } from "@/lib/magazine-store";

function MagazineModal({
  issue,
  onClose,
}: {
  issue: MagazineIssue;
  onClose: () => void;
}) {
  const [page, setPage] = useState(0);
  const total = issue.pages.length;

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
              FLOG — Issue {issue.id}
            </span>
            <h3 className="font-serif text-lg md:text-xl text-background/90 mt-0.5">
              {issue.title}
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

        {/* A4 image frame — ratio 210:297 */}
        <div className="relative flex-1 flex items-center justify-center w-full max-w-3xl mx-auto gap-3 md:gap-6">
          {/* Left arrow */}
          <button
            onClick={prev}
            disabled={page === 0}
            className="shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-background/20 text-background/60 hover:text-background hover:border-background/60 disabled:opacity-15 disabled:cursor-default transition-all"
            aria-label="이전 페이지"
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
                src={issue.pages[page]}
                alt={`${issue.title} — p.${page + 1}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            disabled={page === total - 1}
            className="shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-background/20 text-background/60 hover:text-background hover:border-background/60 disabled:opacity-15 disabled:cursor-default transition-all"
            aria-label="다음 페이지"
          >
            <span className="text-lg leading-none">→</span>
          </button>
        </div>

        {/* Bottom bar */}
        <div className="w-full max-w-3xl mx-auto mt-4 md:mt-5 flex justify-between items-end">
          <p
            className="font-sans text-[10px] tracking-[0.2em] text-background/35 max-w-xs"
            style={{ fontFamily: "'Hahmlet', serif" }}
          >
            {issue.captions[page]}
          </p>
          <span className="font-sans text-[10px] tracking-widest text-background/25">
            {String(page + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Magazine() {
  const [openIssue, setOpenIssue] = useState<MagazineIssue | null>(null);
  const [issues, setIssues] = useState<MagazineIssue[]>([]);

  useEffect(() => {
    getMagazineIssuesFromDB().then(setIssues);
  }, []);

  return (
    <div className="bg-[#fbfaf6] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-24 md:w-1/2"
        >
          <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">Archive</span>
          <h1 className="font-serif text-5xl mt-4 mb-6">Magazine</h1>
          <p className="font-sans font-light text-foreground/70 leading-relaxed">
            종이 위에 활자로 새긴 우리의 일상. 20대의 고민, 사랑, 그리고 라이프스타일을 진솔하게 담아냅니다.
          </p>
        </motion.div>

        <div className="space-y-32">
          {issues.map((issue, idx) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className={`flex flex-col ${idx % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-24 items-center`}
            >
              <div
                className="w-full md:w-5/12 bg-muted relative overflow-hidden group cursor-pointer"
                style={{ aspectRatio: "210 / 297" }}
                onClick={() => setOpenIssue(issue)}
              >
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-[1.5s]"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
              </div>

              <div className="w-full md:w-1/2 space-y-6">
                <span className="font-sans text-xs tracking-widest uppercase text-primary border-b border-primary/30 pb-1">
                  Issue {issue.id}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl">{issue.title}</h2>
                <p className="font-sans font-light text-xs tracking-widest text-muted-foreground">
                  {issue.date}
                </p>
                <p className="font-sans font-light leading-relaxed text-foreground/80 max-w-sm pt-4">
                  {issue.desc}
                </p>
                <div className="pt-8">
                  <button
                    onClick={() => setOpenIssue(issue)}
                    className="font-sans text-xs tracking-widest uppercase border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIssue && (
          <MagazineModal issue={openIssue} onClose={() => setOpenIssue(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
