import express, { Request, Response } from 'express'

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Zaos Node running!')
})

app.listen(port, () => {
  console.log(`Zaos Node is running on port ${port}`)
})