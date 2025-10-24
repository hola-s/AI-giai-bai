
import React from 'react';
import { SUBJECTS } from '../constants';

export const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-slate-900">
        <div className="p-4 bg-slate-800 rounded-2xl mb-6 shadow-2xl shadow-cyan-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-cyan-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
        </div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">Chào mừng đến với Trợ lý Học tập AI</h1>
      <p className="text-lg text-slate-400 max-w-2xl mx-auto">
        Hãy chọn một môn học và một chủ đề từ thanh bên để bắt đầu. Bạn có thể nhận được giải thích chi tiết, câu trả lời cho các câu hỏi cụ thể, hoặc thử sức với các bài kiểm tra do AI tạo ra.
      </p>
      <div className="flex justify-center items-center gap-8 mt-10">
        {SUBJECTS.map(subject => (
            <div key={subject.id} className="flex flex-col items-center gap-2 text-slate-400">
                <subject.icon className={`w-12 h-12 ${subject.color}`}/>
                <span className="font-semibold">{subject.name}</span>
            </div>
        ))}
      </div>
    </div>
  );
};
