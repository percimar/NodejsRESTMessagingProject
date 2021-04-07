/**
 
* @jest-enviroment node

*/

const { test, expect, describe } = require("@jest/globals");
const puppeteer = require("puppeteer")

test("Scenario 1", async () => {
    const TEST_MESSAGE = Math.random().toString(36).substring(2, 10);
    const BASE_URL = "http://192.168.100.20:3001";

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(BASE_URL);
    await page.type("#username", "aahmad");
    await page.type("#password", "12class34");
    const loginButton = await page.$("#login-button");
    await loginButton.click();
    await page.waitForNavigation();
    expect(page.url()).toContain('amaChat');

    await page.select('#contact-list', "4"); //id 4 is Asmar
    await page.type('#txtMessage', TEST_MESSAGE);
    let submitButton = await page.$("#submitMessage");
    await submitButton.click();
    await page.waitForNavigation();

    let logoutButton = await page.$("#logout-button");
    await logoutButton.click();
    await page.waitForNavigation();

    await page.type("#username", "asmar");
    await page.type("#password", "12class34");
    const loginButton2 = await page.$("#login-button");
    await loginButton2.click();
    await page.waitForNavigation();
    const messageFound = page
        .$("#received_messages_list") // Get List of Received Messages
        .innerHtml
        .includes(TEST_MESSAGE); //Check that the <td> contains the message sent
    expect(messageFound).toBe(true);
    browser.close();
}, 60000)
