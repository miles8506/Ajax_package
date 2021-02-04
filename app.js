const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
app.engine('html', require('express-art-template'));
app.use('/node_modules/', express.static(path.join(__dirname, '/node_modules/')));
app.use('/public/', express.static(path.join(__dirname, '/public/')));
app.get('/', (req, res) => {
    res.render('./tmplage.html');
})
app.get('/email', (req, res) => {
    let query = req.query.email;
    fs.readFile(path.join(__dirname + '/resource.json'), 'utf8', (err, data) => {
        if (err) {
            return res.send('該信箱已被註冊');
        };
        data = JSON.parse(data).email;
        data.some((value, index, arr) => {
            if (query == value.mail) {
                return res.send('該信箱已被註冊');
            };
            return res.send('信箱可使用');
        })
    })
});
app.listen(3000, () => {
    console.log('running');
})