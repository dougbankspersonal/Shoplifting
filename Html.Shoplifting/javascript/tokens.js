define([
  "dojo/dom",
  "dojo/dom-style",
  "sharedJavascript/htmlUtils",
  "sharedJavascript/debugLog",
  "sharedJavascript/genericMeasurements",
  "javascript/gameData",
  "dojo/domReady!",
], function (
  dom,
  domStyle,
  htmlUtils,
  debugLogModule,
  genericMeasurements,
  gameData,
) {
  var debugLog = debugLogModule.debugLog;

  var tokenSizePx = genericMeasurements.standardCardWidthPx * 0.6;

  function addTokenForSchoolboy(parent, playerIndex, boyIndex) {
    var schoolboyIndex = playerIndex * gameData.boysPerPlayer + boyIndex;
    var schoolboyName = gameData.schoolboyNames[schoolboyIndex];
    var schoolboyFirstInitial = schoolboyName[0];

    var tokenNode = htmlUtils.addDiv(
      parent,
      ["token"],
      "token",
      schoolboyFirstInitial,
    );

    domStyle.set(tokenNode, {
      "background-color": gameData.playerColorFamilies[playerIndex].medium,
      "border-color": gameData.playerColorFamilies[playerIndex].dark,
      width: tokenSizePx + "px",
      height: tokenSizePx + "px",
    });
    return tokenNode;
  }

  function addTokensForPlayer(parent, playerIndex) {
    var tokensForPlayerNode = htmlUtils.addDiv(parent, ["tokens-for-player"]);

    for (var i = 0; i < gameData.boysPerPlayer; i++) {
      addTokenForSchoolboy(tokensForPlayerNode, playerIndex, i);
    }
    return tokensForPlayerNode;
  }

  function addTokens() {
    var bodyNode = dom.byId("body");

    var tokensNode = htmlUtils.addDiv(bodyNode, ["tokens"], "tokens");

    for (var i = 0; i < gameData.numPlayers; i++) {
      addTokensForPlayer(tokensNode, i);
    }
  }

  // This returned object becomes the defined value of this module
  return {
    addTokens: addTokens,
  };
});
