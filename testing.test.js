/**
 
* @jest-enviroment node

*/

const { test, expect } = require("@jest/globals");
let axios = require('axios')
let mysql = require('mysql')
axios.defaults.adapter = require('axios/lib/adapters/http');


describe("Get /login Tests", () => {

    test('Test login successfuly', async () => {

        let result = await axios.post('http://localhost:3000/api/login', {
            username: 'aahmad',
            password: '12class34'
        })
        expect(result.status).toBe(200)
    })

    test('Test login failed', async () => {

        let result = await axios.post('http://localhost:3000/api/login', {
            username: 'aahmad',
            password: '13clascvfe'
        }).catch(function (e) {
            expect(e.response.status).toBe(401)
        })
    })

    test('Test login with no inputs', async () => {

        let result = await axios.post('http://localhost:3000/api/login', {
            username: null,
            password: null
        }).catch(function (e) {
            expect(e.response.status).toBe(401)
        })
    })

})

describe("GET /messages Tests", () => {

    test('get messages as admin', async () => {

        let result = await axios.post('http://localhost:3000/api/login', {
            'username': 'admin',
            'password': '12class34'
        })
        let authToken = result.data
        let getdata = await axios.get("http://localhost:3000/api/messages",
            {
                headers: {
                    'Cookie': `contact-token =  ${authToken}`
                },
                withCredentials: true
            })
        expect(getdata.status).toBe(200)
    })

    test('get messages as normal user', async () => {

        let result = await axios.post('http://localhost:3000/api/login', {
            'username': 'aahmad',
            'password': '12class34'
        })
        let authToken = result.data
        let getdata = await axios.get("http://localhost:3000/api/messages",
            {
                headers: {
                    'Cookie': `contact-token =  ${authToken}`
                },
                withCredentials: true
            })
        expect(getdata.status).toBe(200)
    })

    test('get messages from user with no messages', async () => {

        let result = await axios.post('http://localhost:3000/api/login', {
            'username': 'mahmoud',
            'password': '12class34'
        })
        let authToken = result.data
        let getdata = await axios.get("http://localhost:3000/api/messages",
            {
                headers: {
                    'Cookie': `contact-token =  ${authToken}`
                },
                withCredentials: true
            })
        expect(getdata.status).toBe(200)
    })

    test('get messages without user', async () => {
        let result = await axios.post('http://localhost:3000/api/login', {
            'username': null,
            'password': null
        }).catch(function (e) {
            expect(e.response.status).toBe(401)
        })
    })

})

describe("GET /contacts Tests", () => {

    test('get contacts with no user', async () => {
        let result = await axios.post('http://localhost:3000/api/login', {
            'username': null,
            'password': null
        }).catch(function (e) {
            expect(e.response.status).toBe(401)
        })
    })

    test('get contacts', async () => {
        let result = await axios.post('http://localhost:3000/api/login', {
            'username': 'admin',
            'password': '12class34'
        })
        let authToken = result.data
        let res = await axios.get("http://localhost:3000/api/contacts",
            {
                headers: {
                    'Cookie': `contact-token =  ${authToken}`
                },
                withCredentials: true
            })
        expect(res.status).toBe(200)
    })
})

describe("POST /messages Tests", () => {

    test('Sending a message successfully', async () => {
        let result = await axios.post('http://localhost:3000/api/login',
            {
                'username': 'admin',
                'password': '12class34'
            })
        let authToken = result.data
        let res = await axios.post('http://localhost:3000/api/messages',
            {
                'message': 'Testing the api',
                'receiver': 3,
            },
            {
                headers: {
                    'Cookie': `contact-token =  ${authToken}`
                },
                withCredentials: true
            })
        expect(res.status).toBe(201)
    })

    test('Sending a message without user', async () => {
        let result = await axios.post('http://localhost:3000/api/login',
            {
                'username': null,
                'password': null
            }).catch(function (e) {
                expect(e.response.status).toBe(401)
            })
    })

    test('Sending a message unsuccessfully', async () => {
        let result = await axios.post('http://localhost:3000/api/login',
            {
                'username': 'admin',
                'password': '12class34'
            })
        let authToken = result.data
        let res = await axios.post('http://localhost:3000/api/messages',
            {
                'message': 'Testing the api',
                'receiver': 8,
            },
            {
                headers: {
                    'Cookie': `contact-token =  ${authToken}`
                },
                withCredentials: true
            }).catch(function (e) {
                expect(e.response.status).toBe(401)
            })
    })

})

describe("POST /messages Tests", () => {

    test('Test logout successfuly', async () => {

        let result = await axios.post('http://localhost:3000/api/login', {
            username: 'aahmad',
            password: '12class34'
        }).catch(function (e) {
            expect(e.response.status).toBe(200)
        })
        let res = await axios.post('http://localhost:3000/api/logout')
        let authToken = result.data
        let res2 = await axios.post('http://localhost:3000/api/messages',
            {
                'message': 'Testing the api',
                'receiver': 3,
            },
            {
                headers: {
                    'Cookie': `contact-token =  ${authToken}`
                },
                withCredentials: true
            }).catch(function (e) {
                expect(e.response.status).toBe(401)
            })
    })
})