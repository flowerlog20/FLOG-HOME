import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useLocation } from "wouter";
import { getEventByIdFromDB, type EventData } from "@/lib/magazine-store";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!id) { navigate("/event"); return; }
    getEventByIdFromDB(id).then(data => {
      if (!data) navigate("/event");
      else setEvent(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="font-sans text-[9px] tracking-widest uppercase text-foreground/25">불러오는 중…</p>
    </div>
  );

  if (!event) return null;

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">

        {/* Back */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <button
            onClick={() => navigate("/event")}
            className="font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/35 hover:text-foreground/70 transition-colors"
          >
            ← EVENT 목록
          </button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-4 mb-20"
        >
          <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">FLOG presents</span>
          <h1 className="font-serif md:text-7xl text-[30px]">{event.title}</h1>
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-foreground/40">{event.subtitle}</p>
          {!event.active && (
            <span className="inline-block font-sans text-[8px] tracking-[0.35em] uppercase border border-foreground/20 text-foreground/40 px-3 py-1">
              종료된 이벤트
            </span>
          )}
        </motion.div>

        {/* Poster */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full max-w-sm mx-auto aspect-[905/1280] mb-20 overflow-hidden"
        >
          {event.posterUrl ? (
            event.posterLink ? (
              <a href={event.posterLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <img src={event.posterUrl} alt={event.title} className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300" />
              </a>
            ) : (
              <img src={event.posterUrl} alt={event.title} className="w-full h-full object-cover" />
            )
          ) : (
            <div className="w-full h-full border border-dashed border-foreground/15 flex flex-col items-center justify-center gap-3">
              <span className="font-sans text-[8px] tracking-[0.45em] uppercase text-foreground/20">Poster</span>
              <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-foreground/15">준비 중</span>
            </div>
          )}
        </motion.div>

        {/* Event Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="border-t border-border pt-16 mb-16"
        >
          <h2 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-10">행사 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/35">일시</p>
              <p className="font-sans font-light text-foreground text-base">{event.date}</p>
            </div>
            <div className="space-y-1">
              <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/35">장소</p>
              <p className="font-sans font-light text-foreground text-base">{event.location}</p>
            </div>
            {event.fee && (
              <div className="space-y-1">
                <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/35">입장료</p>
                <p className="font-sans font-light text-foreground text-base">{event.fee}</p>
              </div>
            )}
            {event.description && (
              <div className="md:col-span-2 space-y-1 mt-4">
                <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/35">소개</p>
                <p className="font-sans font-light text-foreground/75 leading-loose whitespace-pre-wrap">{event.description}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Activities */}
        {event.activities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="border-t border-border pt-16 mb-16"
          >
            <h2 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-10">프로그램</h2>
            <div className="divide-y divide-border">
              {event.activities.map((act, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="py-8 grid grid-cols-1 md:grid-cols-[60px_1fr_2fr] gap-4 md:gap-10 items-start"
                >
                  <span className="font-sans text-xs tracking-widest text-foreground/25">0{i + 1}</span>
                  <h3 className="font-serif text-xl md:text-2xl">{act.name}</h3>
                  <p className="font-sans font-light text-foreground/65 leading-loose text-sm">{act.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Gallery */}
        {event.galleryImages.filter(Boolean).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="border-t border-border pt-16 mb-16"
          >
            <h2 className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-10">예시 이미지</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {event.galleryImages.filter(Boolean).map((img, i) => (
                <div key={i} className="aspect-square bg-muted overflow-hidden">
                  <img src={img} alt={`gallery-${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Apply CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="border-t border-border pt-16 text-center space-y-6"
        >
          <span className="block font-sans text-xs tracking-widest uppercase text-muted-foreground">Apply</span>
          <h2 className="font-serif text-3xl md:text-4xl">참가 신청</h2>
          {event.active ? (
            <p className="font-sans font-light text-foreground/55 text-sm leading-relaxed">
              신청 양식은 아래 버튼을 눌러 확인할 수 있습니다.
            </p>
          ) : (
            <p className="font-sans font-light text-foreground/40 text-sm leading-relaxed">
              이 이벤트는 종료되어 신청이 마감되었습니다.
            </p>
          )}
          {event.active && event.formsUrl ? (
            <a
              href={event.formsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-[9px] tracking-[0.45em] uppercase px-16 py-4 bg-foreground text-background hover:bg-foreground/80 transition-colors"
            >
              신청하기
            </a>
          ) : (
            <span className="inline-block font-sans text-[9px] tracking-[0.45em] uppercase px-16 py-4 bg-foreground/10 text-foreground/30 cursor-not-allowed select-none">
              {event.active ? "신청하기" : "마감됨"}
            </span>
          )}
        </motion.div>

      </div>
    </div>
  );
}
