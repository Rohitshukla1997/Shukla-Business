"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterHeadingProps {
  // Can accept a single sentence string or an array of alternating sentences
  text?: string | string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBeforeDelete?: number;
}

export function TypewriterHeading({
  text = "Technology deserves a better touch.",
  className,
  as: Tag = "h1",
  typeSpeed = 55,
  deleteSpeed = 60,
  delayBeforeDelete = 2500,
}: TypewriterHeadingProps) {
  const sentences = Array.isArray(text) ? text : [text];
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const fullSentence = sentences[sentenceIndex] || "";

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setCurrentText(fullSentence);
      return;
    }

    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (currentText.length < fullSentence.length) {
        timer = setTimeout(() => {
          setCurrentText(fullSentence.slice(0, currentText.length + 1));
        }, typeSpeed);
      } else if (sentences.length > 1) {
        // Finished typing one sentence, pause before backspacing to next sentence
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBeforeDelete);
      }
    } else {
      // Deleting phase (only when multiple sentences exist)
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullSentence.slice(0, currentText.length - 1));
        }, deleteSpeed);
      } else {
        // Move to the next sentence
        setIsDeleting(false);
        setSentenceIndex((prev) => (prev + 1) % sentences.length);
      }
    }

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    sentenceIndex,
    fullSentence,
    sentences.length,
    typeSpeed,
    deleteSpeed,
    delayBeforeDelete,
  ]);

  // Ensure there is always a full stop at the end
  const hasDot = currentText.endsWith(".");
  const displayText = hasDot ? currentText.slice(0, -1) : currentText;

  return (
    <Tag
      className={cn(
        "font-heading font-extrabold text-[#000000] tracking-tight select-none",
        className,
      )}
    >
      <span>{displayText}</span>

      {/* Full stop (.) in Champagne Gold with inline blinking cursor */}
      <span className="text-[#C6A76B] whitespace-nowrap inline-flex items-center">
        .
        <span
          aria-hidden="true"
          className="inline-block w-1 sm:w-1.5 h-[0.75em] bg-[#C6A76B] rounded-xs ml-1 align-middle animate-pulse"
          style={{
            boxShadow: "0 0 8px rgba(198, 167, 107, 0.5)",
          }}
        />
      </span>
    </Tag>
  );
}
