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
  var elements = $("<div/>").append(data).find("tr");
  console.log(elements.length);

  competitors = [];
  for (var i = 0; i < elements.length; i++) {
    var competitor = parseCompetitor(elements.eq(i));
    if (competitor != null) {
      competitors.push(competitor);
    }
  }
}

function parseCompetitor(element) {
  var properties = element.find("td");

  if (properties.length == 0) {
    return null;
  } else if (removeTags(properties[0].outerHTML) == "Country") {
    return null;
  }

  var competitor = {};
  competitor["country"] = removeTags(properties[0].outerHTML);

  if (removeNonNumerics(properties[1].outerHTML) != "") {
    competitor["year"] = parseInt(removeNonNumerics(properties[1].outerHTML));
    competitor["name"] = removeTags(properties[2].outerHTML);
    competitor["score"] = parseInt(removeTags(properties[3].outerHTML));
  } else {
    competitor["year"] = null;
    competitor["name"] = removeTags(properties[1].outerHTML);
    competitor["score"] = parseInt(removeTags(properties[2].outerHTML));
  }

  console.log(competitor.score);

  return competitor;
}

function isNumeric(str) {
  return !isNaN(str);
}

function removeNonNumerics(str) {
  var ret = str.replace(/\D/g, "");
  return ret;
}

function removeTags(str) {
  var ret = str.replace(/<\/?[^>]+(>|$)/g, "");
  return ret;
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
        currank = i + 1;
      }
    }
  }
}

function writeData() {
  var options = {
    valueNames: [ "rank", "country", "year", "name", "score" ]
  };
  list = new List("leaderboard", options, competitors);
  list.remove("rank", "Loading Data...");
}
