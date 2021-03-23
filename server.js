let express = require("express")
let jwt = require('jsonwebtoken')
let cookieParser = require('cookie-parser')
let mysql = require('mysql')
let crypto = require('crypto')

let app = express()
let port = 3000
let appSecretKey = 'dfhvbejr34r4ifh3nrjg4n3jnk3fcj49jve23hbhgcaslak'
let connection

app.use(express.static('webfiles'))
app.use(express.json())
app.use(cookieParser())

// createDB()

function logMessage(m) {
    console.log(new Date() + ":" + m)
}

let allContacts = []

app.get('/api/contacts', (req, res) => {
    try {
        let authToken = req.cookies['contact-token']
        let userDetails = jwt.verify(authToken, appSecretKey)
        if (userDetails) {
            logMessage("All Contacts")
            handleConnect()
            connection.query('SELECT * FROM users', function (error, results, fields) {
                if (results.length > 0) {
                    results.map(user => allContacts.push(user))
                    res.send({ allContacts: allContacts, user: userDetails })
                } else {
                    res.status(401)
                    res.send("Invalid db query")
                }
            });
        }
        allContacts = []
    }
    catch (e) {
        res.status(401)
        res.send('not authorized')
    }
    handleDisconnect()
})

app.get('/api/contact/:id', (req, res) => {
    let elt = allContacts.find((e) => {
        return e.id == req.params.id
    })
    if (!elt) {
        res.status(404)
        res.send("Contact not found")
        return
    }
    logMessage("Contact Found")
    res.send(elt)
})


app.put('/api/contact/:id', (req, res) => {
    let elt = allContacts.find((e) => e.id == req.params.id)
    if (!elt) {
        res.status(404)
        res.send('not found')
        return
    }
    elt.name = req.body.newName
    elt.phone = req.body.newPhone
    logMessage("Contact Updated")
    console.log(req.body)
    res.send('Contact Updated')
})

app.post('/api/contact', (req, res) => {
    let maxId = 0
    allContacts.forEach((e) => {
        if (e.id > maxId) {
            maxId = e.id
        }
    })
    maxId++
    let obj = {
        id: maxId,
        name: req.body.name,
        phone: req.body.phone
    }
    allContacts.push(obj)
    res.status(201)
    res.set('Location', `/api/contacts/${maxId}`)
    res.send("created")
})

app.delete('/api/contacts/:id', (req, res) => {
    let id = Number(req.params.id)
    allContacts = allContacts.filter(a => a.id !== id)
    res.send("Contact deleted")
})

//DONE
app.post('/api/login', (req, res) => {
    handleConnect()
    let u = req.body.username
    let p = req.body.password
    let shasum = crypto.createHash('sha1')
    shasum.update('ama' + p)
    p = shasum.digest('hex')

    if (u && p) {
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [u, p], function (error, results, fields) {
            if (results.length > 0) {
                let userInfo = {
                    name: results[0].username,
                    type: results[0].role
                }
                let token = jwt.sign(userInfo, appSecretKey, { expiresIn: 600 })
                res.cookie('contact-token', token, { httpOnly: true })
                console.log('succadic')
                res.status(200)
                res.send("ok")
            } else {
                console.log('wrong user or pass')
                res.status(401)
                res.send("Invalid Credentials")
            }
        });
    } else {
        console.log('no user or pass')
        res.status(401)
        res.send('Please enter Username and Password!');
    }
    handleDisconnect()
})

//DONE
app.post('/api/logout', (req, res) => {
    res.cookie('contact-token', '', { expires: new Date(Date.now() - 1) })
    res.send('ok')
})

function handleConnect() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'jenkins'
    })
    connection.connect()
}

function handleDisconnect() {
    connection.end()
    connection.on('error', function (err) {
        if (!err.fatal) {
            return;
        }
        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            throw err;
        }
        console.log('Re-connecting lost connection: ' + err.stack);
        connection = mysql.createConnection(connection.config);
        handleDisconnect(connection);
        connection.connect();
    });
}

app.listen(port, () => {
    console.log("The application has started")
})