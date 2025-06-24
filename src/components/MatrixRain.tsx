import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  intensity?: 'subtle' | 'intense';
  className?: string;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ intensity = 'subtle', className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match parent container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      
      if (parent) {
        // Get parent dimensions
        const rect = parent.getBoundingClientRect();
        const displayWidth = rect.width;
        const displayHeight = rect.height;
        
        // Set canvas size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        
        console.log('Canvas resized to parent:', displayWidth, 'x', displayHeight);
        
        // Recalculate columns for the new width
        return { displayWidth, displayHeight };
      } else {
        // Fallback to window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        return { displayWidth: window.innerWidth, displayHeight: window.innerHeight };
      }
    };
    
    // Handle resize events
    const handleResize = () => {
      const newDimensions = resizeCanvas();
      displayWidth = newDimensions.displayWidth;
      displayHeight = newDimensions.displayHeight;
      columns = Math.floor(displayWidth / (fontSize * 2.5)); // Match wider spacing
      
      // Clear and reinitialize arrays
      drops.length = 0;
      speeds.length = 0;
      glitchTimers.length = 0;
      glitchActive.length = 0;
      glitchPhraseIndex.length = 0;
      
      initializeDrops();
      console.log('Resized: Creating', columns, 'columns for width', displayWidth);
    };
    
    window.addEventListener('resize', handleResize);

    // Matrix characters for background effect
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    // Special readable phrases for glitch effects
    const glitchPhrases = [
      'LLM', 'AI AGENTS', 'VIBE CODE', 'NEURAL NET', 'DEEP LEARN', 'BLOCKCHAIN', 'METAVERSE',
      'QUANTUM', 'CRYPTO', 'NFT DROP', 'WEB3', 'DEFI', 'SMART CONTRACT', 'TOKENIZE',
      'REBELZ AI', 'MINDSTACK', 'CODE WEAR', 'TECH FASHION', 'CYBER STYLE', 'DIGITAL DRIP',
      'HYPE BEAST', 'STREET TECH', 'URBAN CODE', 'FUTURE WEAR', 'GLITCH MODE', 'MATRIX FLOW',
      'DEPLOY', 'EXECUTE', 'COMPILE', 'DEBUG', 'ITERATE', 'REFACTOR', 'OPTIMIZE', 'SCALE',
      'FRESH FIT', 'CLEAN CODE', 'FIRE BRAND', 'SICK STYLE', 'DOPE TECH', 'NEXT LEVEL'
    ];
    
    const fontSize = intensity === 'subtle' ? 14 : 18;
    
    // Get initial dimensions
    let { displayWidth, displayHeight } = resizeCanvas();
    let columns = Math.floor(displayWidth / (fontSize * 2.5)); // Much wider spacing
    
    console.log('Creating', columns, 'columns for width', displayWidth);
    
    const drops: number[] = [];
    const speeds: number[] = [];
    const glitchTimers: number[] = [];
    const glitchActive: boolean[] = [];
    const glitchPhraseIndex: number[] = [];

    // Initialize drops with random properties - even slower speeds
    const initializeDrops = () => {
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -displayHeight;
        speeds[i] = intensity === 'subtle' ? 0.3 + Math.random() * 0.3 : 0.5 + Math.random() * 0.5; // Slower
        glitchTimers[i] = Math.random() * 500 + 300; // Longer time between glitches
        glitchActive[i] = false;
        glitchPhraseIndex[i] = Math.floor(Math.random() * glitchPhrases.length);
      }
    };
    
    initializeDrops();

    const draw = () => {
      // More visible trail effect
      ctx.fillStyle = intensity === 'subtle' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      for (let i = 0; i < drops.length; i++) {
        const x = i * (fontSize * 2.5); // Match the wider column spacing
        const y = drops[i];
        
        // Update glitch timer
        glitchTimers[i]--;
        if (glitchTimers[i] <= 0) {
          glitchActive[i] = !glitchActive[i];
          if (glitchActive[i]) {
            glitchTimers[i] = 120; // Exactly 2 seconds at 60fps (120 frames)
            glitchPhraseIndex[i] = Math.floor(Math.random() * glitchPhrases.length);
          } else {
            glitchTimers[i] = 300 + Math.random() * 500; // Longer time until next glitch
          }
        }

        if (glitchActive[i]) {
          // Draw readable glitch phrase
          const phrase = glitchPhrases[glitchPhraseIndex[i]];
          for (let j = 0; j < phrase.length; j++) {
            const char = phrase[j];
            const charY = y + (j * fontSize * 1.3);
            
            if (charY < -fontSize || charY > displayHeight + fontSize) continue;

            // Bright green text for glitch
            ctx.fillStyle = '#00FF00'; // Bright green
            ctx.shadowColor = '#00FF00';
            ctx.shadowBlur = 20;
            ctx.font = `bold ${fontSize + 2}px 'Orbitron', monospace`; // Slightly larger
            ctx.fillText(char, x, charY);
            
            // Add subtle glitch distortion effect
            if (Math.random() < 0.2) {
              ctx.fillStyle = '#00DD00'; // Slightly darker green glitch
              ctx.fillText(char, x + 1, charY + 1);
            }
            
            ctx.shadowBlur = 0;
          }
        } else {
          // Draw normal matrix characters
          const streamLength = 15 + Math.random() * 10;
          for (let j = 0; j < streamLength; j++) {
            const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            const charY = y + (j * fontSize * 1.1);
            
            if (charY < -fontSize || charY > displayHeight + fontSize) continue;

            // Create fading effect from top to bottom
            const fadePosition = j / streamLength;
            const alpha = Math.max(0.1, 1 - fadePosition);
            
            // Orange matrix characters
            if (intensity === 'intense') {
              ctx.fillStyle = `rgba(255, 127, 80, ${alpha * 0.9})`;
              ctx.shadowColor = '#FF7F50';
              ctx.shadowBlur = 5;
            } else {
              ctx.fillStyle = `rgba(255, 127, 80, ${alpha * 0.6})`;
              ctx.shadowColor = '#FF7F50';
              ctx.shadowBlur = 2;
            }

            ctx.font = `${fontSize}px 'Courier New', monospace`;
            ctx.fillText(char, x, charY);
            ctx.shadowBlur = 0;
          }
        }

        // Move drop down
        drops[i] += speeds[i];

        // Reset drop to top when it goes off screen
        if (y > displayHeight + 200) {
          drops[i] = Math.random() * -300;
          speeds[i] = intensity === 'subtle' ? 0.3 + Math.random() * 0.3 : 0.5 + Math.random() * 0.5; // Match slower speeds
          glitchActive[i] = false;
          glitchTimers[i] = Math.random() * 500 + 300;
        }
      }
    };

    const interval = setInterval(draw, intensity === 'subtle' ? 100 : 80); // Even slower, more spaced out

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ 
        background: 'transparent',
        display: 'block',
        zIndex: 1
      }}
    />
  );
};

export default MatrixRain;