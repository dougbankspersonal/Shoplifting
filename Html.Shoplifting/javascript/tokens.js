define([
  "dojo/dom",
  "dojo/dom-style",
  "sharedJavascript/htmlUtils",
  "sharedJavascript/debugLog",
  "sharedJavascript/genericMeasurements",
  "javascript/gameData",
  "javascript/types",
  "dojo/domReady!",
], function (
  dom,
  domStyle,
  htmlUtils,
  debugLogModule,
  genericMeasurements,
  gameData,
  types,
) {
  var debugLog = debugLogModule.debugLog;

  var tokenSizePx = genericMeasurements.standardCardWidthPx * 0.6;

  function addToken(parent, color, borderColor, text, opt_classes) {
    var classes = ["token"];
    if (opt_classes) {
      classes = classes.concat(opt_classes);
    }
    var tokenNode = htmlUtils.addDiv(parent, classes, "token", text);

    domStyle.set(tokenNode, {
      "background-color": color,
      "border-color": borderColor,
      width: tokenSizePx + "px",
      height: tokenSizePx + "px",
    });
    return tokenNode;
  }

  function addTokenForSchoolboy(parent, playerIndex, boyIndex) {
    var schoolboyIndex = playerIndex * gameData.boysPerPlayer + boyIndex;
    var schoolboyName = types.schoolboyNames[schoolboyIndex];
    var schoolboyFirstInitial = schoolboyName[0];

    var tokenNode = addToken(
      parent,
      gameData.playerColorFamilies[playerIndex].medium,
      gameData.playerColorFamilies[playerIndex].dark,
      schoolboyFirstInitial,
      ["schoolboy"],
    );
    return tokenNode;
  }

  function addDemeritToken(parent) {
    return addToken(
      parent,
      "#aaaaaa",
      "#555555",
      types.iconStrings[types.iconTypes.demerit],
      ["demerit"],
    );
  }

  function addNoiseToken(parent) {
    return addToken(
      parent,
      "#aaaa88",
      "#555533",
      types.iconStrings[types.iconTypes.noise],
      ["noise"],
    );
  }

  function addTokensForPlayer(parent, playerIndex) {
    var rowOfTokensNode = htmlUtils.addDiv(parent, ["row-of-tokens"]);

    for (var i = 0; i < gameData.boysPerPlayer; i++) {
      addTokenForSchoolboy(rowOfTokensNode, playerIndex, i);
    }
    return rowOfTokensNode;
  }

  function addTokens() {
    var bodyNode = dom.byId("body");

    var tokensNode = htmlUtils.addDiv(bodyNode, ["tokens"], "tokens");

    for (var i = 0; i < gameData.numPlayers; i++) {
      addTokensForPlayer(tokensNode, i);
    }

    var rowOfTokensNode = htmlUtils.addDiv(tokensNode, ["row-of-tokens"]);
    addDemeritToken(rowOfTokensNode);
    addNoiseToken(rowOfTokensNode);
  }

  // This returned object becomes the defined value of this module
  return {
    addTokens: addTokens,
  };
});
