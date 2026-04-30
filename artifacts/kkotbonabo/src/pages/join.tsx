import { motion } from "framer-motion";
import { Link } from "wouter";

const items = [
  {
    index: "01",
    title: "매거진 인터뷰",
    en: "Magazine Interview",
    desc: "당신의 일상, 고민, 그리고 20대라는 시간.\nFLOG는 평범한 하루 안에서 특별한 이야기를 발견합니다.\n우리가 당신의 이야기를 기록하겠습니다.",
    note: "별도의 조건 없이 누구나 신청 가능합니다.",
    cta: "인터뷰 신청",
    href: "mailto:flog.official@gmail.com?subject=매거진 인터뷰 신청",
    external: true,
  },
  {
    index: "02",
    title: "마인드 프로필",
    en: "Mind Profile",
    desc: "나는 어떤 사람인가.\n외면이 아닌 내면을 기록하는 FLOG만의 프로필 촬영.\n심리 기반 질문지와 함께 나를 사진으로 담아냅니다.",
    note: "촬영 진행 일정은 별도 안내됩니다.",
    cta: "자세히 보기",
    href: "/mind-profile",
    external: false,
  },
  {
    index: "03",
    title: "협업 문의",
    en: "Collaboration",
    desc: "브랜드, 공간, 창작자 누구와도 열려 있습니다.\n20대의 감각으로 함께 만들어갈 수 있다면,\nFLOG는 언제든 대화할 준비가 되어 있습니다.",
    note: "문의는 이메일로 받고 있습니다.",
    cta: "문의하기",
    href: "mailto:flog.official@gmail.com?subject=협업 문의",
    external: true,
  },
];

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
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-8">
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
              className="py-14 grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-6 md:gap-12 items-start"
            >
              {/* Index */}
              <span className="font-sans text-xs tracking-[0.4em] text-foreground/25 mt-1">
                {item.index}
              </span>

              {/* Content */}
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

              {/* CTA */}
              <div className="md:pt-10">
                {item.external ? (
                  <a
                    href={item.href}
                    className="inline-flex items-center font-sans text-[9px] tracking-[0.4em] uppercase border border-foreground/20 px-6 py-3 hover:bg-foreground hover:text-background transition-colors whitespace-nowrap"
                  >
                    {item.cta}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex items-center font-sans text-[9px] tracking-[0.4em] uppercase border border-foreground/20 px-6 py-3 hover:bg-foreground hover:text-background transition-colors whitespace-nowrap"
                  >
                    {item.cta}
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

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
          <p className="font-sans font-light text-foreground/35 text-xs">
            20대의 기록을 꽃을 보듯 바라보다
          </p>
        </motion.div>

      </div>
    </div>
  );
}
