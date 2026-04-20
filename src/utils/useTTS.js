import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useTTS — Custom React hook for Text-to-Speech using the Web Speech API.
 * Works as a singleton: only one utterance plays at a time across the app.
 */

// Global ref so all hook instances share the same state
let globalSynth = typeof window !== 'undefined' ? window.speechSynthesis : null;

// Clean text before speaking: strip markdown, emojis, HTML entities, excess whitespace
const cleanText = (text) => {
  return text
    .replace(/[#*_`~>]/g, '')          // markdown symbols
    .replace(/!\[.*?\]\(.*?\)/g, '')    // markdown images
    .replace(/\[.*?\]\(.*?\)/g, '')     // markdown links
    .replace(/&amp;/g, 'and')
    .replace(/&lt;/g, '')
    .replace(/&gt;/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/→|←|✅|❌|💡|⚠️|🌱|🌿|🌽|🚜|🥛|📏|🔒|☁️|📸|🛡️|💧|🌾|🤖|🔊|⏹|⏸|▶/g, '')
    .replace(/\s{2,}/g, ' ')           // collapse multiple spaces
    .replace(/\n{3,}/g, '\n\n')        // collapse many newlines
    .trim();
};

// Pick the best English voice available
const getBestVoice = () => {
  if (!globalSynth) return null;
  const voices = globalSynth.getVoices();
  // Prefer a natural English voice
  return (
    voices.find((v) => v.lang === 'en-GB' && v.localService) ||
    voices.find((v) => v.lang === 'en-US' && v.localService) ||
    voices.find((v) => v.lang.startsWith('en')) ||
    voices[0] ||
    null
  );
};

const useTTS = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const utteranceRef = useRef(null);
  const isSupported = !!globalSynth;

  // Cancel on unmount
  useEffect(() => {
    return () => {
      if (globalSynth) globalSynth.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    if (globalSynth) globalSynth.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  const speak = useCallback(
    (text) => {
      if (!globalSynth) return;

      // Stop anything currently playing
      globalSynth.cancel();
      setIsSpeaking(false);
      setIsPaused(false);

      const cleaned = cleanText(text);
      if (!cleaned) return;

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = rate;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Assign best voice (voices may not be loaded immediately)
      const assignVoice = () => {
        const voice = getBestVoice();
        if (voice) utterance.voice = voice;
      };
      assignVoice();
      if (globalSynth.getVoices().length === 0) {
        globalSynth.addEventListener('voiceschanged', assignVoice, { once: true });
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };

      utteranceRef.current = utterance;
      globalSynth.speak(utterance);
    },
    [rate]
  );

  const pause = useCallback(() => {
    if (globalSynth && isSpeaking) {
      globalSynth.pause();
      setIsPaused(true);
    }
  }, [isSpeaking]);

  const resume = useCallback(() => {
    if (globalSynth && isPaused) {
      globalSynth.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  return {
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    isPaused,
    rate,
    setRate,
    isSupported,
  };
};

export default useTTS;
