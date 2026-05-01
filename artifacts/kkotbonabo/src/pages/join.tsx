import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

// Formspree 양식 URL — 연결 후 실제 URL로 교체하세요
const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID";

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

const items = [
  {
    index: "01",
    title: "매거진 인터뷰",
    en: "Magazine Interview",
    desc: "당신의 일상, 고민, 그리고 20대라는 시간.\nFLOG는 평범한 하루 안에서 특별한 이야기를 발견합니다.\n우리가 당신의 이야기를 기록하겠습니다.",
    note: "별도의 조건 없이 누구나 신청 가능합니다.",
  },
  {
    index: "02",
    title: "마인드 프로필",
    en: "Mind Profile",
    desc: "나는 어떤 사람인가.\n외면이 아닌 내면을 기록하는 FLOG만의 프로필 촬영.\n심리 기반 질문지와 함께 나를 사진으로 담아냅니다.",
    note: "진행 일정은 별도 안내드립니다.",
  },
  {
    index: "03",
    title: "협업 문의",
    en: "Collaboration",
    desc: "브랜드, 공간, 창작자 누구와도 열려 있습니다.\n20대의 감각으로 함께 만들어갈 수 있다면,\nFLOG는 언제든 대화할 준비가 되어 있습니다.",
    note: "문의는 이메일로 받고 있습니다.",
  },
];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function JoinForm() {
  const [submitted, setSubmitted] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const checkValid = () => setFormValid(formRef.current?.checkValidity() ?? false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed || !formRef.current?.checkValidity()) return;
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) setSubmitted(true);
      else alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
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
        <p className="font-sans text-[9px] tracking-[0.5em] uppercase text-foreground/30 mb-4">전송 완료</p>
        <p className="font-serif text-2xl mb-3">감사합니다</p>
        <p className="font-sans font-light text-foreground/55 text-sm">문의가 접수되었습니다. 곧 연락드리겠습니다.</p>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={checkValid}
      className="max-w-2xl mx-auto space-y-10"
    >
      {/* 신청 유형 */}
      <Field label="신청 유형">
        <select
          className={`${fieldCls} appearance-none cursor-pointer`}
          name="신청 유형"
          required
          defaultValue=""
        >
          <option value="" disabled>선택</option>
          <option value="매거진 인터뷰 신청">매거진 인터뷰 신청</option>
          <option value="마인드 프로필 신청">마인드 프로필 신청</option>
          <option value="협업 문의">협업 문의</option>
        </select>
      </Field>

      {/* 이름 + 연락처 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Field label="이름">
          <input className={fieldCls} name="이름" type="text" required placeholder="" />
        </Field>
        <Field label="연락처">
          <input
            className={fieldCls}
            name="연락처"
            type="tel"
            required
            placeholder="010-0000-0000"
            value={phoneValue}
            onChange={(e) => { setPhoneValue(formatPhone(e.target.value)); checkValid(); }}
          />
        </Field>
      </div>

      {/* 이메일 */}
      <Field label="이메일">
        <input className={fieldCls} name="이메일" type="email" required placeholder="example@email.com" />
      </Field>

      {/* 문의 내용 */}
      <Field label="문의 내용">
        <textarea
          className={`${fieldCls} resize-none h-32 pt-3`}
          name="문의 내용"
          required
          placeholder="자유롭게 작성해주세요."
        />
      </Field>

      {/* 개인정보 동의 */}
      <div className="border border-foreground/10 p-6 space-y-4">
        <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-foreground/40">
          개인정보 수집·이용 동의
        </p>
        <div className="font-sans text-[11px] text-foreground/50 leading-relaxed space-y-1.5">
          <p><span className="text-foreground/70">수집 항목</span> — 이름, 연락처, 이메일, 문의 내용</p>
          <p><span className="text-foreground/70">수집 목적</span> — 신청 및 문의 접수, 안내 회신</p>
          <p><span className="text-foreground/70">보유 기간</span> — 목적 달성 후 30일 이내 파기</p>
          <p className="pt-1 text-foreground/35">동의하지 않을 권리가 있으나, 미동의 시 신청이 제한될 수 있습니다.</p>
        </div>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            onClick={() => { setAgreed(v => !v); checkValid(); }}
            className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
              agreed ? "bg-foreground border-foreground" : "border-foreground/30 group-hover:border-foreground/60"
            }`}
          >
            {agreed && (
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                <path d="M1 3L3 5L7 1" stroke="hsl(var(--background))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span
            onClick={() => { setAgreed(v => !v); checkValid(); }}
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
          disabled={!agreed || !formValid}
          className="w-full md:w-auto font-sans text-[9px] tracking-[0.45em] uppercase px-16 py-4 bg-foreground text-background hover:bg-foreground/80 disabled:bg-foreground/15 disabled:text-foreground/30 disabled:cursor-not-allowed transition-colors"
        >
          제출하기
        </button>
        {!agreed && (
          <p className="font-sans text-[9px] text-foreground/30 tracking-wide">
            개인정보 수집·이용에 동의해주세요
          </p>
        )}
      </div>
    </form>
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
          <p className="font-sans text-[9px] tracking-[0.5em] uppercase text-foreground/35 mb-4">
            Join FLOG
          </p>
          <h1 className="font-serif leading-tight mb-8" style={{ fontSize: 'clamp(1.75rem, 8.5vw, 3.75rem)' }}>
            당신의 이야기를<br />기록하겠습니다
          </h1>
          <p className="font-sans font-light text-foreground/55 text-sm leading-loose max-w-lg">
            FLOG는 20대의 평범한 하루에서 특별함을 발견하는 팀입니다.<br />
            인터뷰, 프로필, 협업 — 어떤 방식으로든 함께할 수 있습니다.
          </p>
        </motion.div>

        {/* Items */}
        <div className="divide-y divide-border border-t border-border">
          {items.map((item, i) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: i * 0.08 }}
              className="py-14 grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-12 items-start"
            >
              <span className="font-sans text-xs tracking-[0.4em] text-foreground/25 mt-1">
                {item.index}
              </span>
              <div className="space-y-5">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.45em] uppercase text-foreground/30 mb-2">
                    {item.en}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl">{item.title}</h2>
                </div>
                <p className="font-sans font-light text-foreground/60 text-sm leading-loose whitespace-pre-line">
                  {item.desc}
                </p>
                <p className="font-sans text-[10px] tracking-wide text-foreground/30 border-l border-foreground/15 pl-3">
                  {item.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="border-t border-border pt-16 mt-4"
        >
          <div className="text-center space-y-3 mb-16">
            <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">Apply</span>
            <h2 className="font-serif text-3xl md:text-4xl">신청 및 문의</h2>
            <p className="font-sans font-light text-foreground/55 text-sm leading-relaxed">
              아래 양식을 작성해 주시면 빠르게 답변드리겠습니다.
            </p>
          </div>
          <JoinForm />
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-20 pt-12 border-t border-border text-center space-y-2"
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
