import express from 'express';
import natural from 'natural';

const tokenizer = new natural.WordTokenizer();

const router = express.Router();

function compareTexts(quranText, userText) {
    const quranTokens = tokenizer.tokenize(quranText);
    const userTokens = tokenizer.tokenize(userText);

    let result = '';

    quranTokens.forEach(quranToken => {
        if (!userTokens.includes(quranToken)) {
            result += quranToken + ' ';
        }
    });

    return result.trim();
}

router.post('/compare', (req, res) => {
    try {
        const quranText = "هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ ۖ الْمَلِكُ الْقُدُّوسُ السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ ۚ سُبْحَانَ اللَّهِ عَمَّا يُشْرِكُونَ";
        const userText = req.body.text; // النص الذي تم استقباله من العميل
        const result = compareTexts(quranText, userText);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
