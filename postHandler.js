import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';
import upload from './multer.js'; // استيراد multerSetup
import natural from 'natural';

const tokenizer = new natural.RegexpTokenizer({ pattern: /[\s\.,!?\(\)]+/ });
const router = express.Router();

async function compareTexts(userText,quranText) {
    try {
       
        const quranTokens = tokenizer.tokenize(quranText);
        const userTokens = tokenizer.tokenize(userText);

        let result = '';

        quranTokens.forEach(quranToken => {
            if (!userTokens.includes(quranToken)) {
                result += quranToken + ' ';
            }
        });

        return result.trim();
    } catch (error) {
        throw error;
    }
}

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
        
        // استخراج النص من النتيجة المرجعية للمعالجة الصوتية
        const userText = result.text;
        console.log(userText)
        // مقارنة النص مع النص القرآني
        const quranText = req.body.quarntext;
        const comparisonResult = await compareTexts(userText,quranText);

        res.json({ comparisonResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;








// "Content-Type": "application/json", 
//                 "language": "ar"