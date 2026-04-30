import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { getEventData, type EventData } from "@/lib/magazine-store";

/* ─── 입력 필드 스타일 ─── */
const fieldCls = "w-full bg-transparent border-b border-foreground/20 focus:border-foreground/60 outline-none py-3 font-sans font-light text-sm text-foreground placeholder:text-foreground/30 transition-colors";
const labelCls = "block font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/40 mb-2";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

/* ─── 신청 폼 ─── */
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function ApplyForm({ formsUrl, eventTitle }: { formsUrl: string; eventTitle: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [formValid, setFormValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const checkFormValid = () => {
    setFormValid(formRef.current?.checkValidity() ?? false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formsUrl) return;
    if (!privacyAgreed) return;
    if (!formRef.current?.checkValidity()) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("개인정보 수집·이용 동의", "동의함");
    try {
      await fetch(formsUrl, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setSubmitted(true);
    } catch {
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 border border-border"
      >
        <p className="font-sans text-[9px] tracking-[0.5em] uppercase text-foreground/30 mb-4">신청 완료</p>
        <p className="font-serif text-2xl mb-3">감사합니다</p>
        <p className="font-sans font-light text-foreground/55 text-sm">참가 신청이 접수되었습니다.</p>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={formsUrl ? handleSubmit : (e) => e.preventDefault()}
      onChange={checkFormValid}
      action={formsUrl || undefined}
      method="POST"
      className="max-w-2xl mx-auto space-y-10"
    >
      {/* 이름 + 성별 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Field label="이름">
          <input
            className={fieldCls}
            name="이름"
            type="text"
            required
            placeholder=""
          />
        </Field>
        <Field label="성별">
          <select
            className={`${fieldCls} appearance-none cursor-pointer`}
            name="성별"
            required
            defaultValue=""
          >
            <option value="" disabled>선택</option>
            <option value="여성">여성</option>
            <option value="남성">남성</option>
          </select>
        </Field>
      </div>

      {/* 나이 + 전화번호 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Field label="나이">
          <input
            className={fieldCls}
            name="나이"
            type="number"
            min={1}
            max={99}
            required
            placeholder=""
          />
        </Field>
        <Field label="전화번호">
          <input
            className={fieldCls}
            name="전화번호"
            type="tel"
            required
            placeholder="010-0000-0000"
            value={phoneValue}
            onChange={(e) => setPhoneValue(formatPhone(e.target.value))}
          />
        </Field>
      </div>

      {/* 거주지 */}
      <Field label="거주지">
        <input
          className={fieldCls}
          name="거주지"
          type="text"
          required
          placeholder="서울 서초구 반포동"
        />
      </Field>

      {/* 유입경로 */}
      <Field label="본 행사를 어떻게 알게 되셨나요?">
        <select
          className={`${fieldCls} appearance-none cursor-pointer`}
          name="유입경로"
          required
          defaultValue=""
        >
          <option value="" disabled>선택</option>
          <option value="SNS">SNS</option>
          <option value="지인 추천">지인 추천</option>
          <option value="FLOG 매거진">FLOG 매거진</option>
          <option value="광고">광고</option>
          <option value="기타">기타</option>
        </select>
      </Field>

      {/* 개인정보 수집·이용 동의 */}
      <div className="border border-foreground/10 p-6 space-y-4">
        <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/40">
          개인정보 수집·이용 동의
        </p>
        <div className="font-sans text-[11px] text-foreground/50 leading-relaxed space-y-1.5">
          <p><span className="text-foreground/70">수집 항목</span> — 이름, 성별, 나이, 전화번호, 거주지, 유입경로</p>
          <p><span className="text-foreground/70">수집 목적</span> — S-LOG 행사 참가 신청 접수 및 행사 운영</p>
          <p><span className="text-foreground/70">보유 기간</span> — 행사 종료 후 30일 이내 파기</p>
          <p className="pt-1 text-foreground/35">
            위 개인정보 수집·이용에 동의하지 않을 권리가 있으나, 동의하지 않을 경우 신청이 제한될 수 있습니다.
          </p>
        </div>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            onClick={() => setPrivacyAgreed(v => !v)}
            className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
              privacyAgreed ? "bg-foreground border-foreground" : "border-foreground/30 group-hover:border-foreground/60"
            }`}
          >
            {privacyAgreed && (
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                <path d="M1 3L3 5L7 1" stroke="hsl(var(--background))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span
            onClick={() => setPrivacyAgreed(v => !v)}
            className="font-sans text-[11px] text-foreground/65 select-none"
          >
            개인정보 수집·이용에 동의합니다 <span className="text-foreground/35">(필수)</span>
          </span>
        </label>
      </div>

      {/* Submit */}
      <div className="pt-2 flex flex-col items-center gap-4">

        <button
          type="submit"
          disabled={!formsUrl || !privacyAgreed || !formValid}
          className="w-full md:w-auto font-sans text-[9px] tracking-[0.45em] uppercase px-16 py-4 bg-foreground text-background hover:bg-foreground/80 disabled:bg-foreground/15 disabled:text-foreground/30 disabled:cursor-not-allowed transition-colors"
        >
          신청하기
        </button>
        {!privacyAgreed && formsUrl && (
          <p className="font-sans text-[9px] text-foreground/30 tracking-wide">
            개인정보 수집·이용에 동의해주세요
          </p>
        )}
      </div>
    </form>
  );
}

export default function Event() {
  const [event, setEvent] = useState<EventData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEvent(getEventData());
  }, []);

  const handleOpenForm = () => {
    setShowForm(true);
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full max-w-sm mx-auto aspect-[905/1280] mb-20 overflow-hidden"
        >
          {event.posterUrl ? (
            <img src={event.posterUrl} alt={event.title} className="w-full h-full object-cover" />
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
          <p className="font-sans font-light text-foreground/55 text-sm leading-relaxed">
            신청 양식은 아래 버튼을 눌러 확인할 수 있습니다.
          </p>
          {!showForm && (
            <button
              onClick={handleOpenForm}
              className="font-sans text-[9px] tracking-[0.45em] uppercase px-16 py-4 bg-foreground text-background hover:bg-foreground/80 transition-colors"
            >
              신청하기
            </button>
          )}
        </motion.div>

        {/* Application Form — shown after clicking */}
        {showForm && (
          <motion.div
            ref={formSectionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-muted mt-16 -mx-6 md:-mx-12 px-6 md:px-12 py-16"
          >
            <div className="text-center space-y-3 mb-16">
              <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">신청 양식</span>
              <p className="font-sans font-light text-foreground/55 text-sm leading-relaxed">
                아래 양식을 작성해 참가 신청을 완료해주세요.
              </p>
            </div>
            <ApplyForm formsUrl={event.formsUrl} eventTitle={event.title} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
