//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getAuthors() function in the /data/data.js file 3 to return the list of authors and call it in the /authors route.  You can also import your getAuthorById function and call it in the :/id route.

// import {Router} from 'express';
// const router = Router();

import * as datas from '../data/data.js';
import * as express from 'express';
//const test = Router();

const router = express.Router();

router
.route('/')
.get( async (req, res) => {
    try{
        const authorsList = await datas.getAuthors();
        return res.json(authorsList);
    }catch (e){
        return res.status(500).send(e);
    }
})
// Implement GET Request Method and send a JSON response See lecture code!

router
.route('/:id')
.get(async (req, res) => {
    try{
    if(typeof req.params.id === "undefined") throw "id paramter does not exist";
    if(typeof req.params.id !== "string") throw "id is not of type string";
    if(req.params.id.trim() === "") throw "id is empty or only contains spaces";}
    catch(e){
        return res.status(400).json({error: e});
    }
    req.params.id = req.params.id.trim();
    try{
        const author = await datas.getAuthorById(req.params.id);
        return res.json(author);
    }catch (e){
        return res.status(404).json(e);
    }
})
//Implement GET Request Method and send a JSON response See lecture code!

export default router;
