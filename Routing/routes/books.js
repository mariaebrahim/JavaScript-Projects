//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getBooks() function in the /data/data.js file to return the list of books.  You can also import your getBookById(id) function and call it in the :/id route.

import * as datas from '../data/data.js';
import * as express from 'express';

const router = express.Router();

router
.route('/')
.get( async (req, res) => {
    try{
        const booksList = await datas.getBooks();
        return res.json(booksList);
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
        const book = await datas.getBookById(req.params.id);
        return res.json(book);
    }catch (e){
        return res.status(404).json(e);
    }
})
export default router;
