var req = new XMLHttpRequest();
req.addEventListener("load", finishedLoad);
req.open("GET", "/usaco/results/feb16.html");
req.send();

function finishedLoad(e) {
  console.log("loaded");
  parseData(e.target.responseText);
  processData();
  writeData();
}

function parseData(data) {
  competitors = [{
        name: "Jonny Strömberg",
        score: 1000
      },
      {
        name: "Jonas Arnklint",
        score: 667
      },
      {
        name: "Martina Elm",
        score: 234
  }];
}

function processData() {
  competitors.sort(function(c1, c2) {
    var score1 = c1.score,
        score2 = c2.score;
    if (score1 == score2) {
      var name1 = c1.name,
          name2 = c2.name;
      if (name1 < name2) {
        return -1;
      } else if (name1 > name2) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return score2 - score1;
    }
  });

  var currank = 1;
  for (var i = 0; i < competitors.length; i++) {
    competitors[i]["rank"] = currank;
    if (i + 1 < competitors.length) {
      if (competitors[i]["score"] > competitors[i + 1]["score"]) {
        ++currank;
      }
    }
  }
}

function writeData() {
  var options = {
    valueNames: [ "rank", "name", "score" ]
  };
  list = new List("leaderboard", options, competitors);
  list.remove("rank", "Loading Data...");
}
