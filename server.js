const fs = require('fs');
const url = require('url');
const path = require('path');
const express = require('express');

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'pages')));

app.get('/', (req, res)=>{
    res.end(fs.readFileSync('./pages/index.html'));
});

const { listItems, addItem, updateItem, deleteItem } = require('./db');

app.get('/api', async (req, res) => {
    let data = await listItems();
    res.json(data);
});

app.post('/add', async (req, res) => {
    await addItem(req.body);
    res.redirect('/');
});

app.get('/delete', async (req, res) => {
    let q = url.parse(req.url, true).query;
    await deleteItem(q.name);
    res.redirect('/');
});

app.get('/update', async (req, res) => {
    let q = url.parse(req.url, true).query;
    await updateItem(q.name, { time: q.time });
    res.redirect('/');
});

app.get(/\.html$/, (req, res)=>{
    let path = url.parse(req.url);
    try {
        res.end(fs.readFileSync('./pages/' + path.pathname));
    } catch {
        res.end('file not found...');
    }
});

app.get(/\.css$/, (req, res)=>{
    let path = url.parse(req.url);
    try {
        res.end(fs.readFileSync('./pages/' + path.pathname));
    } catch {
        res.end('file not found...');
    }
});

app.listen(8080);