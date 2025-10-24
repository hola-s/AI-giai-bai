# AI Chat Gemini (HTML tĩnh + Vercel API)

## Cấu trúc
- `index.html` → Giao diện tĩnh (chat bong bóng)
- `api/ai.js` → Proxy API (Node.js) để gọi Gemini
- `GEMINI_API_KEY` → Lưu trong biến môi trường Vercel

## Cách dùng
1. Đăng nhập [https://vercel.com](https://vercel.com)
2. Tạo project mới → Upload folder này.
3. Thêm biến môi trường:
   - Tên: `GEMINI_API_KEY`
   - Giá trị: `AIzaSyAs8RP6L0kOrjoQ2BalOJ85DaKxsR4AVsg`
4. Deploy → Lấy link: `https://tên-app.vercel.app/api/ai`
5. Mở `index.html` → dán link API vào ô → chat thôi!
