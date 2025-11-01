'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);

  const steps = [
    {
      title: "🌞 Matahari Bersinar",
      text: "Matahari yang hangat membuat air di laut, sungai, dan danau menguap ke langit!",
      emoji: "🌊➡️☁️"
    },
    {
      title: "☁️ Awan Terbentuk",
      text: "Uap air naik ke atas dan bertemu udara dingin, lalu berubah menjadi awan putih!",
      emoji: "💨☁️☁️"
    },
    {
      title: "⚡ Awan Semakin Besar",
      text: "Awan mengumpulkan lebih banyak uap air, warnanya jadi gelap dan berat!",
      emoji: "🌫️⛈️"
    },
    {
      title: "🌧️ Hujan Turun!",
      text: "Awan sudah terlalu berat! Tetesan air jatuh ke bumi sebagai hujan. Yay!",
      emoji: "💧💧💧"
    }
  ];

  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => {
        setAnimating(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [animating]);

  const nextStep = () => {
    if (step < steps.length - 1) {
      setAnimating(true);
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setAnimating(true);
      setTimeout(() => setStep(step - 1), 300);
    }
  };

  const reset = () => {
    setAnimating(true);
    setTimeout(() => setStep(0), 300);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.mainTitle}>🌈 Bagaimana Hujan Terjadi? 🌈</h1>
        <p style={styles.subtitle}>Ayo belajar bersama!</p>
      </div>

      <div style={{
        ...styles.card,
        transform: animating ? 'scale(0.95)' : 'scale(1)',
        opacity: animating ? 0.7 : 1,
        transition: 'all 0.3s ease'
      }}>
        <div style={styles.stepIndicator}>
          Langkah {step + 1} dari {steps.length}
        </div>

        <div style={styles.emojiContainer}>
          <span style={styles.bigEmoji}>{steps[step].emoji}</span>
        </div>

        <h2 style={styles.stepTitle}>{steps[step].title}</h2>
        <p style={styles.stepText}>{steps[step].text}</p>

        <div style={styles.progressBar}>
          {steps.map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.progressDot,
                backgroundColor: index <= step ? '#4CAF50' : '#ddd',
                transform: index === step ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <button
          onClick={prevStep}
          disabled={step === 0}
          style={{
            ...styles.button,
            ...styles.buttonPrev,
            opacity: step === 0 ? 0.5 : 1,
            cursor: step === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          ⬅️ Sebelumnya
        </button>

        {step === steps.length - 1 ? (
          <button onClick={reset} style={{...styles.button, ...styles.buttonNext}}>
            🔄 Ulangi Lagi
          </button>
        ) : (
          <button onClick={nextStep} style={{...styles.button, ...styles.buttonNext}}>
            Selanjutnya ➡️
          </button>
        )}
      </div>

      <div style={styles.visualDemo}>
        <div style={styles.scene}>
          {/* Sun */}
          <div style={{
            ...styles.sun,
            opacity: step === 0 ? 1 : 0.3,
            transform: step === 0 ? 'scale(1.2)' : 'scale(1)'
          }}>☀️</div>

          {/* Water */}
          <div style={{
            ...styles.water,
            animation: step === 0 ? 'wave 2s infinite' : 'none'
          }}>🌊</div>

          {/* Vapor */}
          {step >= 1 && (
            <div style={styles.vapor}>
              <span style={{...styles.vaporParticle, animationDelay: '0s'}}>💨</span>
              <span style={{...styles.vaporParticle, animationDelay: '0.5s'}}>💨</span>
              <span style={{...styles.vaporParticle, animationDelay: '1s'}}>💨</span>
            </div>
          )}

          {/* Clouds */}
          {step >= 1 && (
            <div style={styles.cloudContainer}>
              <span style={{
                ...styles.cloud,
                fontSize: step === 1 ? '3rem' : step === 2 ? '4rem' : '5rem',
                filter: step === 3 ? 'brightness(0.6)' : 'brightness(1)'
              }}>☁️</span>
              {step >= 2 && (
                <span style={{
                  ...styles.cloud,
                  left: '60%',
                  animationDelay: '1s'
                }}>☁️</span>
              )}
            </div>
          )}

          {/* Rain */}
          {step === 3 && (
            <div style={styles.rainContainer}>
              {[...Array(15)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    ...styles.raindrop,
                    left: `${10 + i * 6}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                >💧</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes rise {
          0% { transform: translateY(0px); opacity: 1; }
          100% { transform: translateY(-100px); opacity: 0; }
        }

        @keyframes fall {
          0% { transform: translateY(0px); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(300px); opacity: 0; }
        }

        @keyframes wave {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(1.1); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: 'white',
    marginBottom: '30px',
  },
  mainTitle: {
    fontSize: '3rem',
    margin: '10px 0',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontSize: '1.5rem',
    margin: '10px 0',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '30px',
    padding: '40px',
    maxWidth: '600px',
    margin: '0 auto 30px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  },
  stepIndicator: {
    display: 'inline-block',
    backgroundColor: '#FF6B6B',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  emojiContainer: {
    textAlign: 'center',
    margin: '30px 0',
  },
  bigEmoji: {
    fontSize: '5rem',
    display: 'inline-block',
    animation: 'float 2s ease-in-out infinite',
  },
  stepTitle: {
    fontSize: '2.5rem',
    color: '#333',
    textAlign: 'center',
    margin: '20px 0',
  },
  stepText: {
    fontSize: '1.5rem',
    color: '#555',
    textAlign: 'center',
    lineHeight: '1.8',
    margin: '20px 0',
  },
  progressBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '30px',
  },
  progressDot: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    maxWidth: '600px',
    margin: '0 auto 40px',
  },
  button: {
    padding: '15px 40px',
    fontSize: '1.3rem',
    borderRadius: '50px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
  buttonPrev: {
    backgroundColor: '#FFB347',
    color: 'white',
  },
  buttonNext: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  visualDemo: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: '30px',
    padding: '40px',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  },
  scene: {
    position: 'relative',
    height: '400px',
    background: 'linear-gradient(to bottom, #87CEEB 0%, #98D8E8 50%, #90EE90 100%)',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  sun: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '4rem',
    transition: 'all 0.5s ease',
  },
  water: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    fontSize: '4rem',
    textAlign: 'center',
    transition: 'all 0.5s ease',
  },
  vapor: {
    position: 'absolute',
    bottom: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  vaporParticle: {
    display: 'inline-block',
    fontSize: '2rem',
    animation: 'rise 3s infinite',
    margin: '0 5px',
  },
  cloudContainer: {
    position: 'absolute',
    top: '50px',
    left: '0',
    right: '0',
  },
  cloud: {
    position: 'absolute',
    fontSize: '3rem',
    left: '30%',
    animation: 'float 3s ease-in-out infinite',
    transition: 'all 0.5s ease',
  },
  rainContainer: {
    position: 'absolute',
    top: '100px',
    left: '0',
    right: '0',
  },
  raindrop: {
    position: 'absolute',
    fontSize: '1.5rem',
    animation: 'fall 2s infinite',
  },
};
