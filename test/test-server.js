var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../app");
var should = chai.should();
chai.use(chaiHttp);
/*
A complete set of tests using mocha and chai, covering scoring in a game, 
duece logic, advantage logic, winning a game, winning a set, winning the entire match, 
and reseting a game.
*/
describe("Update Score", () => {
  it("it should get the score to update for player 1 through params and increase score depending on game, set, match", done => {
    chai
      .request(server)
      .get("/updateScore/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.player1GameScore.should.be.eql(15);
        done();
      });
  });
  it("it should get the score to update for player 2 through params and increase score depending on game, set, match", done => {
    chai
      .request(server)
      .get("/updateScore/2")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.player2GameScore.should.be.eql(15);
        done();
      });
  });
  it("it should let the score for player 1 update to 30", done => {
    chai
      .request(server)
      .get("/updateScore/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.player1GameScore.should.be.eql(30);
        done();
      });
  });
  it("it should let the score for player 1 update to 40", done => {
    chai
      .request(server)
      .get("/updateScore/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.player1GameScore.should.be.eql(40);
        done();
      });
  });
  it("it should let the score for player 2 update to 30", done => {
    chai
      .request(server)
      .get("/updateScore/2")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.player2GameScore.should.be.eql(30);
        done();
      });
  });
  it("it should let the score for player 2 update to 40, but invoke the Duece for both players", done => {
    chai
      .request(server)
      .get("/updateScore/2")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.player1GameScore.should.be.eql("Duece");
        res.body.player2GameScore.should.be.eql("Duece");
        done();
      });
  });
  it("it should let the score for player 1 update, but invoke the Advantage for player 1 and keep Duece for player 2", done => {
    chai
      .request(server)
      .get("/updateScore/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.player1GameScore.should.be.eql("Adv.");
        res.body.player2GameScore.should.be.eql("Duece");
        done();
      });
  });
  it("it should let the score for player 1 update, and reset the games score while increasing player 1's set 1 score by 1", done => {
    chai
      .request(server)
      .get("/updateScore/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.player1GameScore.should.be.eql(0);
        res.body.player2GameScore.should.be.eql(0);
        res.body.player1Set1Score.should.be.eql(1);
        done();
      });
  });
  it("it should let the score for player 1 update to 15 and keep its set score at 1", done => {
    chai
      .request(server)
      .get("/updateScore/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.player1GameScore.should.be.eql(15);
        res.body.player2GameScore.should.be.eql(0);
        res.body.player1Set1Score.should.be.eql(1);
        done();
      });
  });
  it("it should let the score for player 1 update to 30", done => {
    chai
      .request(server)
      .get("/updateScore/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.player1GameScore.should.be.eql(30);
        res.body.player2GameScore.should.be.eql(0);
        res.body.player1Set1Score.should.be.eql(1);
        done();
      });
  });

  it("it should let the score for player 1 update to 40", done => {
    chai
      .request(server)
      .get("/updateScore/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.player1GameScore.should.be.eql(40);
        res.body.player2GameScore.should.be.eql(0);
        res.body.player1Set1Score.should.be.eql(1);
        done();
      });
  });
  it("it should let the score for player 1 reset to 0 and increase its set score to 2", done => {
    chai
      .request(server)
      .get("/updateScore/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.player1GameScore.should.be.eql(0);
        res.body.player2GameScore.should.be.eql(0);
        res.body.player1Set1Score.should.be.eql(2);
        done();
      });
  });

  for (let i = 0; i < 16; i++) {
    it("running test for player 1 sixteen times", done => {
      chai
        .request(server)
        .get("/updateScore/1")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  }
  it("it should have a set 1 score of 6-0 and increment sets won for player 1 by 1", done => {
    chai
      .request(server)
      .get("/updateScore/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.player1GameScore.should.be.eql(15);
        res.body.player2GameScore.should.be.eql(0);
        res.body.player1Set1Score.should.be.eql(6);
        res.body.player2Set1Score.should.be.eql(0);
        res.body.player1TotalSetsWon.should.be.eql(1);
        done();
      });
  });
  for (let i = 0; i < 22; i++) {
    it("running test for player 1 twenty three times (to win entire match)", done => {
      chai
        .request(server)
        .get("/updateScore/1")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  }
  it("it should have a set 1 score of 6-0, a set 2 score of 6-0, have both games reset to 0-0, have total sets won by player 1 be 2", done => {
    chai
      .request(server)
      .get("/updateScore/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.player1GameScore.should.be.eql(0);
        res.body.player2GameScore.should.be.eql(0);
        res.body.player1Set1Score.should.be.eql(6);
        res.body.player2Set1Score.should.be.eql(0);
        res.body.player1Set2Score.should.be.eql(6);
        res.body.player2Set2Score.should.be.eql(0);
        res.body.player1TotalSetsWon.should.be.eql(2);
        done();
      });
  });
  it("it should declare a winner!!", done => {
    chai
      .request(server)
      .get("/updateScore/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.thereHasBeenAWinner.should.be.eql("Player 1 has won!!!");
        done();
      });
  });
  it("it should reset match and all values", done => {
    chai
      .request(server)
      .post("/resetGame")
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.player1GameScore.should.be.eql(0);
        res.body.player2GameScore.should.be.eql(0);
        res.body.player1Set1Score.should.be.eql(0);
        res.body.player2Set1Score.should.be.eql(0);
        res.body.player1Set2Score.should.be.eql(0);
        res.body.player2Set2Score.should.be.eql(0);        
        done();
      });
  });
});
