const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 7077;

app.use(bodyParser.json());
app.use(cors());

app.post('/add', (req,res)=>{
    const {Num1,Num2} = req.body;
    const result = Num1 + Num2;
    res.json({result})
});

app.post('/subtract', (req,res)=>{
    const {Num1,Num2} = req.body;
    const result = Num1 - Num2;
    res.json({result})
});

app.post('/multiply', (req,res)=>{
    const {Num1,Num2} = req.body;
    const result = Num1 * Num2;
    res.json({result})
});

app.post('/divide', (req,res)=>{
    const {Num1,Num2} = req.body;
    const result = Num1 / Num2;
    res.json({result})
});


app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));