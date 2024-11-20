const express = require("express")
const cors = require('cors')
const path = require('path')

module.exports = app => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE", "PATCH"],
        credentials: true
    }))
}
