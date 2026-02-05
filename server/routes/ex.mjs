import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
  res.json({ mensaje: "todo cool" })
})

router.get("/users", (req, res) => {
  res.json({ users: [] })
})

export default router
