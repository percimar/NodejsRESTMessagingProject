let express = require("express")
let jwt = require('jsonwebtoken')
let cookieParser = require('cookie-parser')
let app = express()
let port = 3000
let appSecretKey = 'dfhvbejr34r4ifh3nrjg4n3jnk3fcj49jve23hbhgcaslak'
let mysql = require('mysql')
let connection

app.use(express.static('webfiles'))
app.use(express.json())
app.use(cookieParser())



function logMessage(m) {
    console.log(new Date() + ":" + m)
}

let allUsers = []
allUsers.push(
    { id: 1, username: "u1", type: "regular", password: "hello" },
    { id: 2, username: "u2", type: "regular", password: "world" },
    { id: 3, username: "admin", type: "admin", password: "12class34" }
)

let allContacts = [
    { id: 1, name: 'John', phone: 34858945 },
    { id: 2, name: 'Jane', phone: 59748974 },
    { id: 3, name: 'Jill', phone: 23494850 },
    { id: 4, name: 'Jake', phone: 84798735 },
    { id: 5, name: 'Jebb', phone: 34786545 }
]

app.get('/api/contacts', (req, res) => {
    try {
        let authToken = req.cookies['contact-token']
        let userDetails = jwt.verify(authToken, appSecretKey)
        if (userDetails) {
            logMessage("All Contacts")
            res.send({ allContacts: allContacts, type: userDetails.type })
        }
    }
    catch (e) {
        res.status(401)
        res.send('not authorized')
    }
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

app.post('/api/auth', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    logMessage("The password is: " + password)
    logMessage("The username is: " + username)
    res.send("")
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

app.post('/api/login', (req, res) => {
    handleConnect()
    let u = req.body.username
    let p = req.body.password

    if (u && p) {
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [u, p], function (error, results, fields) {
            if (results.length > 0) {
                let userInfo = {
                    name: results[0].username,
                    type: results[0].role
                }
                let token = jwt.sign(userInfo, appSecretKey, { expiresIn: 600 })
                res.cookie('contact-token', token, { httpOnly: true })
                res.status(200)
                res.send("ok")
            } else {
                res.status(401)
                res.send("Invalid Credentials")
            }
        });
    } else {
        res.status(401)
        res.send('Please enter Username and Password!');
    }
    handleDisconnect(connection)
})

app.post('/api/logout', (req, res) => {
    // do nothing here for now but maybe we could record the action in the log
    res.cookie('contact-token', '', { expires: new Date(Date.now() - 1) })
    res.send('ok')
})


app.listen(port, () => {
    console.log("The application has started")
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

function handleDisconnect(connection) {
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


