import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Formspree URL — 각 양식에 맞는 ID로 교체하세요
const INTERVIEW_FORM_URL = "https://formspree.io/f/xvzloppj";
const PROFILE_FORM_URL  = "https://formspree.io/f/xqenakoz";
const COLLAB_FORM_URL   = "https://formspree.io/f/xlgzdeke";

const fieldCls = "w-full bg-transparent border-b border-foreground/20 focus:border-foreground/60 outline-none py-3 font-sans font-light text-sm text-foreground placeholder:text-foreground/30 transition-colors";
const labelCls = "block font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/40 mb-2";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className={labelCls}>{label}</label>{children}</div>;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

/* ─── 인터뷰 / 마인드 프로필 공통 양식 ─── */
function InterviewForm({ formUrl }: { formUrl: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const checkValid = () => setFormValid(formRef.current?.checkValidity() ?? false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed || !formRef.current?.checkValidity()) return;
    try {
      const res = await fetch(formUrl, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (res.ok) setSubmitted(true);
      else alert("제출 중 오류가 발생했습니다.");
    } catch { alert("제출 중 오류가 발생했습니다."); }
  };

  if (submitted) return (
    <div className="py-10 text-center border border-border">
      <p className="font-sans text-[9px] tracking-[0.5em] uppercase text-foreground/30 mb-3">신청 완료</p>
      <p className="font-serif text-xl">감사합니다</p>
      <p className="font-sans font-light text-foreground/50 text-sm mt-2">신청이 접수되었습니다. 곧 연락드리겠습니다.</p>
    </div>
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} onChange={checkValid} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Field label="이름">
          <input className={fieldCls} name="이름" type="text" required placeholder="" />
        </Field>
        <Field label="성별">
          <select className={`${fieldCls} appearance-none cursor-pointer`} name="성별" required defaultValue="">
            <option value="" disabled>선택</option>
            <option value="여성">여성</option>
            <option value="남성">남성</option>
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Field label="나이">
          <input className={fieldCls} name="나이" type="number" min={1} max={99} required placeholder="" />
        </Field>
        <Field label="전화번호">
          <input
            className={fieldCls} name="전화번호" type="tel" required placeholder="010-0000-0000"
            value={phoneValue} onChange={e => { setPhoneValue(formatPhone(e.target.value)); checkValid(); }}
          />
        </Field>
      </div>
      <Field label="거주지">
        <input className={fieldCls} name="거주지" type="text" required placeholder="서울 서초구 반포동" />
      </Field>

      <PrivacyBlock agreed={agreed} onToggle={() => { setAgreed(v => !v); checkValid(); }} />

      <div className="flex flex-col items-start gap-3">
        <button type="submit" disabled={!agreed || !formValid}
          className="font-sans text-[9px] tracking-[0.45em] uppercase px-12 py-3.5 bg-foreground text-background hover:bg-foreground/80 disabled:bg-foreground/15 disabled:text-foreground/30 disabled:cursor-not-allowed transition-colors">
          신청하기
        </button>
      </div>
    </form>
  );
}

/* ─── 협업 문의 양식 ─── */
function CollabForm({ formUrl }: { formUrl: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const checkValid = () => setFormValid(formRef.current?.checkValidity() ?? false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed || !formRef.current?.checkValidity()) return;
    try {
      const res = await fetch(formUrl, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (res.ok) setSubmitted(true);
      else alert("제출 중 오류가 발생했습니다.");
    } catch { alert("제출 중 오류가 발생했습니다."); }
  };

  if (submitted) return (
    <div className="py-10 text-center border border-border">
      <p className="font-sans text-[9px] tracking-[0.5em] uppercase text-foreground/30 mb-3">문의 완료</p>
      <p className="font-serif text-xl">감사합니다</p>
      <p className="font-sans font-light text-foreground/50 text-sm mt-2">문의가 접수되었습니다. 곧 연락드리겠습니다.</p>
    </div>
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} onChange={checkValid} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Field label="이름">
          <input className={fieldCls} name="이름" type="text" required placeholder="" />
        </Field>
        <Field label="소속">
          <input className={fieldCls} name="소속" type="text" required placeholder="브랜드명 또는 개인" />
        </Field>
      </div>
      <Field label="연락처">
        <input
          className={fieldCls} name="연락처" type="tel" required placeholder="010-0000-0000"
          value={phoneValue} onChange={e => { setPhoneValue(formatPhone(e.target.value)); checkValid(); }}
        />
      </Field>
      <Field label="문의 내용">
        <textarea className={`${fieldCls} resize-none h-32 pt-3`} name="문의 내용" required placeholder="자유롭게 작성해주세요." />
      </Field>

      <PrivacyBlock agreed={agreed} onToggle={() => { setAgreed(v => !v); checkValid(); }} />

      <div className="flex flex-col items-start gap-3">
        <button type="submit" disabled={!agreed || !formValid}
          className="font-sans text-[9px] tracking-[0.45em] uppercase px-12 py-3.5 bg-foreground text-background hover:bg-foreground/80 disabled:bg-foreground/15 disabled:text-foreground/30 disabled:cursor-not-allowed transition-colors">
          문의하기
        </button>
      </div>
    </form>
  );
}

