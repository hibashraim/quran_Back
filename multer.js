import multer from 'multer';

// تهيئة multer لتخزين الملفات المرسلة في مجلد مؤقت
const upload = multer({ dest: 'uploads/' });

export default upload;