import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroImg from "@/assets/images/hero.jpg";
import { getAboutDataFromDB, DEFAULT_ABOUT, type AboutData } from "@/lib/magazine-store";

export default function About() {
  const [about, setAbout] = useState<AboutData>(DEFAULT_ABOUT);

  useEffect(() => {
    getAboutDataFromDB().then(setAbout);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8 text-center"
        >
          <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">About Us</span>
          <h1 className="font-serif text-4xl md:text-6xl">FLOWER LOG</h1>
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
              <p>{about.story}</p>
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
            {about.whatWeDo.map((item, i) => (
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
