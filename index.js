const express = require('express');

const port = 8020;

const path = require('path')

const app = express();

// const db = require('./config/mongoose.js');

const mongoose = require('mongoose');

const url = `mongodb+srv://chacha123:chacha123@cluster0.kkyizct.mongodb.net/student`;

const connectionParams={
    useUnifiedTopology: true,
    useNewUrlParser: true,
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const Student = require('./models/Student.js');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

// form page 
app.get('/',(req,res)=>{
    return res.render('addData');
})
app.post('/StData',async (req,res)=>{
    await Student.create(req.body);
    return res.redirect('back');
})
// form page end

// view Page 
app.get('/viewData',async (req,res)=>{
    let data = await Student.find({});
    return res.render('viewData',{
        stuData : data,
    })
})
// view Page end

// delete Data 
app.get('/deleteData/:id',async (req,res)=>{
    let data = await Student.findByIdAndDelete(req.params.id);
    return res.redirect('back');
})
// delete Data end

// update Data 
app.get('/updateData/:id',async (req,res)=>{
    let data = await Student.findById(req.params.id);
    return res.render('updateData',({
        oldData : data,
    }))
});
app.post('/editData', async (req,res)=>{
    await Student.findByIdAndUpdate(req.body.id /*where update*/, req.body /* what update */);
    return res.redirect('/viewData');
})
// update Data end

app.listen(port,(err)=>{
    if(err)
    {
        console.log('somthis is wrong with '+port);
        return false;
    }
    console.log('run success fully with port : '+port);
});
