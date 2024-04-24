const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

const example = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'download/'); // 저장 경로 설정
    },
    filename(req, file, cb) {
      cb(null, file.originalname); // 파일명은 변경하지 않고 그대로 사용
    }
  })
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 파일을 저장할 정적 폴더를 설정
app.use('/download', express.static('download'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload2', example.single('demo'), (req, res) => {
  console.log('---');
  res.render('result', { filename: req.file.filename }); // req.file.filename을 전달
});

app.listen(8000, () => {
  console.log('8000번 포트에서 서버 실행중 . . .');
});
