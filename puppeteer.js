const puppeteer = require("puppeteer")

async function test() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto("http://localhost:3000/")
    await page.type("#username", "aahmad");
    await page.type("#password", "12class34");
    let loginButton = await page.$("#login-button")
    await loginButton.click()
    await page.waitForNavigation()
    let result = await page.url()
    await page.select('#contact-list', "4")
    await page.type('#txtMessage', "This is a test message")
    let submitButton = await page.$("#submitMessage")
    await submitButton.click()
    await page.waitForNavigation()
    let logoutButton = await page.$("#logout-button")
    await logoutButton.click()
    browser.close()
}

test()