/* ─── 개인정보 동의 블록 ─── */
function PrivacyBlock({ agreed, onToggle }: { agreed: boolean; onToggle: () => void }) {
  return (
    <div className="border border-foreground/10 p-5 space-y-4">
      <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/40">개인정보 수집·이용 동의</p>
      <div className="font-sans text-[11px] text-foreground/50 leading-relaxed space-y-1">
        <p><span className="text-foreground/70">수집 목적</span> — 신청 및 문의 접수, 안내 회신</p>
        <p><span className="text-foreground/70">보유 기간</span> — 목적 달성 후 30일 이내 파기</p>
        <p className="pt-1 text-foreground/35">동의하지 않을 권리가 있으나, 미동의 시 신청이 제한될 수 있습니다.</p>
      </div>
      <label className="flex items-center gap-3 cursor-pointer group" onClick={onToggle}>
        <div className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
          agreed ? "bg-foreground border-foreground" : "border-foreground/30 group-hover:border-foreground/60"
        }`}>
          {agreed && (
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
              <path d="M1 3L3 5L7 1" stroke="hsl(var(--background))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <span className="font-sans text-[11px] text-foreground/65 select-none">
          개인정보 수집·이용에 동의합니다 <span className="text-foreground/35">(필수)</span>
        </span>
      </label>
    </div>
  );
}

/* ─── 섹션 데이터 ─── */
const items = [
  {
    index: "01",
    title: "매거진 인터뷰",
    en: "Magazine Interview",
    desc: "당신의 일상, 고민, 그리고 20대라는 시간.\nFLOG는 평범한 하루 안에서 특별한 이야기를 발견합니다.\n우리가 당신의 이야기를 기록하겠습니다.",
    note: "별도의 조건 없이 누구나 신청 가능합니다.",
    cta: "인터뷰 신청",
    formUrl: INTERVIEW_FORM_URL,
    FormComponent: InterviewForm,
  },
  {
    index: "02",
    title: "마인드 프로필",
    en: "Mind Profile",
    desc: "나는 어떤 사람인가.\n외면이 아닌 내면을 기록하는 FLOG만의 프로필 촬영.\n심리 기반 질문지와 함께 나를 사진으로 담아냅니다.",
    note: "진행 일정은 별도 안내드립니다.",
    cta: "프로필 신청",
    formUrl: PROFILE_FORM_URL,
    FormComponent: InterviewForm,
  },
  {
    index: "03",
    title: "협업 및 문의",
    en: "Collaboration",
    desc: "브랜드, 공간, 창작자 누구와도 열려 있습니다.\n20대의 감각으로 함께 만들어갈 수 있다면,\nFLOG는 언제든 대화할 준비가 되어 있습니다.",
    note: "문의는 이메일로 받고 있습니다.",
    cta: "문의하기",
    formUrl: COLLAB_FORM_URL,
    FormComponent: CollabForm,
  },
];

function ItemSection({ item, index }: { item: typeof items[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const { FormComponent } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay: index * 0.08 }}
      className="py-14 border-b border-border"
    >
      <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-12 items-start">
        <span className="font-sans text-xs tracking-[0.4em] text-foreground/25 mt-1">
          {item.index}
        </span>
        <div className="space-y-5">
          <div>
            <p className="font-sans text-[9px] tracking-[0.45em] uppercase text-foreground/30 mb-2">{item.en}</p>
            <h2 className="font-serif text-3xl md:text-4xl">{item.title}</h2>
          </div>
          <p className="font-sans font-light text-foreground/60 text-sm leading-loose whitespace-pre-line">{item.desc}</p>
          <p className="font-sans text-[10px] tracking-wide text-foreground/30 border-l border-foreground/15 pl-3">{item.note}</p>
          <button
            onClick={() => setOpen(v => !v)}
            className="font-sans text-[9px] tracking-[0.4em] uppercase border border-foreground/20 px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
          >
            {open ? "닫기" : item.cta}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="md:ml-[calc(80px+3rem)] mt-10 pt-10 border-t border-border/50">
              <FormComponent formUrl={item.formUrl} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Join() {
  return (
    <div className="bg-background min-h-screen pt-28 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <p className="font-sans text-[9px] tracking-[0.5em] uppercase text-foreground/35 mb-4">Join FLOG</p>
          <h1 className="font-serif leading-tight mb-8" style={{ fontSize: 'clamp(1.75rem, 8.5vw, 3.75rem)' }}>
            당신의 이야기를<br />기록하겠습니다
          </h1>
          <p className="font-sans font-light text-foreground/55 text-sm leading-loose max-w-lg">
            FLOG는 20대의 평범한 하루에서 특별함을 발견하는 팀입니다.<br />
            인터뷰, 프로필, 협업 — 어떤 방식으로든 함께할 수 있습니다.
          </p>
        </motion.div>

        {/* Items */}
        <div className="border-t border-border">
          {items.map((item, i) => (
            <ItemSection key={item.index} item={item} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="pt-12 text-center space-y-2"
        >
          <p className="font-sans text-[9px] tracking-[0.5em] uppercase text-foreground/25">
            FLOWER LOG · Seoul · Est. 2024
          </p>
          <p className="font-sans font-light text-foreground/35 text-xs">20대 시절을 기록으로 남기다</p>
        </motion.div>

      </div>
    </div>
  );
}
