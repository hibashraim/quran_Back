import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';
import upload from './multer.js'; // استيراد multerSetup

const router = express.Router();

router.post('/process-audio', upload.single('audioFile'), async (req, res) => {
    try {
        // استخدام مسار الملف المؤقت الذي قام multer بتخزينه في جسم الطلب
        const data = fs.readFileSync(req.file.path);
        const response = await fetch(
            "https://api-inference.huggingface.co/models/tarteel-ai/whisper-base-ar-quran",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: data,
            }
        );
        const result = await response.json();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;