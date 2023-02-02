const startBrowser = require("./browser")
const scrawController = require("./crawController")


let browser = startBrowser()
scrawController(browser);