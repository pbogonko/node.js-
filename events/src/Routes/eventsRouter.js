const express = require('express')
const { Router } = express
const router = Router()
const { query, validationResult, matchedData , body, checkSchema}=require('express-validator')
const {createValidationSchema}=require('../validationschema.js')
const fs = require("fs");
const path = require("path");
const { deleteEvent, postEvent, putEvent, getEvents, patchEvent } = require('../Controller/eventsController.js')
let events = require('../Constants/events.json')
// let events = [];

const middlewareIndex=(req,res,next) =>{
    const {body, params: {id}}  = req

    const parsedId = parseInt(id)
    if(isNaN(parsedId)) 
        return res.sendStatus(400)

    const findUserIndex = events.findIndex((user) => {
        return user.id === parsedId
    })
    console.log(findUserIndex);
    if(findUserIndex === -1)
        return res.status(404).send('Middleware found this error')
    req.findUserIndex = findUserIndex
    next();
}

router.post('/api/events', checkSchema(createValidationSchema), postEvent);
router.get('/api/events', getEvents);
router.put('/api/events/:id', middlewareIndex, putEvent);
router.patch('/api/events/:id', middlewareIndex, patchEvent);
router.delete('/api/events/:id', middlewareIndex, deleteEvent);


module.exports = router; 
