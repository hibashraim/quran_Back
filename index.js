import express from 'express';
const app = express();
import compare from './compare.js'
import postHandler from './postHandler.js'; 

const PORT = 3000;

// تحليل جسم الطلبات
app.use(express.json());
app.use(compare);

app.get('/',(req,res)=>{
    return res.status(200).json({message:"welcome"});
})

app.use(postHandler);

app.get("*",(req,res)=>{
    return res.status(500).json({message:"page not found"});
})

// الاستماع على المنفذ المحدد
app.listen(PORT, () => {
    console.log(`server is running ${PORT}`);
});

// // تعامل مع الأخطاء العامة
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });
