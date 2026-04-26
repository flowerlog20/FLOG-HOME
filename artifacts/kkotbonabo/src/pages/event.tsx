import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getEventData, type EventData } from "@/lib/magazine-store";

export default function Event() {
  const [event, setEvent] = useState<EventData | null>(null);

  useEffect(() => {
    setEvent(getEventData());
  }, []);

  if (!event) return null;

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-4 mb-20"
        >
          <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">FLOG presents</span>
          <h1 className="font-serif text-5xl md:text-7xl">{event.title}</h1>
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-foreground/40">{event.subtitle}</p>
        </motion.div>

        {/* Poster */}
        {event.posterUrl && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full max-w-sm mx-auto aspect-[3/4] bg-muted overflow-hidden mb-20"
          >
            <img src={event.posterUrl} alt={event.title} className="w-full h-full object-cover" />
          </motion.div>
        )}

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
            {event.description && (
              <div className="md:col-span-2 space-y-1 mt-4">
                <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/35">소개</p>
                <p className="font-sans font-light text-foreground/75 leading-loose">{event.description}</p>
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

        {/* Formsfree */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="border-t border-border pt-16"
        >
          <div className="text-center space-y-3 mb-12">
            <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">Apply</span>
            <h2 className="font-serif text-3xl md:text-4xl">신청하기</h2>
            <p className="font-sans font-light text-foreground/60 text-sm">아래 양식을 작성해 참가 신청을 완료해주세요.</p>
          </div>

          {event.formsUrl ? (
            <iframe
              src={event.formsUrl}
              width="100%"
              height="600"
              frameBorder="0"
              title="S-LOG 신청서"
              className="w-full border border-border"
            />
          ) : (
            <div className="text-center py-16 border border-dashed border-border text-foreground/30">
              <p className="font-sans text-xs tracking-widest uppercase">신청 폼이 준비 중입니다</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
