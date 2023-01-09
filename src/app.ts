import "reflect-metadata"
import "express-async-errors"
import handleError from "./errors/handleErrors"
import express from "express"

const app = express()

app.use(express.json())

app.use(handleError)

export default app