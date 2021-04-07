/**
 
* @jest-enviroment node

*/

const { test, expect, describe } = require("@jest/globals");
const puppeteer = require("puppeteer")

describe("Scenario 1", async () => {
    const TEST_MESSAGE = Math.random().toString(36).substring(2, 10);
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto("http://localhost:3001/");

    test("Failed login", async () => {
        await page.type("#username", "aahmad");
        await page.type("#password", "12class35");
        const loginButton = await page.$("#login-button");
        await loginButton.click()
        page.on('dialog', async alert => {
            expect(alert.message()).toBe("Go away!");
            await alert.dismiss();
        });
    })

    test("Succesful login", async () => {
        await page.type("#username", "aahmad");
        await page.type("#password", "12class34");
        const loginButton = await page.$("#login-button");
        await loginButton.click()
        await page.waitForNavigation()
        expect(page.url()).toContain('amaChat');
    })

    test("Send Message", async () => {
        await page.select('#contact-list', "4") //id 4 is Asmar
        await page.type('#txtMessage', TEST_MESSAGE)
        let submitButton = await page.$("#submitMessage")
        await submitButton.click()
        await page.waitForNavigation()
    })

    test("Logout", async () => {
        let logoutButton = await page.$("#logout-button")
        await logoutButton.click()
        await page.waitForNavigation()
    })

    test("Check message received", async () => {
        await page.type("#username", "asmar");
        await page.type("#password", "12class34");
        const loginButton = await page.$("#login-button");
        await loginButton.click()
        await page.waitForNavigation()
        const messageFound = document
            .getElementById("received_messages_list") // Get List of Received Messages
            .querySelectorAll("td") //Get all <td> tags in the list
            .find(td => td.innerHtml.includes(TEST_MESSAGE)) //Check that the <td> contains the message sent
        expect(messageFound).toBe(true);
    })
    browser.close()
})
