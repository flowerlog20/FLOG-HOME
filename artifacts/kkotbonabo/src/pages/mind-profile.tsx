import { motion } from "framer-motion";
import prof1 from "@/assets/images/profile_1.jpg";
import prof2 from "@/assets/images/profile_2.jpg";
import prof3 from "@/assets/images/profile_3.jpg";

export default function MindProfile() {
  const images = [
    { src: prof1, span: "col-span-1 md:col-span-2", aspect: "aspect-[16/9]" },
    { src: prof2, span: "col-span-1", aspect: "aspect-[3/4]" },
    { src: prof3, span: "col-span-1 md:col-span-3", aspect: "aspect-[21/9]" },
  ];

  return (
    <div className="bg-[#1a1a1a] text-[#fbfaf6] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-24 max-w-2xl mx-auto space-y-6"
        >
          <span className="font-sans text-xs tracking-widest uppercase text-white/50">Photography</span>
          <h1 className="font-serif text-4xl md:text-5xl">마인드 프로필</h1>
          <p className="font-sans font-light text-white/70 leading-relaxed pt-4">
            가장 나다운 순간, 꾸미지 않은 감정의 편린들을 필름 위에 붙잡아둡니다.<br/>
            누구에게나 자신만의 고유한 빛이 있음을 기록합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className={`${img.span} ${img.aspect} relative overflow-hidden group cursor-pointer`}
            >
              <img 
                src={img.src} 
                alt="Mind Profile Portrait" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-[2s] ease-out" 
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span className="font-serif text-white italic tracking-widest">View Portrait</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
