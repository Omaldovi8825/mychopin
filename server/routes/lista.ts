import { Router } from 'express'
import mongo from '../db/connection.js'
import { Lista } from '../types/lista.js'

const router = Router()

router.get('/listas', async (req, res) => {
  try {
    const listas = await mongo.listas.find({}).toArray()
    res.status(200).json({ error: false, data: listas })
  } catch (error) {
    res
      .status(500)
      .json({ error: true, mensaje: 'Error al insertar nueva lista' })
  }
})

router.post('/listas', async (req, res) => {
  try {
    const nuevaLista: Lista = {
      fecha: new Date(),
      items: req.body,
    }
    await mongo.listas.insertOne(nuevaLista)
    res
      .status(201)
      .json({ error: false, mensaje: 'Nueva lista insertada con éxito' })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: true, mensaje: 'Error al insertar nueva lista' })
  }
})

export default router
