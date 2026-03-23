define([
  "dojo/dom",
  "dojo/dom-style",
  "sharedJavascript/genericMeasurements",
  "sharedJavascript/genericUtils",
  "sharedJavascript/htmlUtils",
  "sharedJavascript/debugLog",
  "javascript/gameData",
  "javascript/types",
  "javascript/utils",
  "dojo/domReady!",
], function (
  dom,
  domStyle,
  genericMeasurements,
  genericUtils,
  htmlUtils,
  debugLogModule,
  gameData,
  types,
  utils,
) {
  var debugLog = debugLogModule.debugLog;

  function addModifierConfigsNode(parent) {
    var modifiersNode = htmlUtils.addDiv(
      parent,
      ["power", "modifier", "die-configs"],
      "modifier",
    );

    var halfLength = Math.floor(gameData.modifierDieConfigs.length / 2);

    var containerNode = htmlUtils.addDiv(modifiersNode, ["modifier-container"]);
    for (var i = 0; i < gameData.modifierDieConfigs.length; i++) {
      var modifierDieConfig = gameData.modifierDieConfigs[i];
      utils.addDieConfigNode(
        containerNode,
        modifierDieConfig,
        types.powerTypes.modifier,
      );
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

  function addCoreDieConfigsNode(parent, schoolboyIndex) {
    debugLog("addCoreDieConfigsNode", "schoolboyIndex  = ", schoolboyIndex);

    var coreDieConfigsNode = htmlUtils.addDiv(parent, [
      "power",
      "core",
      "die-configs",
    ]);

    var dieConfigs = gameData.coreDieConfigsBySchoolboyIndex[schoolboyIndex];
    debugLog(
      "addCoreDieConfigsNode",
      "dieConfigs  = ",
      JSON.stringify(dieConfigs),
    );

    for (var i = 0; i < dieConfigs.length; i++) {
      var dieConfig = dieConfigs[i];
      utils.addDieConfigNode(
        coreDieConfigsNode,
        dieConfig,
        types.powerTypes.core,
      );
    }
    return coreDieConfigsNode;
  }

  function addAllDieInterpretationsNode(parent, schoolboyIndex) {
    var allDieInterpretationsNode = htmlUtils.addDiv(parent, [
      "all-die-configs",
    ]);
    addModifierConfigsNode(allDieInterpretationsNode);
    addCoreDieConfigsNode(allDieInterpretationsNode, schoolboyIndex);
    return allDieInterpretationsNode;
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

    var cardsAndDieInterpretationsNode = htmlUtils.addDiv(schoolboyBoardNode, [
      "cards-and-die-configs",
    ]);

    addCardSlotsNode(
      cardsAndDieInterpretationsNode,
      playerIndex,
      "Treats",
      gameData.maxTreats,
    );
    addAllDieInterpretationsNode(
      cardsAndDieInterpretationsNode,
      schoolboyIndex,
    );

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
