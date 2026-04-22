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
          <h1 className="font-serif text-4xl md:text-6xl">꽃을 보듯 나를 보다</h1>
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
                FLOG(꽃보나보)는 20대의 젊음을 기록으로 남기는 활동을 하고 있는 비영리단체입니다. 주된 활동으로는 20대 라이프 매거진 발간, 마인드 프로필 등 현대를 살아가는 20대의 라이프스타일과 내면을 기록으로 남기는 활동을 진행하고 있습니다.
              </p>
              <p>
                "꽃을 보듯 나를 보다"의 이름처럼 20대를 살아가는 모두가 스스로 꽃임을 깨닫기를 바라고, 먼 훗날 우리의 젊은 시절을 추억할 수 있는 20대 기록 저장소가 되겠습니다.
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
            className="text-center space-y-16"
          >
            <h2 className="font-serif text-3xl">Team FLOG</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { role: "Editor in Chief", desc: "기록의 방향을 잡고 이야기를 엮어냅니다." },
                { role: "Visual Director", desc: "빛과 그림자로 우리의 온도를 담습니다." },
                { role: "Community Manager", desc: "사람과 사람, 그리고 마음을 연결합니다." }
              ].map((member, i) => (
                <div key={i} className="space-y-4">
                  <h3 className="font-sans text-sm tracking-widest uppercase">{member.role}</h3>
                  <p className="font-sans font-light text-muted-foreground text-sm leading-relaxed">{member.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
