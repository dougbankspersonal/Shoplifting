define([
  "dojo/dom",
  "dojo/dom-style",
  "sharedJavascript/genericMeasurements",
  "sharedJavascript/genericUtils",
  "sharedJavascript/htmlUtils",
  "sharedJavascript/debugLog",
  "javascript/gameData",
  "javascript/types",
  "javascript/boardData",
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
  boardData,
  utils,
) {
  var debugLog = debugLogModule.debugLog;

  var boyBoardTopRowHeightPx = 80;

  function addModifiersNode(parent) {
    var modifiersNode = htmlUtils.addDiv(
      parent,
      ["power", "modifier", "die-configs"],
      "modifier",
    );

    for (var i = 0; i < boardData.modifierDieConfigs.length; i++) {
      var modifierDieConfig = boardData.modifierDieConfigs[i];
      utils.addDieConfigNode(
        modifiersNode,
        modifierDieConfig,
        types.powerTypes.modifier,
      );
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

  function addCardSlotsNode(parent, playerIndex, count) {
    debugLog(
      "addCardSlotsNode",
      "playerIndex = ",
      playerIndex,
      "count = ",
      count,
    );

    // container for cards and title.
    var cardsNode = htmlUtils.addDiv(parent, ["cards"]);

    // Container for cards.
    var cardSlotsNode = htmlUtils.addDiv(cardsNode, ["cards-slots"]);
    for (var i = 0; i < count; i++) {
      addCardSlotNode(cardSlotsNode, playerIndex);
    }
  }

  function addNthDieRollRow(parent, dieRoll) {
    var rowNode = htmlUtils.addDiv(
      parent,
      ["row", "alt-color-" + (dieRoll % 2)],
      "row",
    );

    var dieRollNode = htmlUtils.addDiv(
      rowNode,
      ["cell", "die"],
      "die",
      types.dieStrings[dieRoll],
    );
    for (
      var schoolboyIndex = 0;
      schoolboyIndex < gameData.boysPerPlayer;
      schoolboyIndex++
    ) {
      var dieConfig =
        boardData.coreDieConfigsBySchoolboyIndex[schoolboyIndex][dieRoll];
      var actionString = utils.getActionString(dieConfig);
      debugLog("addNthDieRollRow", "dieConfig = ", JSON.stringify(dieConfig));
      debugLog("addNthDieRollRow", "actionString = ", actionString);
      htmlUtils.addDiv(
        rowNode,
        ["cell", "actions"],
        "actions-" + schoolboyIndex + "-" + dieRoll,
        actionString,
      );
    }
  }

  function addTopRow(coreNode, playerIndex) {
    // We want a table: boy names across top, die rolls down side, results in middle.
    var topRowNode = htmlUtils.addDiv(coreNode, ["row", "top"], "core-top-row");
    // Blank cell.
    var blankCellNode = htmlUtils.addDiv(topRowNode, ["cell", "die"]);
    // Boy names.
    for (
      var schoolboyIndex = 0;
      schoolboyIndex < gameData.boysPerPlayer;
      schoolboyIndex++
    ) {
      var boyName =
        types.schoolboyNames[
          playerIndex * gameData.boysPerPlayer + schoolboyIndex
        ];
      htmlUtils.addDiv(topRowNode, ["cell", "boy-name"], "boy-name", boyName);
    }
  }

  function addCoreNode(parent, playerIndex) {
    var coreNode = htmlUtils.addDiv(parent, ["power", "core"]);

    addTopRow(coreNode, playerIndex);

    // One row for each die roll.
    for (var dieRoll = 0; dieRoll < gameData.numDieFaces; dieRoll++) {
      addNthDieRollRow(coreNode, dieRoll);
    }

    return coreNode;
  }

  function addSchoolboyBoard(parent, playerIndex, schoolboyIndex) {
    debugLog(
      "addSchoolboyBoard",
      "playerIndex = ",
      playerIndex,
      "schoolboyIndex = ",
      schoolboyIndex,
    );

    var boardIndex = playerIndex * gameData.boysPerPlayer + schoolboyIndex;
    var boardId = "board-" + boardIndex.toString();

    var schoolboyBoardNode = htmlUtils.addDiv(
      parent,
      ["schoolboy-board"],
      boardId,
    );

    var titleNode = htmlUtils.addDiv(
      schoolboyBoardNode,
      ["title"],
      null,
      types.schoolboyNames[boardIndex],
    );
    domStyle.set(titleNode, {
      height: boyBoardTopRowHeightPx + "px",
      "line-height": boyBoardTopRowHeightPx + "px",
    });

    htmlUtils.addDiv(
      schoolboyBoardNode,
      ["modifier", "power", "die-holder"],
      "modifier-die-holder",
    );

    addCardSlotsNode(schoolboyBoardNode, playerIndex, boardData.maxTreats);

    return schoolboyBoardNode;
  }

  function addPlayerBoard(parent, playerIndex) {
    var playerBoardNode = htmlUtils.addDiv(
      parent,
      ["player-board", "family-" + playerIndex],
      "player-board-" + playerIndex,
    );

    var boyBoardsNode = htmlUtils.addDiv(playerBoardNode, ["boy-boards"]);
    for (
      var schoolboyIndex = 0;
      schoolboyIndex < gameData.boysPerPlayer;
      schoolboyIndex++
    ) {
      addSchoolboyBoard(boyBoardsNode, playerIndex, schoolboyIndex);
    }

    addModifiersNode(playerBoardNode);
    addCoreNode(playerBoardNode, playerIndex);

    return playerBoardNode;
  }

  function addBoards() {
    var bodyNode = dom.byId("body");

    var boardsNode = htmlUtils.addDiv(bodyNode, ["boards"], "boards");

    var rowOfBoardsNode;
    for (var i = 0; i < gameData.numPlayers; i++) {
      if (i % 2 == 0) {
        rowOfBoardsNode = htmlUtils.addDiv(boardsNode, ["row-of-boards"]);
      }
      var boardsRowNode = htmlUtils.addDiv(rowOfBoardsNode, ["boards-row"]);
      addPlayerBoard(boardsRowNode, i);
    }
  }

  // This returned object becomes the defined value of this module
  return {
    addBoards: addBoards,
  };
});
