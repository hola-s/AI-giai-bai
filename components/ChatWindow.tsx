
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import type { Subject, Topic, Message, QuizQuestion } from '../types';
import { MessageItem } from './MessageItem';
import { QuizView } from './QuizView';
import { Loader } from './Loader';
import { SendIcon, SparklesIcon } from './icons/ActionIcons';

interface ChatWindowProps {
  subject: Subject | null;
  topic: Topic | null;
  messages: Message[];
  quiz: QuizQuestion[] | null;
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onGenerateQuiz: () => void;
}

export const ChatWindow = forwardRef<HTMLDivElement, ChatWindowProps>(({
  subject,
  topic,
  messages,
  quiz,
  isLoading,
  onSendMessage,
  onGenerateQuiz
}, ref) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, quiz, isLoading]);
  
  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!subject || !topic) return null;

  return (
    <div ref={ref} className={`flex-1 flex flex-col h-full bg-slate-900 bg-gradient-to-b ${subject.gradient}`}>
      <header className="p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <h2 className={`text-2xl font-bold ${subject.color}`}>{subject.name}</h2>
        <p className="text-slate-400">{topic.name}</p>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {quiz ? (
          <QuizView quiz={quiz} subjectColor={subject.color} onRetry={onGenerateQuiz} />
        ) : (
          messages.map(msg => <MessageItem key={msg.id} message={msg} subjectIcon={subject.icon} />)
        )}
        {isLoading && !quiz && <div className="flex justify-center"><Loader /></div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="bg-slate-800 rounded-xl p-2 flex items-end gap-2">
           <button
            onClick={onGenerateQuiz}
            disabled={isLoading}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isLoading
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-purple-400 hover:bg-purple-500/20'
            }`}
            aria-label="Tạo bài kiểm tra"
            title="Tạo bài kiểm tra"
          >
            <SparklesIcon className="w-6 h-6" />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Hỏi về ${topic.name}...`}
            className="w-full bg-transparent resize-none p-2 text-slate-200 placeholder-slate-500 focus:outline-none max-h-40"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`p-3 rounded-lg transition-colors duration-200 ${
              isLoading || !input.trim()
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-cyan-500 text-white hover:bg-cyan-600'
            }`}
            aria-label="Gửi tin nhắn"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
});
