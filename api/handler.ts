import express from 'express'
import axios from 'axios'
import * as config from '../config.json'
export default () => {
    const api = express.Router()
    api.use(express.json())
    api.post("/webhook", async (req, res) => {
        const url = req.body.hostname
        const timestamp = req.body.timestamp

        let webhook = ""
        console.log(url)
        for (const configItem of config.mapping) {
            if (configItem.url === url) {
                webhook = configItem.webhookUrl
            }
        }
        if (webhook === "") {
            return res.status(400).send('invalid error url')
        }
        await axios.post(webhook, {
            content: `Failure detected on ${url} at timestamp ${timestamp}`
        })

        res.status(200).send('success')
    })
    return api    
}