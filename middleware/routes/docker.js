import express from 'express'
import axios from 'axios'

const dockerRouter = express.Router()
const dockerUrl = 'http://localhost:8080'

// List all running containers
dockerRouter.get("/list", async (req, res) => {
  try {
    const response = await axios.get(`${dockerUrl}/list`)
    res.send(response.data)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Run a container based on it's ID and tag
dockerRouter.post("/run", async (req, res) => {
  try {
    const response = await axios.get(`${dockerUrl}/run`, req.body)
    res.send(response.data)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Stop a group of containers
dockerRouter.post("/stop", async (req, res) => {
  try {
    const response = await axios.get(`${dockerUrl}/stop`, req.body)
    res.send(response.data)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Build a new container from the start
// TODO: Next two endpoints need testing and work done
dockerRouter.post("/build", async (req, res) => {
  try {
    const response = await axios.post(`${dockerUrl}/build`, req.body)
    res.send(response.data)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Upload the files needed to build the container
dockerRouter.post("/files/upload", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded')
  }

  let uploaded_file = req.files.uploaded_file
  let path = `/files/${uploaded_file.name}`

  uploaded_file.mv(path, (err) => {
    if (err)
      return res.status(500).send(err)

    res.send(201)
  })
})

export default dockerRouter