import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { getEventsFromDB, type EventData } from "@/lib/magazine-store";

export default function EventList() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [tab, setTab] = useState<"active" | "ended">("active");
  const [loading, setLoading] = useState(true);
  const [, navigate] = useLocation();

  useEffect(() => {
    getEventsFromDB().then(data => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  const active = events.filter(e => e.active);
  const ended = events.filter(e => !e.active);
  const displayed = tab === "active" ? active : ended;

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-14"
        >
          <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">FLOG presents</span>
          <h1 className="font-serif text-5xl md:text-7xl mt-3">EVENT</h1>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-border mb-12">
          <button
            onClick={() => setTab("active")}
            className={`font-sans text-[10px] tracking-[0.4em] uppercase pb-4 border-b-2 transition-colors ${
              tab === "active"
                ? "border-foreground text-foreground"
                : "border-transparent text-foreground/35 hover:text-foreground/60"
            }`}
          >
            모집중{active.length > 0 ? ` (${active.length})` : ""}
          </button>
          <button
            onClick={() => setTab("ended")}
            className={`font-sans text-[10px] tracking-[0.4em] uppercase pb-4 border-b-2 transition-colors ${
              tab === "ended"
                ? "border-foreground text-foreground"
                : "border-transparent text-foreground/35 hover:text-foreground/60"
            }`}
          >
            종료된 이벤트{ended.length > 0 ? ` (${ended.length})` : ""}
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-24">
            <p className="font-sans text-[9px] tracking-widest uppercase text-foreground/25">불러오는 중…</p>
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-foreground/10">
            <p className="font-sans text-[9px] tracking-widest uppercase text-foreground/25">
              {tab === "active" ? "모집중인 이벤트가 없습니다" : "종료된 이벤트가 없습니다"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {displayed.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                onClick={() => navigate(`/event/${event.id}`)}
                className="flex gap-6 md:gap-10 py-10 cursor-pointer group"
              >
                {/* Poster thumbnail */}
                <div className="w-20 md:w-28 shrink-0 overflow-hidden bg-muted" style={{ aspectRatio: "905/1280" }}>
                  {event.posterUrl ? (
                    <img
                      src={event.posterUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full border border-dashed border-foreground/10" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                  <div>
                    <span className={`inline-block font-sans text-[8px] tracking-[0.35em] uppercase px-2 py-0.5 mb-3 ${
                      event.active
                        ? "bg-foreground text-background"
                        : "border border-foreground/20 text-foreground/40"
                    }`}>
                      {event.active ? "모집중" : "종료"}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl group-hover:opacity-60 transition-opacity duration-300 truncate">
                      {event.title}
                    </h3>
                    {event.subtitle && (
                      <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-foreground/40 mt-1.5">
                        {event.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 space-y-1">
                    {event.date && (
                      <p className="font-sans text-sm font-light text-foreground/60">{event.date}</p>
                    )}
                    {event.location && (
                      <p className="font-sans text-[11px] tracking-wide text-foreground/35">{event.location}</p>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center shrink-0">
                  <span className="font-sans text-[11px] text-foreground/20 group-hover:text-foreground/50 transition-colors duration-300">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
