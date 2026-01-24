import { motion } from 'motion/react';

export function LightningEffect() {
  const randomX = Math.random() * 100;
  
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.6, 0.3, 0] }}
        transition={{ duration: 0.6, times: [0, 0.1, 0.3, 0.5, 1] }}
        className="absolute inset-0 bg-amber-100"
      />
      
      {/* Lightning Bolt */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ 
          opacity: [0, 1, 0.8, 0],
          scaleY: [0, 1, 1, 1]
        }}
        transition={{ duration: 0.4, times: [0, 0.1, 0.3, 1] }}
        className="absolute top-0 w-1 h-full origin-top"
        style={{
          left: `${randomX}%`,
          background: 'linear-gradient(to bottom, #fbbf24, #f59e0b, transparent)',
          boxShadow: '0 0 20px #fbbf24, 0 0 40px #f59e0b',
          filter: 'blur(1px)',
        }}
      />
      
      {/* Secondary Branch */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ 
          opacity: [0, 0.8, 0],
          scaleX: [0, 1, 1]
        }}
        transition={{ duration: 0.3, delay: 0.1, times: [0, 0.3, 1] }}
        className="absolute h-1 w-32 origin-left"
        style={{
          left: `${randomX}%`,
          top: '30%',
          background: 'linear-gradient(to right, #fbbf24, transparent)',
          boxShadow: '0 0 15px #fbbf24',
          filter: 'blur(1px)',
          transform: 'rotate(25deg)',
        }}
      />
    </div>
  );
}
