/*

Create a team of your choice.
Log the newly created team. (Just that team, not all teams)
Create another team of your choice.
Query all team, and log them all
Create the 3rd team of your choice.
Log the newly created 3rd team. (Just that team, not all team)
Move the first team
Log the first team with the updated info. 
Remove the second team you created.
Query all teams, and log them all
Try to create a team with bad input parameters to make sure it throws errors.
Try to remove a team that does not exist to make sure it throws errors.
Try to rename a team that does not exist to make sure it throws errors.
Try to rename a team passing in invalid data to make sure it throws errors.
Try getting a team by ID that does not exist to make sure it throws errors.

*/

import * as teams from "./data/teams.js";

import {dbConnection, closeConnection} from './config/mongoConnection.js';

const db = await dbConnection();
await db.dropDatabase();

let yankees;
let mets;
let socks;

try{
     yankees = await teams.createTeam("Yankees", "Baseball", 1903, "New York", "NY", "Yankee Stadium", 27, [
  { firstName: "DJ", lastName: "LeMahieu", position: "2B" },
  { firstName: "Aaron", lastName: "Judge", position: "RF" },
  { firstName: "Giancarlo", lastName: "Stanton", position: "DH" },
  { firstName: "Anthony", lastName: "Rizzo", position: "1B" },
  { firstName: "Gleyber", lastName: "Torres", position: "SS" },
  { firstName: "Harrison", lastName: "Bader", position: "CF" },
  { firstName: "Oswaldo", lastName: "Cabrera", position: "LF" },
  { firstName: "Isiah", lastName: "Kiner-Falefa", position: "3B" },
  { firstName: "Kyle", lastName: "Higashioka", position: "C" }
]);
    console.log(yankees);

}catch(e){
    console.log(e);
}

try{
 mets = await teams.createTeam("The Mets", "Baseball", 1962, "Flushing", "NY", "Citi Field", 2, [
    { firstName: "Brandon", lastName: "Nimmo", position: "CF" },
    { firstName: "Francisco", lastName: "Lindor", position: "SS" },
    { firstName: "Pete", lastName: "Alonso", position: "1B" },
    { firstName: "Jeff", lastName: "McNeil", position: "2B" },
    { firstName: "Starling", lastName: "Marte", position: "RF" },
    { firstName: "Mark", lastName: "Canha", position: "LF" },
    { firstName: "Brett", lastName: "Baty", position: "3B" },
    { firstName: "Daniel", lastName: "Vogelbach", position: "DH" },
    { firstName: "Francisco", lastName: "Álvarez", position: "C" }
]);}
catch(e){
    console.log(e);
}

try{
     const allTeams = await teams.getAllTeams();
     console.log(allTeams);
}catch(e){
    console.log(e);
}

try{
     socks = await teams.createTeam("socks", "Baseball", 1989, "Bayonne", "NJ", "Citi Field", 5, [
        { firstName: "Abe", lastName: "Nimmo", position: "CF" },
        { firstName: "Angel", lastName: "Lindor", position: "SS" },
        { firstName: "Peter", lastName: "Alonso", position: "1B" },
        { firstName: "Jeff", lastName: "McNeil", position: "2B" },
        { firstName: "Starling", lastName: "Marte", position: "RF" },
        { firstName: "Mark", lastName: "Canha", position: "LF" },
        { firstName: "Brett", lastName: "Baty", position: "3B" },
        { firstName: "Daniel", lastName: "Vogelbach", position: "DH" },
        { firstName: "Francisco", lastName: "Álvarez", position: "C" }
    ]);
    console.log(socks);
}
    catch(e){
        console.log(e);
}

try{
    const moveTheYankees = await teams.moveTeam(yankees._id.toString(), "Hoboken", "NJ", "Elysian Fields"); 
    console.log(moveTheYankees);
}catch(e){
    console.log(e);
}

try{
    const removeMets = await teams.removeTeam(yankees._id.toString()); 
}catch(e){
    console.log(e);
}

try{
    const allTeams = await teams.getAllTeams();
    console.log(allTeams);
}catch(e){
   console.log(e);
}




    


try{
    const yankeesErr = await teams.createTeam(11, "Baseball", 1903, "New York", "NY", "Yankee Stadium", 27, [
 { firstName: "DJ", lastName: "LeMahieu", position: "2B" },
 { firstName: "Aaron", lastName: "Judge", position: "RF" },
 { firstName: "Giancarlo", lastName: "Stanton", position: "DH" },
 { firstName: "Anthony", lastName: "Rizzo", position: "1B" },
 { firstName: "Gleyber", lastName: "Torres", position: "SS" },
 { firstName: "Harrison", lastName: "Bader", position: "CF" },
 { firstName: "Oswaldo", lastName: "Cabrera", position: "LF" },
 { firstName: "Isiah", lastName: "Kiner-Falefa", position: "3B" },
 { firstName: "Kyle", lastName: "Higashioka", position: "C" }
]);
   console.log(yankeesErr);

}catch(e){
   console.log(e);
}

try{
    const removeErr = await teams.removeTeam(yankees._id.toString()); 
}catch(e){
    console.log(e);
}


try{
    const moveErr = await teams.moveTeam(yankees._id.toString(), "Hoboken", "NJ", "Elysian Fields"); 
}catch(e){
    console.log(e);
}

try{
    const moveErr2 = await teams.moveTeam(mets._id.toString(), 11, "NJ", "Elysian Fields"); 
    console.log(moveTheYankees);
}catch(e){
    console.log(e);
}

try {
    const getErr = await teams.getTeamById(yankees._id.toString());
} catch(e) {
    console.log(e);
}

await closeConnection();