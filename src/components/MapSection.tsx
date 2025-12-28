import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface City {
  id: string;
  name: string;
  malls: number;
  x: number;
  y: number;
}

const cities: City[] = [
  { id: 'tum', name: 'Тюмень', malls: 28, x: 20, y: 35 },
  { id: 'tsk', name: 'Томск', malls: 22, x: 50, y: 32 },
  { id: 'nsk', name: 'Новосибирск', malls: 45, x: 42, y: 45 },
  { id: 'kem', name: 'Кемерово', malls: 26, x: 55, y: 48 },
  { id: 'krs', name: 'Красноярск', malls: 35, x: 75, y: 38 },
];

const MapSection = () => {
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="section-snap relative flex items-center justify-center overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-blue/5 via-transparent to-transparent" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--neon-magenta) / 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--neon-cyan) / 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">Сеть </span>
            <span className="gradient-text text-glow-cyan">156 пилонов</span>
          </h2>
          <p className="text-2xl md:text-3xl text-muted-foreground font-display">
            в торговых центрах Сибири
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-full max-w-5xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden glass-card neon-border"
        >
          {/* Russia Map SVG */}
          <svg
            viewBox="0 0 100 70"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 0 20px hsl(185 100% 50% / 0.2))' }}
          >
            {/* Siberian Region Outline */}
            <path
              d="M10,20 Q15,15 30,18 L45,20 Q55,18 65,22 L80,25 Q90,28 95,32 L92,45 Q88,55 75,52 L60,50 Q50,55 40,52 L25,48 Q15,50 10,45 L8,35 Q5,28 10,20"
              fill="none"
              stroke="hsl(var(--neon-cyan))"
              strokeWidth="0.4"
              strokeOpacity="0.6"
            />

            {/* Glowing region fill */}
            <path
              d="M10,20 Q15,15 30,18 L45,20 Q55,18 65,22 L80,25 Q90,28 95,32 L92,45 Q88,55 75,52 L60,50 Q50,55 40,52 L25,48 Q15,50 10,45 L8,35 Q5,28 10,20"
              fill="url(#mapGradient)"
              fillOpacity="0.15"
            />

            {/* Connection Lines */}
            {cities.slice(0, 5).map((city, i) => 
              cities.slice(i + 1, 6).map((otherCity) => (
                <motion.line
                  key={`${city.id}-${otherCity.id}`}
                  x1={city.x}
                  y1={city.y}
                  x2={otherCity.x}
                  y2={otherCity.y}
                  stroke="hsl(var(--neon-magenta))"
                  strokeWidth="0.15"
                  strokeOpacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
                />
              ))
            )}

            {/* City Points */}
            {cities.map((city, index) => (
              <g key={city.id}>
                {/* Outer Pulse Ring */}
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r="2"
                  fill="none"
                  stroke="hsl(var(--neon-cyan))"
                  strokeWidth="0.3"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { 
                    scale: [1, 2, 1], 
                    opacity: [0.5, 0, 0.5] 
                  } : {}}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: index * 0.2 
                  }}
                />

                {/* Main Dot */}
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r="1"
                  fill={hoveredCity?.id === city.id ? "hsl(var(--neon-magenta))" : "hsl(var(--neon-cyan))"}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  style={{ 
                    cursor: 'pointer',
                    filter: hoveredCity?.id === city.id 
                      ? 'drop-shadow(0 0 8px hsl(300 100% 50%))' 
                      : 'drop-shadow(0 0 5px hsl(185 100% 50%))'
                  }}
                  onMouseEnter={() => setHoveredCity(city)}
                  onMouseLeave={() => setHoveredCity(null)}
                />

                {/* Inner Glow */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="0.5"
                  fill="white"
                  fillOpacity="0.8"
                />
              </g>
            ))}

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--neon-cyan))" />
                <stop offset="50%" stopColor="hsl(var(--neon-magenta))" />
                <stop offset="100%" stopColor="hsl(var(--neon-blue))" />
              </linearGradient>
            </defs>
          </svg>

          {/* Hover Tooltip */}
          {hoveredCity && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: `${hoveredCity.x}%`,
                top: `${hoveredCity.y - 10}%`,
              }}
            >
              <div className="glass-card px-4 py-2 rounded-lg border border-neon-magenta/50">
                <div className="font-display text-lg font-bold text-foreground">{hoveredCity.name}</div>
                <div className="text-neon-cyan text-sm">{hoveredCity.malls} ТЦ</div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* City Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mt-12"
        >
          {cities.slice(0, 5).map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="glass-card px-4 py-3 rounded-xl border border-border hover:border-neon-cyan/50 transition-colors cursor-pointer"
              onMouseEnter={() => setHoveredCity(city)}
              onMouseLeave={() => setHoveredCity(null)}
            >
              <div className="font-display text-lg font-bold text-foreground">{city.name}</div>
              <div className="text-neon-magenta text-sm">{city.malls} ТЦ</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
