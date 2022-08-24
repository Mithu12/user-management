import express from 'express'
import * as path from "path";
import userRoutes from "./routes/userRoutes.js";
import {errorHandler, notFound} from "./middleware/errorMiddlware.js";
// import dbPool from './utils/db.js'
import pool from "./utils/db.js";
import {createUserTable, deleteUserTable, getUserTableData, insertDummyUserData} from "./utils/dbQueries.js";
import dbRoutes from "./routes/dbRoutes.js";

const app = express()

app.use(express.json())

// routes to handle database seeding
app.use(dbRoutes)
// routes to handle user related operations
// app.use('/api/users', userRoutes)

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'uploads')))


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`))
