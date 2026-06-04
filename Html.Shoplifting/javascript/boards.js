define([
  "dojo/dom",
  "dojo/dom-style",
  "sharedJavascript/genericMeasurements",
  "sharedJavascript/htmlUtils",
  "sharedJavascript/debugLog",
  "sharedJavascript/screentop/seatColors",
  "javascript/gameData",
  "dojo/domReady!",
], function (
  dom,
  domStyle,
  genericMeasurements,
  htmlUtils,
  debugLogModule,
  seatColors,
  gameData,
) {
  var debugLog = debugLogModule.debugLog;

  function addStandardBoards(parent, boardAndImageClass, boardTitle) {
    for (var seatIndex = 0; seatIndex < gameData.numPlayers; seatIndex++) {
      var classes = [boardAndImageClass, "all-board", "standard-board"];
      var boardNode = htmlUtils.addDiv(
        parent,
        classes,
        boardAndImageClass + "-board-" + seatIndex,
      );
      var titleWrapperNode = htmlUtils.addDiv(
        boardNode,
        ["title-wrapper"],
        "title-wrapper-" + seatIndex,
      );

      htmlUtils.addDiv(
        titleWrapperNode,
        ["title"],
        "title-" + seatIndex,
        boardTitle,
      );

      var innerBoardNode = htmlUtils.addDiv(
        boardNode,
        ["inner-board"],
        "inner-board-" + seatIndex,
      );

      htmlUtils.addImage(
        innerBoardNode,
        [boardAndImageClass],
        boardAndImageClass + "-" + seatIndex,
      );

      var colorFamily = seatColors.getLightColorFamilyForSeat(seatIndex);
      colorFamily.gradient1 = "#fff";
      htmlUtils.applyColorFamily(boardNode, colorFamily);
    }
  }

  function addNameBoards(parent, boyByPlayerIndex) {
    for (var seatIndex = 0; seatIndex < gameData.numPlayers; seatIndex++) {
      var boyIndex = seatIndex * gameData.boysPerPlayer + boyByPlayerIndex;
      var boyConfig = gameData.boyConfigs[boyIndex];
      var boyName = boyConfig.name;

      var classes = ["name-board", "all-board"];
      var nameBoardNode = htmlUtils.addDiv(
        parent,
        classes,
        "name-board-" + boyIndex,
      );

      var leftTextNode = htmlUtils.addDiv(
        nameBoardNode,
        ["left-text"],
        "left-text-" + boyIndex,
      );

      var treatConfig = boyConfig.favoriteTreatConfig;
      var treat0Name = treatConfig.name;
      var treat0Color = treatConfig.color;
      domStyle.set(leftTextNode, {
        background: treat0Color,
      });

      var boyNameNode = htmlUtils.addDiv(
        leftTextNode,
        ["boy-name"],
        "boy-name-" + boyIndex,
        boyName,
      );

      var favoriteNode = htmlUtils.addDiv(
        leftTextNode,
        ["favorite"],
        "favorite-" + boyIndex,
        treat0Name,
      );

      htmlUtils.addImage(nameBoardNode, ["move-die"], "move-die");
      var colorFamily = seatColors.getLightColorFamilyForSeat(seatIndex);
      colorFamily.gradient1 = "#fff";
      htmlUtils.applyColorFamily(nameBoardNode, colorFamily);
    }
  }

  function addKnapsackBoards(parent) {
    addStandardBoards(parent, "knapsack", "Knapsack");
  }

  function addEatenBoards(parent) {
    addStandardBoards(parent, "eaten", "Eaten");
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

    var nameBoardsWrapperNode = htmlUtils.addDiv(
      boardsNode,
      ["name-boards-wrapper"],
      "name-boards-wrapper",
    );
    for (var i = 0; i < gameData.boysPerPlayer; i++) {
      rowOfBoardsNode = htmlUtils.addDiv(
        nameBoardsWrapperNode,
        ["row-of-boards"],
        "names-row-" + i,
      );
      debugLog("addBoards", "rowOfBoardsNode = ", rowOfBoardsNode);
      addNameBoards(rowOfBoardsNode, i);
    }

    rowOfBoardsNode = htmlUtils.addDiv(
      boardsNode,
      ["row-of-boards"],
      "knapsack-row",
    );
    addKnapsackBoards(rowOfBoardsNode);

    rowOfBoardsNode = htmlUtils.addDiv(
      boardsNode,
      ["row-of-boards"],
      "eaten-row",
    );
    addEatenBoards(rowOfBoardsNode);

    rowOfBoardsNode = htmlUtils.addDiv(
      boardsNode,
      ["row-of-boards"],
      "tokens-row",
    );
    addTokensBoards(rowOfBoardsNode);

    rowOfBoardsNode = htmlUtils.addDiv(
      boardsNode,
      ["row-of-boards"],
      "demerits-row",
    );
    addDemeritsBoards(rowOfBoardsNode);
  }

  // This returned object becomes the defined value of this module
  return {
    addBoards: addBoards,
  };
});
