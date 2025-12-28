import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Play, Clock, CheckCircle } from 'lucide-react';

const CounterStat = ({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-6xl font-bold gradient-text text-glow-cyan">
        {suffix === '+' ? '+' : ''}{count}{suffix !== '+' ? suffix : ''}
      </div>
      <div className="text-muted-foreground mt-2 text-sm uppercase tracking-wider">{label}</div>
    </div>
  );
};

const CaseStudy = ({ title, before, after }: { title: string; before: string; after: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="glass-card rounded-xl p-4 border border-border hover:border-neon-cyan/50 transition-all group">
      <div className="flex gap-3">
        {/* Video Preview */}
        <div 
          className="relative w-24 h-16 rounded-lg bg-muted overflow-hidden cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20" />
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-neon-orange/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 text-background ml-0.5" />
              </div>
            </div>
          )}
          {isPlaying && (
            <motion.div
              animate={{ background: ['hsl(185 100% 50% / 0.3)', 'hsl(300 100% 50% / 0.3)', 'hsl(185 100% 50% / 0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0"
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="text-sm font-medium text-foreground mb-1">{title}</div>
          <div className="flex gap-4 text-xs">
            <span className="text-muted-foreground">До: <span className="text-destructive">{before}</span></span>
            <span className="text-muted-foreground">После: <span className="text-neon-cyan">{after}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CountdownTimer = () => {
  const [time, setTime] = useState({ hours: 5, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-2 font-display text-2xl font-bold">
      <span className="bg-muted px-3 py-2 rounded-lg text-neon-orange">{String(time.hours).padStart(2, '0')}</span>
      <span className="text-muted-foreground">:</span>
      <span className="bg-muted px-3 py-2 rounded-lg text-neon-orange">{String(time.minutes).padStart(2, '0')}</span>
      <span className="text-muted-foreground">:</span>
      <span className="bg-muted px-3 py-2 rounded-lg text-neon-orange">{String(time.seconds).padStart(2, '0')}</span>
    </div>
  );
};

const FinalCTASection = () => {
  const [inn, setInn] = useState('');
  const [email, setEmail] = useState('');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="section-snap relative flex items-center justify-center overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-neon-orange/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-magenta/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Stats & Cases */}
          <div>
            {/* Counters */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-3 gap-4 mb-12"
            >
              <CounterStat value={5} label="Городов" />
              <CounterStat value={156} label="LED пилонов" />
              <CounterStat value={2025} label="год запуска" />
            </motion.div>

            {/* Case Studies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-cyan" />
                Мини-кейсы
              </h3>
              <div className="space-y-4">
                <CaseStudy 
                  title="Сеть фитнес-клубов" 
                  before="0.8% CTR" 
                  after="4.2% CTR"
                />
                <CaseStudy 
                  title="Премиум автодилер" 
                  before="12 лидов/мес" 
                  after="89 лидов/мес"
                />
                <CaseStudy 
                  title="Ресторанный холдинг" 
                  before="–20% трафик" 
                  after="+180% трафик"
                />
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card rounded-2xl p-8 neon-border relative overflow-hidden"
          >
            {/* Urgency Banner */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-neon-orange/20 via-neon-orange/30 to-neon-orange/20 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neon-orange" />
                <span className="text-sm font-medium text-foreground">Акция до конца дня</span>
              </div>
              <CountdownTimer />
            </div>

            <div className="pt-16">
              <h3 className="font-display text-3xl font-bold text-foreground mb-2">
                Получите счёт за час
              </h3>
              <p className="text-muted-foreground mb-6">
                Оставьте заявку и получите персональный расчёт кампании
              </p>

              {/* Slots Warning */}
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3 mb-6 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                <span className="text-sm text-foreground">
                  Осталось <span className="font-bold text-destructive">7 слотов</span> на январь
                </span>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">ИНН компании</label>
                  <Input
                    type="text"
                    placeholder="Введите ИНН для автозаполнения"
                    value={inn}
                    onChange={(e) => setInn(e.target.value)}
                    className="bg-muted border-border text-foreground placeholder:text-muted-foreground h-14 text-lg font-display"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="Ваш email для отправки счёта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-muted border-border text-foreground placeholder:text-muted-foreground h-14 text-lg font-display"
                  />
                </div>

                <button className="w-full mt-4 px-8 py-5 bg-neon-orange text-background font-display font-bold text-lg rounded-xl animate-pulse-glow transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3">
                  <span>Получить счёт за час</span>
                  <CheckCircle className="w-5 h-5" />
                </button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-border">
                {['ISO 27001', 'GDPR', '256-bit SSL'].map((badge) => (
                  <div key={badge} className="text-xs text-muted-foreground flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-neon-cyan" />
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-border"
        >
          <div className="font-display text-2xl font-bold gradient-text mb-4">LEDСОЮЗ</div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-4">
            <a href="tel:+73832995070" className="hover:text-neon-cyan transition-colors">+7 383 299-50-70</a>
            <a href="mailto:ska@ledcloud.ru" className="hover:text-neon-cyan transition-colors">ska@ledcloud.ru</a>
            <a href="https://ledcloud.ru" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-colors">ledcloud.ru</a>
          </div>
          <div className="flex justify-center gap-4 mb-6">
            <a href="#" className="glass-card px-4 py-2 rounded-lg border border-border hover:border-neon-cyan/50 transition-colors text-sm text-foreground">
              Telegram
            </a>
            <a href="#" className="glass-card px-4 py-2 rounded-lg border border-border hover:border-neon-cyan/50 transition-colors text-sm text-foreground">
              WhatsApp
            </a>
            <a href="#" className="glass-card px-4 py-2 rounded-lg border border-border hover:border-neon-cyan/50 transition-colors text-sm text-foreground">
              MAX
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2025 LEDСОЮЗ — INDOOR LED-реклама в торговых центрах Сибири
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
