import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { FaTimes } from "react-icons/fa";
import { getPopupsFromDB, type PopupData } from "@/lib/magazine-store";

export function EventPopup() {
  const [queue, setQueue] = useState<PopupData[]>([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    getPopupsFromDB().then(all => {
      const active = all.filter(p => p.active);
      setQueue(active);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (queue.length === 0) return;
    if (location !== "/") return;
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, [loaded, queue.length, location]);

  const close = () => setVisible(false);

  const next = () => {
    if (index < queue.length - 1) {
      setIndex(i => i + 1);
    } else {
      close();
    }
  };

  if (!loaded || queue.length === 0) return null;

  const popup = queue[index];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.72)" }}
          onClick={close}
        >
          <motion.div
            key={popup.id}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-background overflow-hidden shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-black/30 text-white hover:bg-black/50 transition-colors"
              aria-label="닫기"
            >
              <FaTimes className="text-[11px]" />
            </button>

            {/* Pagination badge */}
            {queue.length > 1 && (
              <div className="absolute top-3 left-3 z-10 bg-black/30 text-white font-sans text-[9px] tracking-widest px-2 py-1">
                {index + 1} / {queue.length}
              </div>
            )}

            {/* Poster image */}
            <div className="w-full aspect-[905/1280] bg-muted relative overflow-hidden">
              <img
                src={popup.posterUrl || "/slog-poster.jpg"}
                alt={popup.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom bar */}
            <div className="px-6 py-5 flex items-center justify-between border-t border-border">
              <div>
                <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/40">FLOG presents</p>
                <p className="font-sans font-light text-sm text-foreground mt-0.5">{popup.title} — {popup.subtitle}</p>
              </div>
              {index < queue.length - 1 ? (
                <button
                  onClick={next}
                  className="shrink-0 ml-4 bg-foreground text-background font-sans text-[9px] tracking-[0.4em] uppercase px-5 py-2.5 hover:bg-foreground/80 transition-colors"
                >
                  다음
                </button>
              ) : (
                <Link
                  href="/event"
                  onClick={close}
                  className="shrink-0 ml-4 bg-foreground text-background font-sans text-[9px] tracking-[0.4em] uppercase px-5 py-2.5 hover:bg-foreground/80 transition-colors"
                >
                  자세히 보기
                </Link>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
