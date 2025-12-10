import config from "./config/config.js"
import connect from "./database/index.js"
import app from "./app.js"
import salesSummaryCron from "./cron/salesSummary.cron.js"

connect()
.then(() => {
    salesSummaryCron.start()
    app.listen(config.port, () => {
        console.log(`Server is listening at Port : ${config.port}`)
    })
})
.catch((err)=> console.log("failed",err.message))

