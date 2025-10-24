
import React from 'react';

export const BiologyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.383-1.383L2.25 12.162a15.247 15.247 0 01-1.383-1.383L11.645 2.25l.007.003.022.012a15.247 15.247 0 011.383 1.383l7.98 7.982a15.247 15.247 0 011.383 1.383l.022.012.007.003-7.98 7.982a15.247 15.247 0 01-1.383 1.383z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.963 8.25l-2.927 2.927a.75.75 0 000 1.061l2.927 2.927M8.25 12h7.5" />
    </svg>
);


export const MathIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ChemistryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.95a7.5 7.5 0 1010.5 10.5 7.5 7.5 0 00-10.5-10.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 10.5H5.25a5.25 5.25 0 00-5.23 5.231l.004.022.004.021a5.25 5.25 0 005.222 5.222h5.25" />
    </svg>
);
