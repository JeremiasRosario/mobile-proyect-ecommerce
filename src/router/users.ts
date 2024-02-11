import express from 'express';

import { deleteUSer, getAllUsers, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares/index';


export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers)
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUSer)
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser)

};

