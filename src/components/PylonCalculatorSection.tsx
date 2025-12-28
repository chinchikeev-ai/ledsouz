import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Slider } from '@/components/ui/slider';

const AnimatedCounter = ({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display tabular-nums">
      {prefix}{displayValue.toLocaleString('ru-RU')}{suffix}
    </span>
  );
};

const PylonCalculatorSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [reach, setReach] = useState([500000]);
  const [budget, setBudget] = useState([300000]);
  const [days, setDays] = useState([7]);

  const calculatePrice = () => {
    const basePrice = reach[0] * 0.02 + days[0] * 15000;
    return Math.max(budget[0], Math.round(basePrice / 1000) * 1000);
  };

  const calculateCPM = () => {
    return ((calculatePrice() / reach[0]) * 1000).toFixed(2);
  };

  return (
    <section ref={sectionRef} className="section-snap relative flex items-center justify-center overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-magenta/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Pylon Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 100, scaleY: 0 }}
            animate={isInView ? { opacity: 1, y: 0, scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative flex justify-center origin-bottom"
          >
            {/* Pylon Structure */}
            <div className="relative">
              {/* Main Screen */}
              <div className="w-48 md:w-64 h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative neon-border box-glow-cyan">
                {/* Animated Content */}
                <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/20 via-neon-magenta/20 to-neon-blue/20">
                  <motion.div
                    animate={{ 
                      background: [
                        'linear-gradient(180deg, hsl(185 100% 50% / 0.3), hsl(300 100% 50% / 0.3))',
                        'linear-gradient(180deg, hsl(300 100% 50% / 0.3), hsl(225 90% 60% / 0.3))',
                        'linear-gradient(180deg, hsl(225 90% 60% / 0.3), hsl(185 100% 50% / 0.3))'
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0"
                  />
                </div>

                {/* Screen Content */}
                <div className="absolute inset-4 flex flex-col items-center justify-center text-center">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4"
                  >
                    LED ПИЛОН
                  </motion.div>
                  <div className="text-sm text-muted-foreground">Premium Indoor</div>
                  
                  {/* Animated Bars */}
                  <div className="flex gap-2 mt-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [20, 60, 40, 80, 30] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-3 bg-neon-cyan rounded-full"
                      />
                    ))}
                  </div>
                </div>

                {/* Scan Lines Effect */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
                  }}
                />
              </div>

              {/* Base */}
              <div className="w-32 md:w-40 h-8 mx-auto bg-gradient-to-t from-muted to-card rounded-b-lg" />
              
              {/* Ground Glow */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 h-16 bg-neon-cyan/20 blur-2xl rounded-full" />
            </div>
          </motion.div>

          {/* Calculator Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card rounded-2xl p-8 neon-border"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-foreground">
              Сколько стоит захватить
            </h2>
            <p className="text-neon-cyan text-glow-cyan font-display text-2xl mb-8">
              ТЦ на неделю?
            </p>

            {/* Sliders */}
            <div className="space-y-8">
              {/* Reach Slider */}
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <label className="text-muted-foreground text-sm uppercase tracking-wider">Охват аудитории</label>
                  <span className="text-3xl font-display font-bold text-foreground">
                    <AnimatedCounter value={reach[0]} suffix=" чел" />
                  </span>
                </div>
                <Slider
                  value={reach}
                  onValueChange={setReach}
                  min={100000}
                  max={5000000}
                  step={50000}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>100K</span>
                  <span>5M</span>
                </div>
              </div>

              {/* Budget Slider */}
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <label className="text-muted-foreground text-sm uppercase tracking-wider">Бюджет</label>
                  <span className="text-3xl font-display font-bold text-neon-orange text-glow-orange">
                    <AnimatedCounter value={budget[0]} suffix=" ₽" />
                  </span>
                </div>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  min={50000}
                  max={2000000}
                  step={10000}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>50K ₽</span>
                  <span>2M ₽</span>
                </div>
              </div>

              {/* Days Slider */}
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <label className="text-muted-foreground text-sm uppercase tracking-wider">Количество дней</label>
                  <span className="text-3xl font-display font-bold text-neon-magenta text-glow-magenta">
                    <AnimatedCounter value={days[0]} suffix=" дн" />
                  </span>
                </div>
                <Slider
                  value={days}
                  onValueChange={setDays}
                  min={1}
                  max={30}
                  step={1}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1 день</span>
                  <span>30 дней</span>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="mt-8 p-6 rounded-xl bg-muted/50 border border-border">
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground">CPM (стоимость за 1000 показов)</span>
                <span className="font-display text-xl text-neon-cyan">{calculateCPM()} ₽</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Итого</span>
                <span className="font-display text-3xl font-bold text-foreground">
                  {calculatePrice().toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>

            {/* CTA */}
            <button className="w-full mt-6 px-8 py-5 bg-neon-orange text-background font-display font-bold text-lg rounded-xl animate-pulse-glow transition-all duration-300 hover:scale-[1.02]">
              Посчитать → получить счёт
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PylonCalculatorSection;
