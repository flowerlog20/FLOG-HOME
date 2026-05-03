import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import prof1 from "@/assets/images/profile_1.jpg";
import prof2 from "@/assets/images/profile_2.jpg";
import prof3 from "@/assets/images/profile_3.jpg";
import { getMindProfileDataFromDB, DEFAULT_MIND_PROFILE, type MindProfileData } from "@/lib/magazine-store";

const FALLBACKS = [prof1, prof2, prof3];

const LAYOUTS = [
  { span: "col-span-1 md:col-span-2", aspect: "aspect-[16/9]" },
  { span: "col-span-1", aspect: "aspect-[3/4]" },
  { span: "col-span-1 md:col-span-3", aspect: "aspect-[21/9]" },
];

export default function MindProfile() {
  const [data, setData] = useState<MindProfileData>(DEFAULT_MIND_PROFILE);

  useEffect(() => {
    getMindProfileDataFromDB().then(setData);
  }, []);

  const images = LAYOUTS.map((layout, i) => ({
    ...layout,
    src: data.images?.[i] || FALLBACKS[i],
  }));

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
          <p className="font-sans font-light text-white/70 leading-relaxed pt-4 whitespace-pre-line">
            {data.subtitle}
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
