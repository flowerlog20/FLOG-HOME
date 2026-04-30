import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Join() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 flex flex-col justify-center">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          <div>
            <h1 className="font-serif text-5xl md:text-7xl mb-6">Join Us</h1>
            <p className="font-sans font-light text-foreground/70 text-lg max-w-xl leading-relaxed">
              우리의 계절을 함께 기록할 분들을 기다립니다. 당신의 시선으로 담아낼 20대는 어떤 모습인가요?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-border">
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl">매거진 인터뷰</h3>
                <p className="font-sans font-light text-sm text-muted-foreground leading-relaxed">일상의 사소한 조각들을 기록으로 남기다.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl">마인드 프로필</h3>
                <p className="font-sans font-light text-sm text-muted-foreground leading-relaxed">나의 내면을 기록으로 남기다.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl">협업 문의</h3>
                <p className="font-sans font-light text-sm text-muted-foreground leading-relaxed">FLOG와 함께 20대 기록 활동에 동참하실 분을 기다립니다.</p>
              </div>
            </div>

            <div className="bg-secondary/30 p-8 md:p-12 flex flex-col justify-center space-y-8">
              <h2 className="font-serif text-3xl">지원하기</h2>
              <p className="font-sans font-light text-sm leading-relaxed">
                현재 4기 에디터 및 포토그래퍼 모집을 진행하고 있습니다. 아래 폼을 통해 간단한 자기소개와 포트폴리오를 남겨주시면, 검토 후 연락드리겠습니다.
              </p>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="font-sans text-xs tracking-widest uppercase">이름</label>
                  <input type="text" className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-foreground transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-xs tracking-widest uppercase">연락처 / 이메일</label>
                  <input type="text" className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-foreground transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-xs tracking-widest uppercase">지원 분야</label>
                  <select className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-foreground transition-colors appearance-none">
                    <option>에디터</option>
                    <option>포토그래퍼</option>
                    <option>프로필 모델</option>
                  </select>
                </div>
                <button className="w-full bg-foreground text-background py-4 font-sans text-xs tracking-widest uppercase hover:bg-primary transition-colors mt-4">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
