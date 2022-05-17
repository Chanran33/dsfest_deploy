const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

const db = require('./models');

//라우터
const boardRouter = require('./routes/Board');
const noticeRouter = require('./routes/Notice');

app.use('/uploads',express.static("uploads"));

app.use("/api/board", boardRouter);
app.use("/api/notice", noticeRouter);


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
});

