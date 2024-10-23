/*Here, you can export the data functions
to get the authors, books, getAuthorByID, getBookById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/

import axios from 'axios';

const getAuthors = async () => {
    const data1 = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json');
    const data = data1.data;
    return data;
};

const getBooks = async () => {
        const data1 = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json');
        const data = data1.data;
        return data;
};

const getAuthorById = async (id) => {
    if(typeof id === "undefined") throw "id paramter does not exist";
    if(typeof id !== "string") throw "id is not of type string";
    if(id.trim() === "") throw "id is empty or only contains spaces";
    id = id.trim();
        const data1 = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json');
        const data = data1.data;
        for(let i = 0; i<data.length; i++){
            if("id" in data[i]){
                if(data[i]["id"] === id){
                    return data[i];
                }
            }
        }throw "Author Not Found!";
};

const getBookById = async (id) => {
    if(typeof id === "undefined") throw "id paramter does not exist";
    if(typeof id !== "string") throw "id is not of type string";
    if(id.trim() === "") throw "id is empty or only contains spaces";
    id = id.trim();
        const data1 = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json');
        const data = data1.data;
        for(let i = 0; i<data.length; i++){
            if("id" in data[i]){
                if(data[i]["id"] === id){
                    return data[i];
                }
            }
        }throw "Book Not Found!";
};

export{getBookById, getAuthorById, getBooks, getAuthors};
