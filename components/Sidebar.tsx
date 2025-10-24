
import React, { useState } from 'react';
import { SUBJECTS } from '../constants';
import type { Subject, Topic } from '../types';

interface SidebarProps {
  onSelectTopic: (subject: Subject, topic: Topic) => void;
  activeTopicId?: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ onSelectTopic, activeTopicId }) => {
  const [expandedSubject, setExpandedSubject] = useState<string | null>('biology');

  const toggleSubject = (subjectId: string) => {
    setExpandedSubject(prev => (prev === subjectId ? null : subjectId));
  };

  return (
    <aside className="w-80 bg-slate-950/70 border-r border-slate-800 flex flex-col p-4 overflow-y-auto">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-slate-700 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cyan-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-100">Trợ lý Học tập AI</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {SUBJECTS.map(subject => (
          <div key={subject.id}>
            <button
              onClick={() => toggleSubject(subject.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors duration-200 ${subject.color} hover:bg-slate-800/50`}
            >
              <div className="flex items-center">
                <subject.icon className="w-6 h-6 mr-3" />
                <span className="font-semibold text-lg">{subject.name}</span>
              </div>
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  expandedSubject === subject.id ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSubject === subject.id && (
              <ul className="pl-6 pr-2 py-2 space-y-1 border-l-2 border-slate-700 ml-3 mt-1">
                {subject.topics.map(topic => (
                  <li key={topic.id}>
                    <button
                      onClick={() => onSelectTopic(subject, topic)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                        activeTopicId === topic.id
                          ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      {topic.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};
