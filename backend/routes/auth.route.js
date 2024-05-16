import express from 'express'
import { singup, singin, getUser, logout } from '../controllers/auth.controller.js';
import jwtAuth from '../middleware/jwtAuth.middleware.js';
const auth_router = express.Router();

auth_router.post('/singup',singup)
auth_router.post('/singin',singin)
auth_router.get('/getuser',jwtAuth,getUser)
auth_router.get('/logout',jwtAuth,logout)

export default auth_router