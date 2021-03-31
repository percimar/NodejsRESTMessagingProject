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
let allMessages = []

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
                    res.status(500)
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

app.get('/api/messages', (req, res) => {
    try {
        let authToken = req.cookies['contact-token']
        let userDetails = jwt.verify(authToken, appSecretKey)
        if (userDetails) {
            if (userDetails.name === "admin") {
                logMessage("All Contacts")
                handleConnect()
                connection.query(`SELECT m.*, u1.username AS senderName, u2.username AS receiverName
                                    FROM messages AS m 
                                    JOIN users AS u1 ON u1.id = m.sender 
                                    JOIN users AS u2 ON u2.id = m.receiver`, function (error, results, fields) {
                    if (results.length > 0) {
                        results.map(user => allMessages.push(user))
                        res.send({ allMessages: allMessages, user: userDetails })
                    } else {
                        res.status(200)
                        res.send("no messages found")
                    }
                });
            }
            else {
                logMessage("All Contacts")
                handleConnect()
                connection.query(`SELECT m.*, u1.username AS senderName, u2.username AS receiverName
                                    FROM messages AS m 
                                    JOIN users AS u1 ON u1.id = m.sender 
                                    JOIN users AS u2 ON u2.id = m.receiver 
                                    WHERE receiver = ${userDetails.id} or sender = ${userDetails.id}`, function (error, results, fields) {
                    if (results.length > 0) {
                        results.map(message => allMessages.push(message))
                        // console.log("helo" + results)
                        res.send({ allMessages: allMessages, user: userDetails })
                    } else {
                        res.status(200)
                        res.send("no messages found")
                    }
                });
            };
        }

        allMessages = []
    }
    catch (e) {
        res.status(401)
        res.send('not authorized')
    }
    handleDisconnect()
})

app.post('/api/messages', async (req, res) => {

    try {
        let authToken = req.cookies['contact-token']
        let userDetails = jwt.verify(authToken, appSecretKey)
        let message = req.body.message
        let sender = userDetails.id
        let receiver = req.body.receiver
        let date = new Date()
        if (userDetails) {
            try {
                await handleConnect()
                await connection.query(`INSERT INTO messages (message, sender, receiver, date) VALUES ('${message}','${sender}','${receiver}','${date.toMysqlFormat()}');`, function (error, results, fields) {
                    console.log("error", error);
                    if (!error) {
                        res.status(201)
                        res.send("added message to db")
                    } else {
                        res.status(401)
                        res.send("Could not be added to db")
                    }
                });
            } catch{
                (e) => console.log(e);
            }
        } else {
            res.status(401)
            res.send('not authorized')
        }
    } catch{
        (e) => console.log(e);
    }
    await handleDisconnect()
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
                    type: results[0].role,
                    id: results[0].id
                }
                let token = jwt.sign(userInfo, appSecretKey, { expiresIn: 10000 })
                res.cookie('contact-token', token, { httpOnly: true })
                console.log('logged in')
                res.status(200)
                res.send(token)
            } else {
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


//JS TO MYSQL DATE FUNCTION
function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};