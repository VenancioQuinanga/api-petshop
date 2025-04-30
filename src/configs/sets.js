const express = require("express")
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

module.exports = app => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: process.env.APP_URL,
        methods: ["GET", "POST", "DELETE", "PATCH"],
        credentials: true
    }))
}
