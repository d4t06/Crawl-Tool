const puppeteer = require("puppeteer")

const startBrowser = async () => {
    let browser
    try {
        browser = await puppeteer.launch({
            headless: false,
        })
        if (browser) console.log(">>> Mo trinh duyet thanh cong")
    } catch (error) {
        console.log(">>> Khong mo duoc trinh duyet")
    }
    return browser
}

module.exports = startBrowser