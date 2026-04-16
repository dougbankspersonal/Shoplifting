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
  var tokensPerRow = 10;
  var globalTokenCount = 0;
  var allTokensNode;
  var currentTokensRowNode;

  var tokenConfigs = [
    {
      text: "A",
      classes: ["boy", "family-0"],
    },
    {
      text: "B",
      classes: ["boy", "family-0"],
    },
    {
      text: "C",
      classes: ["boy", "family-0"],
    },
    {
      text: "D",
      classes: ["boy", "family-1"],
    },
    {
      text: "E",
      classes: ["boy", "family-1"],
    },
    {
      text: "F",
      classes: ["boy", "family-1"],
    },
    {
      text: "G",
      classes: ["boy", "family-2"],
    },
    {
      text: "H",
      classes: ["boy", "family-2"],
    },
    {
      text: "I",
      classes: ["boy", "family-2"],
    },
    {
      text: "J",
      classes: ["boy", "family-3"],
    },
    {
      text: "K",
      classes: ["boy", "family-3"],
    },
    {
      text: "L",
      classes: ["boy", "family-3"],
    },
    {
      text: types.iconStrings[types.iconTypes.demerit],
      classes: ["token", types.iconTypes.demerit, "square"],
    },
    {
      text: types.iconStrings[types.iconTypes.noise],
      classes: ["token", types.iconTypes.noise, "square", "family-0"],
    },
    {
      text: types.iconStrings[types.iconTypes.noise],
      classes: ["token", types.iconTypes.noise, "square", "family-1"],
    },
    {
      text: types.iconStrings[types.iconTypes.noise],
      classes: ["token", types.iconTypes.noise, "square", "family-2"],
    },
    {
      text: types.iconStrings[types.iconTypes.noise],
      classes: ["token", types.iconTypes.noise, "square", "family-3"],
    },
    {
      text: types.iconStrings[types.iconTypes.steal],
      classes: ["token", types.iconTypes.noise, "square", "family-0"],
    },
    {
      text: types.iconStrings[types.iconTypes.steal],
      classes: ["token", types.iconTypes.noise, "square", "family-1"],
    },
    {
      text: types.iconStrings[types.iconTypes.steal],
      classes: ["token", types.iconTypes.noise, "square", "family-2"],
    },
    {
      text: types.iconStrings[types.iconTypes.steal],
      classes: ["token", types.iconTypes.noise, "square", "family-3"],
    },
    {
      text:
        "<span class=plus-minus>+/-</span>" +
        types.iconStrings[types.iconTypes.noise],
      classes: ["token", types.iconTypes.noise, "one-shot"],
    },
    {
      text:
        "<span class=plus-minus>+/-</span>" +
        types.iconStrings[types.iconTypes.steal],
      classes: ["token", types.iconTypes.steal, "one-shot"],
    },
    {
      text: types.iconStrings[types.iconTypes.reroll],
      classes: ["token", types.iconTypes.reroll, "one-shot"],
    },
    {
      text: types.iconStrings[types.iconTypes.teacher],
      classes: ["token", types.iconTypes.teacher],
    },
  ];

  var tokenSizePx = genericMeasurements.standardCardWidthPx * 0.6;

  function addToken(parent, tokenConfig) {
    var classes = ["token"];
    classes = classes.concat(tokenConfig.classes);

    var tokenNode = htmlUtils.addDiv(
      parent,
      classes,
      "token",
      tokenConfig.text,
    );
    domStyle.set(tokenNode, {
      width: tokenSizePx + "px",
      height: tokenSizePx + "px",
    });

    return tokenNode;
  }

  function maybeUpdateRow() {
    globalTokenCount++;
    if (globalTokenCount % tokensPerRow === 0) {
      currentTokensRowNode = htmlUtils.addDiv(
        allTokensNode,
        ["row-of-tokens"],
        "row-of-tokens",
      );
    }
  }

  function addTokens() {
    var bodyNode = dom.byId("body");

    allTokensNode = htmlUtils.addDiv(bodyNode, ["tokens"], "tokens");

    currentTokensRowNode = htmlUtils.addDiv(
      allTokensNode,
      ["row-of-tokens"],
      "row-of-tokens",
    );

    for (var i = 0; i < tokenConfigs.length; i++) {
      var tokenConfig = tokenConfigs[i];
      addToken(currentTokensRowNode, tokenConfig);
      maybeUpdateRow();
    }
  }

  // This returned object becomes the defined value of this module
  return {
    addTokens: addTokens,
  };
});
