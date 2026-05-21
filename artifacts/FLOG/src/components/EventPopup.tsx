import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { FaTimes } from "react-icons/fa";
import { getPopupDataFromDB, DEFAULT_POPUP, type PopupData } from "@/lib/magazine-store";

export function EventPopup() {
  const [visible, setVisible] = useState(false);
  const [popup, setPopup] = useState<PopupData>(DEFAULT_POPUP);
  const [loaded, setLoaded] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    getPopupDataFromDB().then(data => {
      setPopup(data);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (!popup.active) return;
    if (location !== "/") return;
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, [loaded, popup.active, location]);

  const close = () => setVisible(false);

  if (!loaded || !popup.active) return null;

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
            key="popup-card"
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
              <Link
                href="/event"
                onClick={close}
                className="shrink-0 ml-4 bg-foreground text-background font-sans text-[9px] tracking-[0.4em] uppercase px-5 py-2.5 hover:bg-foreground/80 transition-colors"
              >
                자세히 보기
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
