const express = require('express');
const SHA256 = require('sha256');
const app = express();
const PORT = process.env.PORT || 8080;

var users = [];

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Test site');
});

app.get('/users', (req, res) => {
    res.send({
        'users':users
    });
});

app.post('/signup', (req, res) => {
    const { username } = req.body;
    var { password } = req.body;
    password = SHA256(password);
    if(users.find(users => users.username == username)) {
        res.status(403).send('Username taken.');
        return;
    }
    users.push({
        'username':username,
        'password':password
    });
    res.status(200).send("Signup successful.");
});

app.post('/login', (req, res) => {
    const { username } = req.body;
    var { password } = req.body;
    password = SHA256(password);
    const target = users.find(users => users.username == username);
    if(password == target.password) {
        res.status(200).send('You have successfully logged in.');
    } else {
        res.status(403).send('Invalid login.');
    }
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});