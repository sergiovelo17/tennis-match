//simply reset values through DOM
function resetGame() {
  axios
    .post("/resetGame")
    .then(response => {
      console.log(response);
      document.getElementById("player1GameScore").innerHTML =
        response.data.player1GameScore;
      document.getElementById("player2GameScore").innerHTML =
        response.data.player2GameScore;
      document.getElementById("player1Set1").innerHTML =
        response.data.player1Set1Score;
      document.getElementById("player1Set2").innerHTML =
        response.data.player1Set2Score;
      document.getElementById("player1Set3").innerHTML =
        response.data.player1Set3Score;
      document.getElementById("player2Set1").innerHTML =
        response.data.player2Set1Score;
      document.getElementById("player2Set2").innerHTML =
        response.data.player2Set2Score;
      document.getElementById("player2Set3").innerHTML =
        response.data.player2Set3Score;
      document.getElementById("winner").innerHTML = "";
    })
    .catch(err => {
      console.log(err);
    });
}
//call scoring endpoint with player number
function playerScore(whoScored) {
  console.log(whoScored);
  axios
    .get(`/updateScore/${whoScored}`)
    .then(response => {
      //check if somebody has won already before updating DOM
      if (response.data.thereHasBeenAWinner) {
        alert(response.data.thereHasBeenAWinner);
      } else {
        document.getElementById("player1GameScore").innerHTML =
          response.data.player1GameScore;
        document.getElementById("player2GameScore").innerHTML =
          response.data.player2GameScore;
        document.getElementById("player1Set1").innerHTML =
          response.data.player1Set1Score;
        document.getElementById("player1Set2").innerHTML =
          response.data.player1Set2Score;
        document.getElementById("player1Set3").innerHTML =
          response.data.player1Set3Score;
        document.getElementById("player2Set1").innerHTML =
          response.data.player2Set1Score;
        document.getElementById("player2Set2").innerHTML =
          response.data.player2Set2Score;
        document.getElementById("player2Set3").innerHTML =
          response.data.player2Set3Score;
        if (response.data.player1TotalSetsWon >= 2) {
          document.getElementById("winner").innerHTML =
            "Player 1 has won this match.";
        } else if (response.data.player2TotalSetsWon >= 2) {
          document.getElementById("winner").innerHTML =
            "Player 2 has won this match.";
        }
        console.log(response);
      }
    })
    .catch(err => {
      console.log(err);
    });
}
