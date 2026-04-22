import { motion } from "framer-motion";
import mag1 from "@/assets/images/magazine_1.jpg";
import mag2 from "@/assets/images/magazine_2.jpg";
import mag3 from "@/assets/images/magazine_3.jpg";

const issues = [
  {
    id: "03",
    title: "여름의 잔상",
    date: "2024 Summer",
    image: mag1,
    desc: "뜨겁고 찬란했던, 그래서 더 아쉬운 우리의 계절에 대하여."
  },
  {
    id: "02",
    title: "새벽 두 시",
    date: "2024 Spring",
    image: mag2,
    desc: "가장 깊은 밤, 홀로 깨어있는 시간 속 요동치는 마음들."
  },
  {
    id: "01",
    title: "첫 만남",
    date: "2023 Winter",
    image: mag3,
    desc: "우리가 처음 마주한 순간, 서툴지만 솔직했던 기록의 시작."
  }
];

export default function Magazine() {
  return (
    <div className="bg-[#fbfaf6] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-24 md:w-1/2"
        >
          <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">Archive</span>
          <h1 className="font-serif text-5xl mt-4 mb-6">Magazine</h1>
          <p className="font-sans font-light text-foreground/70 leading-relaxed">
            종이 위에 활자로 새긴 우리의 일상. 20대의 고민, 사랑, 그리고 라이프스타일을 진솔하게 담아냅니다.
          </p>
        </motion.div>

        <div className="space-y-32">
          {issues.map((issue, idx) => (
            <motion.div 
              key={issue.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center`}
            >
              <div className="w-full md:w-1/2 aspect-[4/5] bg-muted relative overflow-hidden group">
                <img src={issue.image} alt={issue.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-[1.5s]" />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <span className="font-sans text-xs tracking-widest uppercase text-primary border-b border-primary/30 pb-1">Issue {issue.id}</span>
                <h2 className="font-serif text-3xl md:text-4xl">{issue.title}</h2>
                <p className="font-sans font-light text-xs tracking-widest text-muted-foreground">{issue.date}</p>
                <p className="font-sans font-light leading-relaxed text-foreground/80 max-w-sm pt-4">
                  {issue.desc}
                </p>
                <div className="pt-8">
                  <button className="font-sans text-xs tracking-widest uppercase border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
