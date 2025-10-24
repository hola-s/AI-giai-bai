
import React, { useState, useCallback, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { WelcomeScreen } from './components/WelcomeScreen';
import { generateExplanation, generateQuiz } from './services/geminiService';
import type { Subject, Topic, Message, QuizQuestion } from './types';

const App: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const handleSelectTopic = useCallback((subject: Subject, topic: Topic) => {
    setSelectedSubject(subject);
    setSelectedTopic(topic);
    setMessages([]);
    setQuiz(null);
    setIsLoading(true);

    const initialMessage: Message = {
      id: Date.now(),
      sender: 'ai',
      text: `Chào bạn! Tôi có thể giúp gì cho bạn với chủ đề **${topic.name}** trong môn **${subject.name}**? Bạn có thể yêu cầu giải thích, hỏi đáp hoặc làm một bài kiểm tra ngắn.`,
    };
    setMessages([initialMessage]);
    setIsLoading(false);

  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!selectedTopic || !selectedSubject || isLoading) return;

    const userMessage: Message = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setQuiz(null);

    try {
      const response = await generateExplanation(selectedSubject.name, selectedTopic.name, text);
      const aiMessage: Message = { id: Date.now() + 1, sender: 'ai', text: response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { id: Date.now() + 1, sender: 'ai', text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTopic, selectedSubject, isLoading]);

  const handleGenerateQuiz = useCallback(async () => {
    if (!selectedTopic || !selectedSubject || isLoading) return;

    setIsLoading(true);
    setMessages([]);
    setQuiz(null);

    try {
      const quizQuestions = await generateQuiz(selectedSubject.name, selectedTopic.name);
      setQuiz(quizQuestions);
    } catch (error) {
      const errorMessage: Message = { id: Date.now() + 1, sender: 'ai', text: 'Rất tiếc, tôi không thể tạo bài kiểm tra ngay lúc này. Vui lòng thử lại.' };
      setMessages([errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTopic, selectedSubject, isLoading]);


  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 font-sans">
      <Sidebar onSelectTopic={handleSelectTopic} activeTopicId={selectedTopic?.id}/>
      <main className="flex-1 flex flex-col transition-all duration-300">
        {selectedTopic ? (
          <ChatWindow
            ref={chatWindowRef}
            subject={selectedSubject}
            topic={selectedTopic}
            messages={messages}
            quiz={quiz}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            onGenerateQuiz={handleGenerateQuiz}
          />
        ) : (
          <WelcomeScreen />
        )}
      </main>
    </div>
  );
};

export default App;
