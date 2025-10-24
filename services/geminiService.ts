
import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const quizSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: {
          type: Type.STRING,
          description: "Câu hỏi trắc nghiệm.",
        },
        options: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
          description: "Danh sách các lựa chọn, thường là 4 lựa chọn.",
        },
        correctAnswer: {
          type: Type.STRING,
          description: "Lựa chọn đúng trong danh sách các lựa chọn.",
        },
        explanation: {
            type: Type.STRING,
            description: "Giải thích ngắn gọn tại sao đáp án đó là đúng."
        }
      },
      required: ["question", "options", "correctAnswer", "explanation"],
    },
};


export const generateExplanation = async (subject: string, topic: string, question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Câu hỏi: ${question}`,
      config: {
        systemInstruction: `Bạn là một gia sư chuyên nghiệp, nhiệt tình chuyên về môn ${subject}. Hãy giải thích các khái niệm liên quan đến chủ đề "${topic}" một cách rõ ràng, dễ hiểu, phù hợp với mọi cấp độ học sinh. Sử dụng định dạng markdown, bao gồm danh sách, in đậm và in nghiêng để làm nổi bật các điểm chính.`,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating explanation:", error);
    throw new Error("Không thể tạo giải thích từ AI.");
  }
};

export const generateQuiz = async (subject: string, topic: string): Promise<QuizQuestion[]> => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Tạo một bài kiểm tra gồm 5 câu hỏi trắc nghiệm về chủ đề "${topic}" trong môn ${subject}.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: quizSchema,
          systemInstruction: "Bạn là một AI chuyên tạo ra các câu đố giáo dục. Hãy tạo ra các câu hỏi chất lượng với các lựa chọn hợp lý."
        }
      });
      
      const jsonString = response.text.trim();
      const quizData = JSON.parse(jsonString) as QuizQuestion[];
      return quizData;

    } catch (error) {
        console.error("Error generating quiz:", error);
        throw new Error("Không thể tạo bài kiểm tra từ AI.");
    }
}
