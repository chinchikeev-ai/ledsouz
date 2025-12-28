import { motion } from 'framer-motion';
import heroVideo from '@/assets/hero-mall-video.mp4';

const HeroSection = () => {
  return (
    <section className="section-snap relative flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/95" />
      
      {/* Neon Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--neon-cyan) / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--neon-cyan) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-card neon-border"
          >
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-cyan" />
            <span className="text-sm font-medium text-neon-cyan tracking-wider uppercase">
              Indoor LED-реклама
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-foreground">Ваша реклама</span>
            <br />
            <span className="gradient-text text-glow-cyan">в сердце каждого ТЦ</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-light"
          >
            INDOOR LED-экраны и цифровые пилоны — максимальный контакт с платёжеспособной аудиторией
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <button className="relative group px-10 py-5 bg-neon-orange text-background font-display font-bold text-lg rounded-lg animate-pulse-glow transition-all duration-300 hover:scale-105">
              <span className="relative z-10">Рассчитать кампанию за 60 сек</span>
              <div className="absolute inset-0 rounded-lg bg-neon-orange opacity-50 blur-xl group-hover:opacity-70 transition-opacity" />
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16"
          >
            {[
              { value: '87+', label: 'ТЦ в сети' },
              { value: '240+', label: 'Пилонов' },
              { value: '50M+', label: 'Охват/мес' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-neon-cyan text-glow-cyan">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Скролл</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-neon-cyan/50 flex items-start justify-center p-1"
          >
            <div className="w-1.5 h-3 rounded-full bg-neon-cyan" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
