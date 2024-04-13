const express =require('express');
const app = express();
const router = require('./routes')
const { sequelize} = require('./models')
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/",router)


app.get('/', (req,res)=>{
  res.render('index');
})
sequelize()
  .sync({force:false})
  .then(()=>{
    app.listen(8000, ()=>{
      console.log('8000번 포트에서 서버 실행중');
    })
  })
  .catch((err)=>{
    console.error(err);
  })