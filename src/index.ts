import express, { Request, Response } from 'express'
import cron from 'node-cron';
import { cronData } from './service/ao';
import { message, createDataItemSigner } from "@permaweb/aoconnect";
import { getWallet } from './helpers/wallet';

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Zaos Oracle Node running!')
})

app.post('/send', (req: Request, res: Response) => {
  
  // Write a test message to AO
  message({
    process: 'G7GjNVXD0eHI46kp6tSJF5onOEwshfRF6nY9XHgFzLs',
    signer: createDataItemSigner(getWallet()),
    tags: [{ name: "Action", value: "ZaosTest" }],
    data: JSON.stringify("Test message")
  })

  res.status(201).send("Sent.")
})

app.listen(port, () => {
  console.log(`Zaos Oracle Node is running on port ${port}`)
})

cron.schedule('*/15 * * * * *', async () => {
  try {
      console.info("Cron job triggered");
      await cronData();
      console.info("Cron job completed");
  } catch (error) {
      console.error('An error occurred in the cron job:', error)
  }
})