const router = require('express').Router();
const {
  models: { Lobby },
} = require('../db');
module.exports = router;
/**
IN Database Model, add instance method to load questions
Lobby.prototype.loadNewQuestions = async function(type = 'all'){
  function getRandomInt(min, max) {
    return Math.random() * (max-min) + min;
  }
  let questionList;
  switch(type){
    case 'easy': questionList = await Question.findAll({where: {category: easy}})
    break;
    case 'medium': questionList = await Question.findAll({where: {category: medium}})
    break;
    case 'hard': questionList = await Question.findAll({where: {category: hard}});
    default: questionList = await Question.findAll();
  }
  this.setQuestions([getRandomInt(1, questionList.length), getRandomInt(1, questionList.length), getRandomInt(1, questionList.length), getRandomInt(1, questionList.length), getRandomInt(1, questionList.length)])
}
*/

/**
* POST route to create a lobby, also generates a user as host

* lobbyName: Generated lobbyId from front-end
* username : input from user in front-end

* Can later code in difficulty level as a passable req.body, for now, just adding 5 random questions
 */
router.post('/', async (req, res, next) => {
  try {
    const { lobbyName, username } = req.body;
    const newLobby = await Lobby.create({
      name: lobbyName,
      roundId: 1,
    });
    newLobby.loadNewQuestions('all');
    const newUser = await newLobby.createUser({
      name: username,
      isHost: true,
      correctPoints: 0,
      incorrectPoints: 0,
    });
    res.json({ newLobby, newUser });
  } catch (err) {
    next(err);
  }
});

//simple get request to get Lobby info, may not need to be used because of sockets
router.get('/:lobbyName', async (req, res, next) => {
  try {
    const { lobbyName } = req.params;
    const currLobby = await Lobby.findOne({ where: { name: lobbyName } });
    res.json(currLobby);
  } catch (err) {
    next(err);
  }
});
//Put request to update lobby roundID
router.put('/:lobbyName', async (req, res, next) => {
  try {
    const { lobbyName } = req.params;
    const { reset } = req.body;
    if (reset) {
      const [updatedRows, updatedLobby] = await Lobby.update(
        { roundId: 1 },
        { where: { name: lobbyName }, returning: true }
      );
      res.json(updatedLobby[0]);
    } else {
      // NOT SURE IF RETURNING WORKS ON INCREMENT, WILL NEED TO TEST
      const updated = await Lobby.increment(
        { roundId: 1 },
        { where: { name: lobbyName }, returning: true }
      );
      res.json(updated);
    }
  } catch (err) {
    next(err);
  }
});
