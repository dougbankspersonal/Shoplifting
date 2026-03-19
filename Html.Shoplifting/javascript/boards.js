define([
  "dojo/dom",
  "dojo/dom-style",
  "sharedJavascript/genericMeasurements",
  "sharedJavascript/genericUtils",
  "sharedJavascript/htmlUtils",
  "sharedJavascript/debugLog",
  "javascript/gameData",
  "dojo/domReady!",
], function (
  dom,
  domStyle,
  genericMeasurements,
  genericUtils,
  htmlUtils,
  debugLogModule,
  gameData,
) {
  var debugLog = debugLogModule.debugLog;

  function addNthSchoolboyRollPower(parent, index, rollPower) {
    var rollString = gameData.dieStrings[index];
    var moveCount = rollPower.move;
    var noiseCount = rollPower.noise;
    var stealCount = rollPower.steal;

    var finalString = rollString + ": ";
    for (var i = 0; i < moveCount; i++) {
      finalString += gameData.mansShoeString;
    }

    finalString += "/ ";

    for (var i = 0; i < noiseCount; i++) {
      finalString += gameData.noiseString;
    }

    if (stealCount > 0) {
      finalString += "/ ";
      for (var i = 0; i < stealCount; i++) {
        finalString += gameData.stealString;
      }
    }

    var rollPowerNode = htmlUtils.addDiv(
      parent,
      ["roll-power"],
      null,
      finalString,
    );
    return rollPowerNode;
  }

  function addSchoolboyNode(
    parent,
    schoolboyRollPowers,
    playerIndex,
    boyIndex,
  ) {
    var nameIndex = playerIndex * gameData.boysPerPlayer + boyIndex;
    var schoolboyName = gameData.schoolboyNames[nameIndex];

    var schoolboyNode = htmlUtils.addDiv(parent, ["schoolboy"]);

    htmlUtils.addDiv(schoolboyNode, ["schoolboy-name"], null, schoolboyName);

    var configsNode = htmlUtils.addDiv(schoolboyNode, ["schoolboy-configs"]);

    for (var i = 0; i < schoolboyRollPowers.length; i++) {
      var schoolboyRollPower = schoolboyRollPowers[i];
      addNthSchoolboyRollPower(configsNode, i, schoolboyRollPower);
    }
    return schoolboyNode;
  }

  function addDieResultFeature(returnString, somethingPrior, value, icon) {
    value = value || 0;
    debugLog("addDieResultFeature", "value = ", value);

    if (value == 0) {
      debugLog("addDieResultFeature", "value = 0");
      return [returnString, somethingPrior];
    }

    if (somethingPrior) {
      returnString += " /";
    }

    var signString = value > 0 ? "" : "-";
    returnString += signString;
    for (var i = 0; i < Math.abs(value); i++) {
      returnString += icon;
    }
    return [returnString, true];
  }

  function addNthDieResultNode(parent, index, dieResult) {
    var dieResultString = gameData.dieStrings[index] + ":";
    var somethingPrior = false;

    [dieResultString, somethingPrior] = addDieResultFeature(
      dieResultString,
      somethingPrior,
      dieResult.move,
      gameData.mansShoeString,
    );
    [dieResultString, somethingPrior] = addDieResultFeature(
      dieResultString,
      somethingPrior,
      dieResult.noise,
      gameData.noiseString,
    );
    [dieResultString, somethingPrior] = addDieResultFeature(
      dieResultString,
      somethingPrior,
      dieResult.steal,
      gameData.stealString,
    );
    return htmlUtils.addDiv(
      parent,
      ["die-result"],
      "die-result-" + index,
      dieResultString,
    );
  }

  function addModifierDieResultsNode(parent) {
    var modifiersNode = htmlUtils.addDiv(
      parent,
      ["modifiers", "die-results"],
      "modifiers",
    );

    var halfLength = Math.floor(gameData.modifierDieResults.length / 2);

    var containerNode = htmlUtils.addDiv(modifiersNode, ["modifier-container"]);
    for (var i = 0; i < gameData.modifierDieResults.length; i++) {
      var dieResult = gameData.modifierDieResults[i];
      addNthDieResultNode(containerNode, i, dieResult);
      if (i == halfLength - 1) {
        containerNode = htmlUtils.addDiv(modifiersNode, ["modifier-container"]);
      }
    }

    return modifiersNode;
  }

  function addCardSlotNode(parent, playerIndex) {
    debugLog("addCardSlotNode", "playerIndex = ", playerIndex);

    var cardSlotNode = htmlUtils.addDiv(parent, ["card-slot"], "card-slot");

    var poofedWidth = genericMeasurements.standardCardWidthPx * 1.1;
    var poofedHeight = genericMeasurements.standardCardHeightPx * 1.1;

    domStyle.set(cardSlotNode, {
      width: poofedHeight + "px",
      height: poofedWidth + "px",
      "background-color": gameData.playerColorFamilies[playerIndex].medium,
      "border-color": gameData.playerColorFamilies[playerIndex].dark,
    });

    return cardSlotNode;
  }

  function addCardSlotsNode(parent, playerIndex, title, count) {
    // container for cards and title.
    var cardsNode = htmlUtils.addDiv(parent, ["cards"]);

    // title.
    htmlUtils.addDiv(cardsNode, ["cards-title"], null, title);

    // Container for cards.
    var cardSlotsNode = htmlUtils.addDiv(cardsNode, ["cards-slots"]);
    for (var i = 0; i < count; i++) {
      addCardSlotNode(cardSlotsNode, playerIndex);
    }
  }

  function addCoreDieResultsNode(parent, schoolboyIndex) {
    debugLog("addCoreDieResultsNode", "schoolboyIndex  = ", schoolboyIndex);

    var coreDieResultsNode = htmlUtils.addDiv(parent, ["core", "die-results"]);

    var dieResults = gameData.coreDieResultsBySchoolboyIndex[schoolboyIndex];

    for (var i = 0; i < dieResults.length; i++) {
      var dieResult = dieResults[i];
      addNthDieResultNode(coreDieResultsNode, i, dieResult);
    }
    return coreDieResultsNode;
  }

  function addDieResultsNode(parent, schoolboyIndex) {
    var dieResultsNode = htmlUtils.addDiv(parent, ["all-die-results"]);
    addModifierDieResultsNode(dieResultsNode);
    addCoreDieResultsNode(dieResultsNode, schoolboyIndex);
    return dieResultsNode;
  }

  function addSchoolboyBoard(parent, playerIndex, schoolboyIndex) {
    var boardIndex = playerIndex * gameData.boysPerPlayer + schoolboyIndex;
    var playerClass = "player-" + playerIndex.toString();
    var schoolboyClass = "schoolboy-" + schoolboyIndex.toString();
    var boardId = "board-" + boardIndex.toString();

    var schoolboyBoardNode = htmlUtils.addDiv(
      parent,
      ["schoolboy-board", playerClass, schoolboyClass],
      boardId,
    );

    domStyle.set(schoolboyBoardNode, {
      backgroundColor: gameData.playerColorFamilies[playerIndex].light,
      "border-color": gameData.playerColorFamilies[playerIndex].dark,
    });

    htmlUtils.addDiv(
      schoolboyBoardNode,
      ["board-title"],
      null,
      gameData.schoolboyNames[boardIndex],
    );

    var cardsAndDieResultsNode = htmlUtils.addDiv(schoolboyBoardNode, [
      "cards-and-die-results",
    ]);

    addCardSlotsNode(
      cardsAndDieResultsNode,
      playerIndex,
      "Treats",
      gameData.maxTreats,
    );
    addCardSlotsNode(
      cardsAndDieResultsNode,
      playerIndex,
      "Powers",
      gameData.maxPowers,
    );
    addDieResultsNode(cardsAndDieResultsNode, schoolboyIndex);

    return schoolboyBoardNode;
  }

  function addBoards() {
    var bodyNode = dom.byId("body");

    var boardsNode = htmlUtils.addDiv(bodyNode, ["boards"], "boards");

    for (var i = 0; i < gameData.numPlayers; i++) {
      for (var j = 0; j < gameData.boysPerPlayer; j++) {
        addSchoolboyBoard(boardsNode, i, j);
      }
    }
  }

  // This returned object becomes the defined value of this module
  return {
    addBoards: addBoards,
  };
});
