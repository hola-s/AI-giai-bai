
import type { Subject } from './types';
import { BiologyIcon, ChemistryIcon, MathIcon } from './components/icons/SubjectIcons';

export const SUBJECTS: Subject[] = [
  {
    id: 'biology',
    name: 'Sinh học',
    icon: BiologyIcon,
    color: 'text-green-400',
    gradient: 'from-green-500/20 to-slate-900',
    topics: [
      { id: 'bio-1', name: 'Cấu trúc tế bào', description: 'Khám phá các bào quan và chức năng của chúng.' },
      { id: 'bio-2', name: 'Quang hợp', description: 'Tìm hiểu cách thực vật tạo ra năng lượng.' },
      { id: 'bio-3', name: 'Di truyền học Mendel', description: 'Các quy luật cơ bản về di truyền.' },
      { id: 'bio-4', name: 'Hệ tuần hoàn người', description: 'Tim, mạch máu và sự vận chuyển oxy.' },
      { id: 'bio-5', name: 'Hệ sinh thái', description: 'Sự tương tác giữa các sinh vật và môi trường.' },
    ],
  },
  {
    id: 'math',
    name: 'Toán học',
    icon: MathIcon,
    color: 'text-blue-400',
    gradient: 'from-blue-500/20 to-slate-900',
    topics: [
      { id: 'math-1', name: 'Đại số tuyến tính', description: 'Ma trận, vector và không gian vector.' },
      { id: 'math-2', name: 'Giải tích', description: 'Giới hạn, đạo hàm và tích phân.' },
      { id: 'math-3', name: 'Hình học Euclid', description: 'Các định lý và tính chất của hình phẳng.' },
      { id: 'math-4', name: 'Xác suất thống kê', description: 'Phân tích dữ liệu và các biến cố ngẫu nhiên.' },
      { id: 'math-5', name: 'Phương trình vi phân', description: 'Mô hình hóa các hệ thống thay đổi.' },
    ],
  },
  {
    id: 'chemistry',
    name: 'Hóa học',
    icon: ChemistryIcon,
    color: 'text-purple-400',
    gradient: 'from-purple-500/20 to-slate-900',
    topics: [
      { id: 'chem-1', name: 'Bảng tuần hoàn', description: 'Xu hướng và tính chất của các nguyên tố.' },
      { id: 'chem-2', name: 'Liên kết hóa học', description: 'Liên kết ion, cộng hóa trị và kim loại.' },
      { id: 'chem-3', name: 'Phản ứng axit-bazơ', description: 'Thuyết Arrhenius, Brønsted-Lowry và Lewis.' },
      { id: 'chem-4', name: 'Hóa học hữu cơ', description: 'Hydrocarbon và các nhóm chức.' },
      { id: 'chem-5', name: 'Nhiệt động hóa học', description: 'Năng lượng, entanpi và entropi.' },
    ],
  },
];
