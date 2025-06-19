import express from 'express'

import Task from "../models/Task.js"

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json(task)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  const tasks = await Task.find()
  res.json(tasks)
})

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ message: 'Not found' })
    res.json(task)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(task)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})


router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: 'Task deleted' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
