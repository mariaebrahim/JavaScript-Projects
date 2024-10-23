import {teams} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';


// TODO: Export and implement the following functions in ES6 format
const createTeam = async (
  name,
  sport,
  yearFounded,
  city,
  state,
  stadium,
  championshipsWon,
  players
) => {
  
  const USabrev = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
  
  if(!name || !sport || !yearFounded || !city || !state || !stadium || !championshipsWon || !players ) throw "must procide all parameters";
  if(typeof name !== "string" || typeof sport !== "string" || typeof city !== "string" || typeof state !== "string" || typeof stadium !== "string") throw "input/s are not of the proper type.";
  if(name.trim() === "" || sport.trim() === "" || city.trim() === "" || state.trim() === "" || stadium.trim() === "") throw "an empty string/s and/or a string/s with only spaces exists";
  if(state.trim().length != 2) throw "improper state";
  //is the state case sentsitive
  if(!USabrev.includes(state.toUpperCase())) throw "improper state.";
  if(typeof yearFounded !== "number") throw "yearFounded is not a number";
  const currentYear = new Date().getFullYear();

  if(yearFounded < 1850 || yearFounded > currentYear) throw "yearFounded not in range.";
  if(typeof championshipsWon !== "number") throw "championshipsWon is not a number";
  if(!Number.isInteger(championshipsWon)) throw "improper value for championshipsWon";
  if(championshipsWon < 0) throw "improper value for championshipsWon";
  if (!Array.isArray(players)) throw "players are not of proper type";
  if(players.length < 1) throw "no players found";

  for(const player of players){

    if(typeof player !== "object") throw "improper player type in players.";
    if(Array.isArray(player)) throw "improper player type in players.";
    if(!("firstName" in player)) throw "a player does not coantian firstName.";
    if(!("lastName" in player)) throw "a player does not coantian lastName.";
    if(!("position" in player)) throw "a player does not coantian position.";
    
    if(typeof player["lastName"] !== "string") throw "improper value for a player.";
    if(typeof player["firstName"] !== "string") throw "improper value for a player.";
    if(typeof player["position"] !== "string") throw "improper value for a player.";
    
    if(player["lastName"].trim() == "") throw "empty value for a player";
    if(player["firstName"].trim() == "") throw "empty value for a player";
    if(player["position"].trim() == "") throw "empty value for a player"; 
    
    player["lastName"] = player["lastName"].trim();
    player["firstName"] = player["firstName"].trim();
    player["position"] = player["position"].trim();
  
  }

  name = name.trim();
  sport = sport.trim();
  city = city.trim();
  state = state.trim();
  stadium = stadium.trim();

  const toPost = {
    name: name,
    sport: sport,
    yearFounded: yearFounded,
    city: city,
    state: state,
    stadium: stadium,
    championshipsWon: championshipsWon,
    players: players
  }

  const teamsCollection = await teams();
  const inserting = await teamsCollection.insertOne(toPost);

  if(!inserting.acknowledged || !inserting.insertedId) throw "could not add team";

  const idUpdate = inserting.insertedId.toString();

  const ans = await getTeamById(idUpdate);

  ans._id = ans._id.toString();

  return ans;

};

//check case where database is empty to make sure it works
const getAllTeams = async () => {

  const teamsCollection = await teams();

  let teamsList = await teamsCollection.find({}).toArray();


  if (!teamsList) throw 'Could not get all teams';

  for(let i = 0; i<teamsList.length; i++){
    teamsList[i]._id = teamsList[i]._id.toString();
  }


  return teamsList;
};

//FUNCTION NOT WORKING NOT PICKING UP ON ID!!!!
const getTeamById = async (id) => {
  if(!id) throw "no id is provided.";
  if(typeof id !== "string") throw "id is not of proper type.";
  if(id.trim() === "") throw "empty id or only contains spaces.";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';

  const teamsCollection = await teams();
  const team = await teamsCollection.findOne({_id: ObjectId.createFromHexString(id)});
  //const teams = await getAllTeams();
  if(!team) throw 'No teams with that id';
 
  team._id = team._id.toString();
  return team;

};

const removeTeam = async (id) => {
  if(!id) throw "no id is provided.";
  if(typeof id !== "string") throw "id is not of proper type.";
  if(id.trim() === "") throw "empty id or only contains spaces.";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';

  const teamsCollection = await teams();
  //FIXX LIKE ABOVE 
  //const teamName = team.name//fidn the name of the team using this
  const deletionInfo = await teamsCollection.findOneAndDelete({
    _id: ObjectId.createFromHexString(id)
    });

    if (!deletionInfo) {
      throw `Could not delete post with id of ${id}`;
    }
    return `${deletionInfo.name} have been successfully deleted!`;
};

const moveTeam = async (id, newCity, newState, newStadium) => {
  if(!id) throw "no id is provided.";
  if(typeof id !== "string") throw "id is not of proper type.";
  if(id.trim() === "") throw "empty id or only contains spaces.";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';


  if(!newCity || !newState || !newStadium) throw "must procide all parameters";
  if(typeof newCity !== "string" || typeof newState !== "string" || typeof newStadium !== "string") throw "input/s are not of the proper type.";
  if(newCity.trim() === "" || newState.trim() === "" || newStadium.trim() === "") throw "an empty string/s and/or a string/s with only spaces exists";
  if(newState.trim().length != 2) throw "improper state";

  const USabrev = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
  if(!USabrev.includes(newState.toUpperCase())) throw "improper state.";

  newCity = newCity.trim();
  newState = newState.trim();
  newStadium = newStadium.trim();

  const update = {
    city: newCity,
    state: newState,
    stadium: newStadium
  };

  const teamsCollection = await teams();
  const newInfo = await teamsCollection.findOneAndUpdate(
    {_id: ObjectId.createFromHexString(id)},
    {$set: update},
    {returnDocument: 'after'}
  );
  if (!newInfo) {
    throw "could not update team successfully";
  }
  newInfo._id = newInfo._id.toString();
  return newInfo;


};

export{createTeam, getAllTeams, removeTeam, getTeamById, moveTeam}
