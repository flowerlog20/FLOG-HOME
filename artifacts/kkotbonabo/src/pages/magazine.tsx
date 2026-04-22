import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mag1 from "@/assets/images/magazine_1.jpg";
import mag2 from "@/assets/images/magazine_2.jpg";
import mag3 from "@/assets/images/magazine_3.jpg";

const issues = [
  {
    id: "03",
    title: "여름의 잔상",
    date: "2024 Summer",
    image: mag1,
    desc: "뜨겁고 찬란했던, 그래서 더 아쉬운 우리의 계절에 대하여.",
    pages: [
      mag1,
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80",
    ],
    captions: [
      "Cover — 여름의 잔상",
      "그 여름, 우리는 모든 것이 영원할 것이라 믿었다.",
      "뜨거운 햇살 아래 잠시 멈춘 시간들.",
      "계절이 지나도 남아있는 기억의 온도.",
    ],
  },
  {
    id: "02",
    title: "새벽 두 시",
    date: "2024 Spring",
    image: mag2,
    desc: "가장 깊은 밤, 홀로 깨어있는 시간 속 요동치는 마음들.",
    pages: [
      mag2,
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      "https://images.unsplash.com/photo-1514565131-fce0801e6785?w=800&q=80",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
    ],
    captions: [
      "Cover — 새벽 두 시",
      "아무도 없는 새벽, 도시는 조용히 숨을 쉰다.",
      "이 시간에만 존재하는 나만의 세계.",
      "밤이 깊을수록 생각은 선명해진다.",
    ],
  },
  {
    id: "01",
    title: "첫 만남",
    date: "2023 Winter",
    image: mag3,
    desc: "우리가 처음 마주한 순간, 서툴지만 솔직했던 기록의 시작.",
    pages: [
      mag3,
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
      "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=800&q=80",
      "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=800&q=80",
    ],
    captions: [
      "Cover — 첫 만남",
      "처음은 언제나 서툴고, 그래서 아름답다.",
      "우리가 처음 꽃을 건넸던 그 골목.",
      "끝을 모른 채 시작한 이야기들.",
    ],
  },
];

type Issue = typeof issues[0];

function MagazineModal({
  issue,
  onClose,
}: {
  issue: Issue;
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

        {/* A4 image frame — ratio 2159:2794 */}
        <div className="relative flex-1 flex items-center justify-center w-full max-w-3xl mx-auto">
          <div
            className="relative overflow-hidden bg-[#1a1a1a] shadow-2xl"
            style={{
              aspectRatio: "2159 / 2794",
              maxHeight: "calc(100vh - 160px)",
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
                style={{ aspectRatio: "2159 / 2794" }}
              />
            </AnimatePresence>

            {/* Left / Right tap zones */}
            <button
              onClick={prev}
              disabled={page === 0}
              className="absolute left-0 top-0 h-full w-1/3 opacity-0 hover:opacity-100 transition-opacity disabled:cursor-default flex items-center justify-start pl-3"
              aria-label="이전 페이지"
            >
              <span className="font-sans text-xs tracking-widest text-background/70">‹</span>
            </button>
            <button
              onClick={next}
              disabled={page === total - 1}
              className="absolute right-0 top-0 h-full w-1/3 opacity-0 hover:opacity-100 transition-opacity disabled:cursor-default flex items-center justify-end pr-3"
              aria-label="다음 페이지"
            >
              <span className="font-sans text-xs tracking-widest text-background/70">›</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full max-w-3xl mx-auto mt-4 md:mt-5 flex justify-between items-end">
          <p
            className="font-sans text-[10px] tracking-[0.2em] text-background/35 max-w-xs"
            style={{ fontFamily: "'Hahmlet', serif" }}
          >
            {issue.captions[page]}
          </p>

          {/* Page navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              disabled={page === 0}
              className="font-sans text-[10px] tracking-[0.35em] uppercase text-background/40 hover:text-background/80 transition-colors disabled:opacity-20"
            >
              ← Prev
            </button>
            <span className="font-sans text-[10px] tracking-widest text-background/25">
              {String(page + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              disabled={page === total - 1}
              className="font-sans text-[10px] tracking-[0.35em] uppercase text-background/40 hover:text-background/80 transition-colors disabled:opacity-20"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Magazine() {
  const [openIssue, setOpenIssue] = useState<Issue | null>(null);

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
              {/* A4 cover image */}
              <div
                className="w-full md:w-5/12 bg-muted relative overflow-hidden group cursor-pointer"
                style={{ aspectRatio: "2159 / 2794" }}
                onClick={() => setOpenIssue(issue)}
              >
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-[1.5s]"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
              </div>

              {/* Text */}
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
