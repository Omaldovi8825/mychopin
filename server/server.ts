import express from "express"
import apiRoutes from "./routes/lista.js"

const PORT = 3000
const app = express()

app.use("/api", apiRoutes)

app.listen(PORT, () => {
  console.log(`server encendido en puerto ${PORT}`)
})
