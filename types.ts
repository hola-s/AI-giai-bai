// FIX: Import React to provide the ComponentType type.
import type React from 'react';

export interface Topic {
  id: string;
  name: string;
  description: string;
}

export interface Subject {
  id: 'math' | 'biology' | 'chemistry';
  name: string;
  topics: Topic[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
}

export interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}
