/**
 
* @jest-enviroment node

*/

const { test, expect } = require("@jest/globals");
require("expect-puppeteer")

test("Scenario 1", async () => {
    const TEST_MESSAGE = Math.random().toString(36).substring(2, 10);
    const BASE_URL = "http://192.168.100.20:3001";

    await page.goto(BASE_URL);
    await page.type("#username", "aahmad");
    await page.type("#password", "12class34");
    const loginButton = await page.$("#login-button");
    await loginButton.click();
    await page.waitForNavigation();

    expect(await page.url()).toContain('amaChat');
    await page.select('#contact-list', "4"); //id 4 is Asmar
    await page.type('#txtMessage', TEST_MESSAGE);
    let submitButton = await page.$("#submitMessage");
    await submitButton.click();
    await page.waitForNavigation();

    expect(await page.url()).toContain('amaChat');
    let logoutButton = await page.$("#logout-button");
    await logoutButton.click();
    await page.waitForNavigation();

    expect(await page.url()).not.toContain('amaChat');
    await page.type("#username", "asmar");
    await page.type("#password", "12class34");
    const loginButton2 = await page.$("#login-button");
    await loginButton2.click();
    await page.waitForNavigation();
    await expect(page).toMatch(TEST_MESSAGE);
}, 60000)
