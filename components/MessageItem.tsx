
import React from 'react';
import type { Message } from '../types';
import { UserIcon } from './icons/ActionIcons';

// A simple markdown-to-html converter
const formatText = (text: string) => {
    // Basic bold, italic, and code block formatting
    let formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code class="bg-slate-700/50 text-emerald-300 px-1.5 py-0.5 rounded-md">$1</code>');

    // Handle lists
    formattedText = formattedText.replace(/^\s*-\s(.*)/gm, '<li class="ml-4">$1</li>');
    formattedText = formattedText.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    
    return formattedText.split('\n').join('<br />');
};

interface MessageItemProps {
    message: Message;
    subjectIcon: React.ComponentType<{ className?: string }>;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, subjectIcon: SubjectIcon }) => {
    const isUser = message.sender === 'user';
    const Icon = isUser ? UserIcon : SubjectIcon;

    return (
        <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-700">
                    <Icon className="w-6 h-6 text-slate-400" />
                </div>
            )}
            <div className={`max-w-xl p-4 rounded-xl ${isUser ? 'bg-cyan-500/80 text-white rounded-br-none' : 'bg-slate-800/80 text-slate-300 rounded-bl-none'}`}>
                 <div className="prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: formatText(message.text) }} />
            </div>
             {isUser && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600">
                    <Icon className="w-6 h-6 text-slate-300" />
                </div>
            )}
        </div>
    );
};
