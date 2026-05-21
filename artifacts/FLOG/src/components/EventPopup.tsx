import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { FaTimes } from "react-icons/fa";
import { getPopupsFromDB, type PopupData } from "@/lib/magazine-store";

export function EventPopup() {
  const [allPopups, setAllPopups] = useState<PopupData[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    getPopupsFromDB().then(all => {
      setAllPopups(all.filter(p => p.active));
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (allPopups.length === 0) return;
    if (location !== "/") return;
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, [loaded, allPopups.length, location]);

  const closeAll = () => setVisible(false);
  const dismissOne = (id: string) => {
    const next = new Set(dismissed).add(id);
    setDismissed(next);
    if (next.size >= allPopups.length) setVisible(false);
  };

  const shownPopups = allPopups.filter(p => !dismissed.has(p.id));

  if (!loaded || allPopups.length === 0) return null;

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
          onClick={closeAll}
        >
          {/* PC: side by side | Mobile: stacked/angled */}
          <div
            className="relative flex items-center justify-center w-full"
            onClick={e => e.stopPropagation()}
          >
            {shownPopups.length >= 2 ? (
              <>
                {/* PC: flex row side by side */}
                <div className="hidden md:flex gap-6 items-start justify-center">
                  {shownPopups.slice(0, 2).map((popup) => (
                    <PopupCard
                      key={popup.id}
                      popup={popup}
                      onClose={() => dismissOne(popup.id)}
                    />
                  ))}
                </div>

                {/* Mobile: overlapping angled stack */}
                <div className="md:hidden relative w-full flex items-center justify-center" style={{ height: "min(78vh, 520px)" }}>
                  {/* Second popup — behind */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, rotate: 4, x: 18, y: 14 }}
                    animate={{ opacity: 1, scale: 1, rotate: 4, x: 18, y: 14 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ zIndex: 1 }}
                  >
                    <div className="w-full max-w-[260px] bg-background shadow-2xl overflow-hidden">
                      <PopupCardInner popup={shownPopups[1]} onClose={() => dismissOne(shownPopups[1].id)} />
                    </div>
                  </motion.div>

                  {/* First popup — front */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, rotate: -3, x: -14, y: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: -3, x: -14, y: -10 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ zIndex: 2 }}
                  >
                    <div className="w-full max-w-[260px] bg-background shadow-2xl overflow-hidden">
                      <PopupCardInner popup={shownPopups[0]} onClose={() => dismissOne(shownPopups[0].id)} />
                    </div>
                  </motion.div>
                </div>
              </>
            ) : (
              /* Single popup — centered */
              shownPopups.slice(0, 1).map(popup => (
                <PopupCard key={popup.id} popup={popup} onClose={() => dismissOne(popup.id)} />
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PopupCard({ popup, onClose }: { popup: PopupData; onClose: () => void }) {
  return (
    <motion.div
      key={popup.id}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative w-full max-w-sm bg-background overflow-hidden shadow-2xl"
    >
      <PopupCardInner popup={popup} onClose={onClose} />
    </motion.div>
  );
}

function PopupCardInner({ popup, onClose }: { popup: PopupData; onClose: () => void }) {
  return (
    <>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="닫기"
      >
        <FaTimes className="text-[11px]" />
      </button>

      <div className="w-full aspect-[905/1280] bg-muted relative overflow-hidden">
        <img
          src={popup.posterUrl || "/slog-poster.jpg"}
          alt={popup.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-5 py-4 flex items-center justify-between border-t border-border">
        <div className="min-w-0">
          <p className="font-sans text-[8px] tracking-[0.4em] uppercase text-foreground/40">FLOG presents</p>
          <p className="font-sans font-light text-sm text-foreground mt-0.5 truncate">{popup.title} — {popup.subtitle}</p>
        </div>
        <Link
          href="/event"
          onClick={onClose}
          className="shrink-0 ml-3 bg-foreground text-background font-sans text-[8px] tracking-[0.35em] uppercase px-4 py-2 hover:bg-foreground/80 transition-colors"
        >
          보기
        </Link>
      </div>
    </>
  );
}
