import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WordProps {
  word: string;
  index: number;
  totalWords: number;
}

const Word = ({ word, index, totalWords }: WordProps) => {
  const wordRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const start = index / totalWords;
    const end = start + 1 / totalWords;

    gsap.set(wordRef.current, {
      opacity: 0.2,
      
    });

    gsap.to(wordRef.current, {
      opacity: 1,
      scrollTrigger: {
        trigger: wordRef.current,
        start: `${start * 100}% 60%`,
        end: `${end * 100}% 60%`,
        scrub: true,
      }
    });
  }, [index, totalWords]);

  return (
    <span className="relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-0">{word}</span>
      <span ref={wordRef} className="text-emerald-400">
        {word}
      </span>
    </span>
  );
};

interface TextRevealProps {
  text: string;
  className?: string;
}

const TextReveal = ({ text, className = "" }: TextRevealProps) => {
  const words = text.split(" ");

  return (
    <p className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <Word 
          key={i}
          word={word}
          index={i}
          totalWords={words.length}
        />
      ))}
    </p>
  );
};

export default TextReveal;
