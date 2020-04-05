const express = require("express");
const router = express.Router();
//initialize variables used to track tennis match progress
let player1ScoreIndex = 0;
let player2ScoreIndex = 0;
let player1TotalSetsWon = 0;
let player2TotalSetsWon = 0;
//create set logic
let sets = [
  { player1SetScore: 0, player2SetScore: 0 },
  { player1SetScore: 0, player2SetScore: 0 },
  { player1SetScore: 0, player2SetScore: 0 }
];
let currSetIndex = 0;
//create array to loop through possible scores in a tennis game
let tennisScores = [0, 15, 30, 40];
/* GET home page. */
//render the initial home page with variables
router.get("/", (req, res, next) => {
  res.render("index", {
    player1GameScore: tennisScores[player1ScoreIndex],
    player2GameScore: tennisScores[player2ScoreIndex],
    player1Set1Score: sets[0].player1SetScore,
    player1Set2Score: sets[1].player1SetScore,
    player1Set3Score: sets[2].player1SetScore,
    player2Set1Score: sets[0].player2SetScore,
    player2Set2Score: sets[1].player2SetScore,
    player2Set3Score: sets[2].player2SetScore,
    player1TotalSetsWon: player1TotalSetsWon,
    player2TotalSetsWon: player2TotalSetsWon
  });
});
//update score depending on which button was selected
router.get("/updateScore/:scorer", (req, res, next) => {
  //end call if a player has already won the match
  if(player1TotalSetsWon >= 2){
    return res.json({thereHasBeenAWinner: "Player 1 has won!!!"});
  }else if(player2TotalSetsWon >= 2){
    return res.json({thereHasBeenAWinner: "Player 2 has won!!!"});
  }
  //execute logic of "Duece" and "Advantage" for tennis games
  if (req.params.scorer == 1) {
    player1ScoreIndex++;
    if (player1ScoreIndex == 3 && player2ScoreIndex == 3) {
      return res.json({
        player1GameScore: "Duece",
        player2GameScore: "Duece",
        player1Set1Score: sets[0].player1SetScore,
        player1Set2Score: sets[1].player1SetScore,
        player1Set3Score: sets[2].player1SetScore,
        player2Set1Score: sets[0].player2SetScore,
        player2Set2Score: sets[1].player2SetScore,
        player2Set3Score: sets[2].player2SetScore,
        player1TotalSetsWon: player1TotalSetsWon,
        player2TotalSetsWon: player2TotalSetsWon
      });
    } else if (player1ScoreIndex == 4 && player2ScoreIndex == 3) {
      return res.json({
        player1GameScore: "Adv.",
        player2GameScore: "Duece",
        player1Set1Score: sets[0].player1SetScore,
        player1Set2Score: sets[1].player1SetScore,
        player1Set3Score: sets[2].player1SetScore,
        player2Set1Score: sets[0].player2SetScore,
        player2Set2Score: sets[1].player2SetScore,
        player2Set3Score: sets[2].player2SetScore,
        player1TotalSetsWon: player1TotalSetsWon,
        player2TotalSetsWon: player2TotalSetsWon
      });
      //reset both to Duece
    } else if (player1ScoreIndex == 4 && player2ScoreIndex == 4) {
      player1ScoreIndex--;
      player2ScoreIndex--;
      return res.json({
        player1GameScore: "Duece",
        player2GameScore: "Duece",
        player1Set1Score: sets[0].player1SetScore,
        player1Set2Score: sets[1].player1SetScore,
        player1Set3Score: sets[2].player1SetScore,
        player2Set1Score: sets[0].player2SetScore,
        player2Set2Score: sets[1].player2SetScore,
        player2Set3Score: sets[2].player2SetScore,
        player1TotalSetsWon: player1TotalSetsWon,
        player2TotalSetsWon: player2TotalSetsWon
      });
    } else if (player1ScoreIndex == 5 && player2ScoreIndex == 3) {
      player1ScoreIndex = 0;
      player2ScoreIndex = 0;
      sets[currSetIndex].player1SetScore++;
    } else if (player1ScoreIndex == 4) {
      player1ScoreIndex = 0;
      player2ScoreIndex = 0;
      sets[currSetIndex].player1SetScore++;
    }
  } else {
    player2ScoreIndex++;
    if (player1ScoreIndex == 3 && player2ScoreIndex == 3) {
      return res.json({
        player1GameScore: "Duece",
        player2GameScore: "Duece",
        player1Set1Score: sets[0].player1SetScore,
        player1Set2Score: sets[1].player1SetScore,
        player1Set3Score: sets[2].player1SetScore,
        player2Set1Score: sets[0].player2SetScore,
        player2Set2Score: sets[1].player2SetScore,
        player2Set3Score: sets[2].player2SetScore,
        player1TotalSetsWon: player1TotalSetsWon,
        player2TotalSetsWon: player2TotalSetsWon
      });
    } else if (player1ScoreIndex == 3 && player2ScoreIndex == 4) {
      return res.json({
        player1GameScore: "Duece",
        player2GameScore: "Adv.",
        player1Set1Score: sets[0].player1SetScore,
        player1Set2Score: sets[1].player1SetScore,
        player1Set3Score: sets[2].player1SetScore,
        player2Set1Score: sets[0].player2SetScore,
        player2Set2Score: sets[1].player2SetScore,
        player2Set3Score: sets[2].player2SetScore,
        player1TotalSetsWon: player1TotalSetsWon,
        player2TotalSetsWon: player2TotalSetsWon
      });
    } else if (player1ScoreIndex == 4 && player2ScoreIndex == 4) {
      player1ScoreIndex--;
      player2ScoreIndex--;
      return res.json({
        player1GameScore: "Duece",
        player2GameScore: "Duece",
        player1Set1Score: sets[0].player1SetScore,
        player1Set2Score: sets[1].player1SetScore,
        player1Set3Score: sets[2].player1SetScore,
        player2Set1Score: sets[0].player2SetScore,
        player2Set2Score: sets[1].player2SetScore,
        player2Set3Score: sets[2].player2SetScore,
        player1TotalSetsWon: player1TotalSetsWon,
        player2TotalSetsWon: player2TotalSetsWon
      });
    } else if (player1ScoreIndex == 3 && player2ScoreIndex == 5) {
      player1ScoreIndex = 0;
      player2ScoreIndex = 0;
      sets[currSetIndex].player2SetScore++;
    } else if (player2ScoreIndex == 4) {
      player1ScoreIndex = 0;
      player2ScoreIndex = 0;
      sets[currSetIndex].player2SetScore++;
    }
  }
  //check if player 1 has won the set already
  if (
    sets[currSetIndex].player1SetScore >= 6 &&
    sets[currSetIndex].player1SetScore - sets[currSetIndex].player2SetScore >= 2
  ) {
    currSetIndex++;
    player1TotalSetsWon++;
  //check if player 2 has won the set already
  } else if (
    sets[currSetIndex].player2SetScore >= 6 &&
    sets[currSetIndex].player2SetScore - sets[currSetIndex].player1SetScore >= 2
  ) {
    currSetIndex++;
    player2TotalSetsWon++;
  }
  //default res.json of all values for updating of DOM
  res.json({
    player1GameScore: tennisScores[player1ScoreIndex],
    player2GameScore: tennisScores[player2ScoreIndex],
    player1Set1Score: sets[0].player1SetScore,
    player1Set2Score: sets[1].player1SetScore,
    player1Set3Score: sets[2].player1SetScore,
    player2Set1Score: sets[0].player2SetScore,
    player2Set2Score: sets[1].player2SetScore,
    player2Set3Score: sets[2].player2SetScore,
    player1TotalSetsWon: player1TotalSetsWon,
    player2TotalSetsWon: player2TotalSetsWon
  });
});
//reset all values to 0 for a new tennis match!
router.post("/resetGame", (req, res, next) => {
  player1ScoreIndex = 0;
  player2ScoreIndex = 0;
  player1TotalSetsWon = 0;
  player2TotalSetsWon = 0;
  currSetIndex = 0;
  sets = [
    { player1SetScore: 0, player2SetScore: 0 },
    { player1SetScore: 0, player2SetScore: 0 },
    { player1SetScore: 0, player2SetScore: 0 }
  ];
  res.json({
    player1GameScore: tennisScores[player1ScoreIndex],
    player2GameScore: tennisScores[player2ScoreIndex],
    player1Set1Score: sets[0].player1SetScore,
    player1Set2Score: sets[1].player1SetScore,
    player1Set3Score: sets[2].player1SetScore,
    player2Set1Score: sets[0].player2SetScore,
    player2Set2Score: sets[1].player2SetScore,
    player2Set3Score: sets[2].player2SetScore,
    player1TotalSetsWon: player1TotalSetsWon,
    player2TotalSetsWon: player2TotalSetsWon
  });
});
module.exports = router;
