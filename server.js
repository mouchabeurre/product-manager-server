import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import config from "./utils/config"
import router from "./routes"

mongoose.Promise = global.Promise
mongoose
  .connect(
    config.database,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Connected to db")
  })
  .catch((ex) => {
    console.error("Couldn't connect to db:", ex)
  })

const app = express()

// app.set("view engine", "ejs");
// Midelwares
app.use(bodyParser.json())
app.use(cors())
app.use("/api", router)

app.listen(config.port, () => {
  console.log("Running on port", config.port)
})
