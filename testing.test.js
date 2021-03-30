/**
 
* @jest-enviroment node

*/

const { test, expect } = require("@jest/globals");
let axios = require('axios')
let mysql = require('mysql')
axios.defaults.adapter = require('axios/lib/adapters/http');



// testing case title
test('Test login successfuly', async () => {

    // login with user and password to get a token
    let res = await axios.post('http://localhost:3000/api/login', {
        username: 'aahmad',
        password: '12class34'
    }
    )
    expect(res.status).toBe(200)
})

// test('failed to login', async () => {

//     // login with user and password to get a token
//     let res = await axios.post('http://localhost:3000/api/login', {
//         username: 'ali',
//         password: '12345'
//     }
//     ).catch(function (error) {

//         expect(error.response.status).toBe(401)

//     })
// })




// test('get data', async () => {

//     // login with user and password to get a token
//     let res = await axios.post('http://localhost:3000/api/login', {
//         username: 'ali',
//         password: '123'
//     }
//     )
//     // expect(res.data.msg).toBe("ok")
//     let token = res.data
//     let getdata = await axios.get("http://localhost:3000/api/v1.0/contacts",
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//     console.log("hello this is me" + token)
//     expect(res.status).toBe(200)

// })

// test('get data', async () => {

//     // login with user and password to get a token
//     let res = await axios.post('http://localhost:3000/api/login', {
//         username: 'ali',
//         password: '123'
//     }
//     )
//     // expect(res.data.msg).toBe("ok")
//     let token = res.data
//     let getdata = await axios.get("http://localhost:3000/api/v1.0/contacts",
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//     console.log("hello this is me" + token)
//     expect(res.status).toBe(200)

// })

// test('get chat', async () => {

//     // login with user and password to get a token
//     let res = await axios.post('http://localhost:3000/api/login', {
//         username: 'ali',
//         password: '123'
//     }
//     )
//     // expect(res.data.msg).toBe("ok")
//     let token = res.data
//     let getdata = await axios.post('http://localhost:3000/api/getConv', {
//         sender: "66666662",
//         receiver: "66666661",
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })
//     console.log("hello this is me from chat" + token)
//     expect(res.status).toBe(200)

// })

// test('send message', async () => {

//     // login with user and password to get a token
//     let res = await axios.post('http://localhost:3000/api/login', {
//         username: 'ali',
//         password: '123'
//     }
//     )
//     // expect(res.data.msg).toBe("ok")
//     let token = res.data
//     let getdata = await axios.post('http://localhost:3000/api/sendMessage', {
//         sender: "66666662",
//         message: "hello from tester",
//         receiver: "66666661",
//         cid: "1",
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })
//     console.log("Message Sent" + token)
//     expect(res.status).toBe(200)

// })
