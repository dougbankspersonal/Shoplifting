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

  var poofedCardWidth = genericMeasurements.standardCardWidthPx * 1.1;
  var poofedCardHeight = genericMeasurements.standardCardHeightPx * 1.1;
  var standardBoardWidth = poofedCardHeight + 24;

  function addStandardBoards(parent, boardClass, boardTitle) {
    for (var i = 0; i < gameData.numPlayers; i++) {
      var classes = [boardClass, "all-board", "standard-board"];
      var boardNode = htmlUtils.addDiv(
        parent,
        classes,
        boardClass + "-board-" + i,
      );
      var titleWrapperNode = htmlUtils.addDiv(
        boardNode,
        ["title-wrapper"],
        "title-wrapper-" + i,
      );

      var titleNode = htmlUtils.addDiv(
        titleWrapperNode,
        ["title"],
        "title-" + i,
        boardTitle,
      );

      var innerBoardNode = htmlUtils.addDiv(
        boardNode,
        ["inner-board", "family-" + i],
        "inner-board-" + i,
      );
    }
  }

  function addTitleBoards(parent, boyByPlayerIndex) {
    for (var i = 0; i < gameData.numPlayers; i++) {
      var boyIndex = i * gameData.boysPerPlayer + boyByPlayerIndex;
      var boyName = types.schoolboyNames[boyIndex];
      var classes = ["title-board", "all-board", "family-" + i];
      var titleBoardNode = htmlUtils.addDiv(
        parent,
        classes,
        "title-board-" + boyIndex,
      );

      var leftTextNode = htmlUtils.addDiv(
        titleBoardNode,
        ["left-text"],
        "left-text-" + boyIndex,
      );

      var boyNameNode = htmlUtils.addDiv(
        leftTextNode,
        ["boy-name"],
        "boy-name-" + boyIndex,
        boyName,
      );

      var treats0Count = gameData.treat0CardConfigs.length;
      var treat0Name = gameData.treat0CardConfigs[boyIndex % treats0Count].name;

      htmlUtils.addDiv(
        leftTextNode,
        ["favorite"],
        "favorite-" + boyIndex,
        treat0Name,
      );

      htmlUtils.addImage(titleBoardNode, ["move-die"], "move-die");
    }
  }

  function addPocketBoards(parent) {
    addStandardBoards(parent, "pocket", "Pocket");
  }

  function addTummyBoards(parent) {
    addStandardBoards(parent, "tummy", "Tummy");
  }

  function addTokensBoards(parent) {
    addStandardBoards(parent, "tokens", "Tokens");
  }

  function addDemeritsBoards(parent) {
    addStandardBoards(parent, "demerits", "Demerits");
  }

  function addBoards() {
    var bodyNode = dom.byId("body");

    var boardsNode = htmlUtils.addDiv(bodyNode, ["boards"], "boards");

    var rowOfBoardsNode;

    var wrapperNode = htmlUtils.addDiv(boardsNode, ["wrapper"], "wrapper");
    for (var i = 0; i < gameData.boysPerPlayer; i++) {
      rowOfBoardsNode = htmlUtils.addDiv(wrapperNode, ["row-of-boards"]);
      addTitleBoards(rowOfBoardsNode, i);
    }

    rowOfBoardsNode = htmlUtils.addDiv(boardsNode, ["row-of-boards"]);
    addPocketBoards(rowOfBoardsNode);

    rowOfBoardsNode = htmlUtils.addDiv(boardsNode, ["row-of-boards"]);
    addTummyBoards(rowOfBoardsNode);

    rowOfBoardsNode = htmlUtils.addDiv(boardsNode, ["row-of-boards"]);
    addTokensBoards(rowOfBoardsNode);

    rowOfBoardsNode = htmlUtils.addDiv(boardsNode, ["row-of-boards"]);
    addDemeritsBoards(rowOfBoardsNode);
  }

  // This returned object becomes the defined value of this module
  return {
    addBoards: addBoards,
  };
});
