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
      images: ["noise-die"],
    },
    {
      text: "B",
      classes: ["boy", "family-0"],
      images: ["noise-die"],
    },
    {
      text: "C",
      classes: ["boy", "family-0"],
      images: ["noise-die"],
    },
    {
      text: "D",
      classes: ["boy", "family-1"],
      images: ["noise-die"],
    },
    {
      text: "E",
      classes: ["boy", "family-1"],
      images: ["noise-die"],
    },
    {
      text: "F",
      classes: ["boy", "family-1"],
      images: ["noise-die"],
    },
    {
      text: "G",
      classes: ["boy", "family-2"],
      images: ["noise-die"],
    },
    {
      text: "H",
      classes: ["boy", "family-2"],
      images: ["noise-die"],
    },
    {
      text: "I",
      classes: ["boy", "family-2"],
      images: ["noise-die"],
    },
    {
      text: "J",
      classes: ["boy", "family-3"],
      images: ["noise-die"],
    },
    {
      text: "K",
      classes: ["boy", "family-3"],
      images: ["noise-die"],
    },
    {
      text: "L",
      classes: ["boy", "family-3"],
      images: ["noise-die"],
    },
    {
      text: "A",
      classes: ["boy", "back", "family-0"],
    },
    {
      text: "B",
      classes: ["boy", "back", "family-0"],
    },
    {
      text: "C",
      classes: ["boy", "back", "family-0"],
    },
    {
      text: "D",
      classes: ["boy", "back", "family-1"],
    },
    {
      text: "E",
      classes: ["boy", "back", "family-1"],
    },
    {
      text: "F",
      classes: ["boy", "back", "family-1"],
    },
    {
      text: "G",
      classes: ["boy", "back", "family-2"],
    },
    {
      text: "H",
      classes: ["boy", "back", "family-2"],
    },
    {
      text: "I",
      classes: ["boy", "back", "family-2"],
    },
    {
      text: "J",
      classes: ["boy", "back", "family-3"],
    },
    {
      text: "K",
      classes: ["boy", "back", "family-3"],
    },
    {
      text: "L",
      classes: ["boy", "back", "family-3"],
    },
    {
      text: types.iconStrings[types.iconTypes.demerit],
      classes: [types.iconTypes.demerit, "square"],
    },
    {
      text: "A",
      images: [types.iconTypes.steal],
      classes: [types.iconTypes.steal, "square", "family-0"],
    },
    {
      text: "B",
      images: [types.iconTypes.steal],
      classes: [types.iconTypes.steal, "square", "family-0"],
    },
    {
      text: "C",
      images: [types.iconTypes.steal],
      classes: [types.iconTypes.steal, "square", "family-0"],
    },
    {
      text: "D",
      images: [types.iconTypes.steal],
      classes: [types.iconTypes.steal, "square", "family-1"],
    },
    {
      text: "E",
      images: [types.iconTypes.steal],
      classes: [types.iconTypes.steal, "square", "family-1"],
    },
    {
      text: "F",
      images: [types.iconTypes.steal],
      classes: [types.iconTypes.steal, "square", "family-1"],
    },
    {
      text: "G",
      images: [types.iconTypes.steal],
      classes: [types.iconTypes.steal, "square", "family-2"],
    },
    {
      text: "H",
      images: [types.iconTypes.steal],
      classes: [types.iconTypes.steal, "square", "family-2"],
    },
    {
      text: "I",
      images: [types.iconTypes.steal],
      classes: [types.iconTypes.steal, "square", "family-2"],
    },
    {
      text: "J",
      images: [types.iconTypes.steal],
      classes: [types.iconTypes.steal, "square", "family-3"],
    },
    {
      text: "K",
      images: [types.iconTypes.steal],
      classes: [types.iconTypes.steal, "square", "family-3"],
    },
    {
      text: "L",
      images: [types.iconTypes.steal],
      classes: [types.iconTypes.steal, "square", "family-3"],
    },
    /*
    {
      text:
        "<span class=plus-minus>+/-</span>" +
        types.iconStrings[types.iconTypes.noise],
      classes: [types.iconTypes.noise, "one-shot"],
    },
    {
      text:
        "<span class=plus-minus>+/-</span>" +
        types.iconStrings[types.iconTypes.move],
      classes: [types.iconTypes.move, "one-shot"],
    },
    */
    {
      images: [gameData.oneShotTypes.MoveFlipDie],
      classes: ["one-shot", "square"],
    },
    {
      images: [gameData.oneShotTypes.NoiseFlipDie],
      classes: ["one-shot", "square"],
    },
    {
      images: [gameData.oneShotTypes.SecretPassage],
      classes: ["one-shot", "square"],
    },
    {
      images: [gameData.oneShotTypes.NoSteal],
      classes: ["one-shot", "square"],
    },
    {
      images: [gameData.oneShotTypes.Persuasion],
      classes: ["one-shot", "square"],
    },
    {
      images: ["professor"],
      classes: [],
    },
  ];

  var tokenSizePx = genericMeasurements.standardCardWidthPx * 0.6;

  function addToken(parent, tokenConfig) {
    var classes = ["token"];
    classes = classes.concat(tokenConfig.classes);

    var tokenNode = htmlUtils.addDiv(parent, classes, "token");

    if (tokenConfig.text) {
      htmlUtils.addDiv(
        tokenNode,
        ["token-text"],
        "token-text",
        tokenConfig.text,
      );
      if (tokenConfig.die) {
        htmlUtils.addDiv(tokenNode, ["die-indicator"], "die-indicator");
      }
    }
    if (tokenConfig.images) {
      for (var i = 0; i < tokenConfig.images.length; i++) {
        var imageName = tokenConfig.images[i];
        htmlUtils.addImage(tokenNode, [imageName], "token-image");
      }
    }

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
