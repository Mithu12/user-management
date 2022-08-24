import asyncHandler from "express-async-handler";
import pool from "../utils/db.js";
import fs from 'fs'
import path from "path";


// @desc    fetch all Users
// @route   GET /api/users
// @access  Public

export const getUsers = asyncHandler(async (req, res) => {

  const {lastId, limit = 20} = req.query

  const whereClause = lastId ? `WHERE users.id<${Number(lastId)}` : ''

  const query = `SELECT * FROM users ${whereClause} ORDER BY users.id DESC LIMIT ${Number(limit)}`

  const users = await pool.query(query)
  res.json({
    message: '',
    success: true,
    data: users.rows
  })
})


// @desc    fetch single product
// @route   GET /api/products/:id
// @access  Public


export const getSingleUser = asyncHandler(async (req, res) => {
  const {id} = req.params
  const query = `SELECT * FROM users WHERE users.id=${id}`

  const user = await pool.query(query)
  if (user.rows.length)
    res.json({
      message: '',
      success: true,
      data: user.rows[0]
    })
  else {
    res.status(404)
    throw new Error('User not found')
  }
})


// @desc    Creat product
// @route   POST /api/products/create
// @access  Private/Admin


export const createUser = asyncHandler(async (req, res) => {

  const image = '/' + req.file.filename

  const {
    name,
    email,
    phone,
    nid,
    area,
    district,
    postalCode
  } = req.body

  const userInfo = `'${image}','${name}','${email}','${phone}',${nid},'${area}','${district}', ${postalCode}`
  const query = `INSERT INTO users(
    image,
    name,
    email,
    phone,
    nid,
    area,
    district,
    postalCode
    ) VALUES(${userInfo})`
  await pool.query(query)
  res.json({
    message: '',
    success: true,
  })
})


// @desc    Update product
// @route   POST /api/products/update/:id
// @access  Private/Admin


export const updateUser = asyncHandler(async (req, res) => {
  // console.log('asd')
  const image = req.file ? '/' + req.file.filename : ''
  const {
    id,
    name,
    email,
    phone,
    nid,
    area,
    district,
    postalCode
  } = req.body

  let oldData = null
// check if a new image has been uploaded then set oldData
  if (image) {
    const oldDataQuery = `SELECT image FROM users WHERE users.id=${id}`
    oldData = await pool.query(oldDataQuery)
  }
  const query = `UPDATE users SET ${image ? `image = '${image}',` : ''}
    name = '${name}',
    email = '${email}',
    phone = '${phone}',
    nid = ${nid},
    area = '${area}',
    district = '${district}',
    postalCode = ${postalCode} where users.id = ${id}`
  await pool.query(query)

  // remove old image after updating using oldData
  if (oldData) {
    const oldImageFile = oldData.rows[0].image
    const __dirname = path.resolve()
    const filePath = __dirname + '/uploads' + oldImageFile
    if (fs.existsSync(filePath)) {
      await fs.unlinkSync(filePath)
    }
  }

  // console.log(query)
  res.json({
    message: 'Updated Successfully',
    success: true,
  })
})


// @desc    Delete product
// @route   GET /api/products/delete/:id
// @access  Private/Admin

export const deleteUser = asyncHandler(async (req, res) => {
  const {id} = req.params
  const query = `SELECT image FROM users WHERE users.id=${id}`
  const userRemoveQuery = `DELETE FROM users WHERE users.id=${id}`
  const user = await pool.query(query)

  if (user.rows.length) {
    await pool.query(userRemoveQuery)
    const oldImageFile = user.rows[0].image
    const __dirname = path.resolve()
    const filePath = __dirname + '/uploads' + oldImageFile
    if (fs.existsSync(filePath)) {
      await fs.unlinkSync(filePath)
    }
    res.json({
      message: 'Deleted Successfully',
      success: true,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

