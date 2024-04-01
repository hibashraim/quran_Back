
import express from 'express';
const app = express();

import postHandler from './postHandler.js'; 
import compare from './compare.js'


const PORT = 3000;

// تحليل جسم الطلبات
app.use(express.json());

// استخدام مسار المقارنة
app.use(compare);

app.use(postHandler); 
// الاستماع على المنفذ المحدد
app.listen(PORT, () => {
    console.log(`server is running ${PORT}`);
});
