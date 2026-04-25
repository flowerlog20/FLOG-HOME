import { motion } from "framer-motion";
import heroImg from "@/assets/images/hero.jpg";

export default function About() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8 text-center"
        >
          <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">About Us</span>
          <h1 className="font-sans font-light text-4xl md:text-6xl tracking-[0.15em]">FLOWER LOG</h1>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="aspect-[3/4] bg-muted relative overflow-hidden">
              <img src={heroImg} alt="Kkotbonabo Philosophy" className="object-cover w-full h-full grayscale-[30%] hover:scale-105 transition-transform duration-1000" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="font-serif text-3xl">우리의 이야기</h2>
            <div className="space-y-6 font-sans font-light leading-loose text-foreground/80">
              <p>
                우리는 20대를 기록합니다. 가장 젊은 날의 고민, 관계, 라이프스타일 그리고 내면의 목소리까지. 불안과 설렘, 성장의 모든 결을 담아, 먼 훗날 당신이 꺼내볼 수 있는 기억의 서랍이 되겠습니다.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-32 pt-24 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-4 mb-16"
          >
            <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">What We Do</span>
            <h2 className="font-serif text-3xl md:text-4xl">FLOG가 하는 일</h2>
          </motion.div>

          <div className="divide-y divide-border">
            {[
              {
                num: "01",
                title: "매거진",
                en: "Magazine",
                desc: "현대를 살아가는 20대의 라이프스타일과 내면을 활자로 기록합니다. 계절마다 새로운 이야기를 엮어 종이 위에 청춘을 새깁니다."
              },
              {
                num: "02",
                title: "마인드 프로필",
                en: "Mind Profile",
                desc: "외면이 아닌 내면을 담는 사진. 지금 이 순간 당신이 느끼는 감정과 가장 솔직한 모습을 기록으로 남깁니다."
              },
              {
                num: "03",
                title: "아카이브",
                en: "Archive",
                desc: "우리가 함께 쌓아가는 청춘의 기록 저장소. 훗날 꺼내볼 수 있도록, 오늘의 우리를 차곡차곡 보존합니다."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="py-10 grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-6 md:gap-12 items-start group"
              >
                <span className="font-sans text-xs tracking-widest text-foreground/25">{item.num}</span>
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl md:text-3xl">{item.title}</h3>
                  <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-foreground/35">{item.en}</span>
                </div>
                <p className="font-sans font-light text-foreground/65 leading-loose text-sm md:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
