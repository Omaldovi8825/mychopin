import express from "express"
import dotenv from "dotenv"
import apiRoutes from "./routes/lista.js"
import mongoConnection from "./db/connection.js"

dotenv.config()

const PORT = 3000
const app = express()

app.use(express.json())
app.use("/api", apiRoutes)

async function startServer() {
  try {
    await mongoConnection.connect()

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error("Fallo conexión a MongoDB", err)
    process.exit(1) // termina el proceso si no se puede conectar
  }
}

startServer()

process.on("SIGINT", async () => {
  console.log("Cerrando conexión a MongoDB...")
  await mongoConnection.close()
  process.exit(0)
})

process.on("SIGTERM", async () => {
  console.log("Cerrando conexión a MongoDB...")
  await mongoConnection.close()
  process.exit(0)
})
