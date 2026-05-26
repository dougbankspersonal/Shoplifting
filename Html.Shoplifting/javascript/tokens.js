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

  var tokenSizePx = genericMeasurements.standardCardWidthPx * 0.6;

  function addToken(parent, tokenConfig) {
    var classes = ["token"];
    classes = classes.concat(tokenConfig.classes);

    var tokenNode = htmlUtils.addDiv(parent, classes, "token");

    if (tokenConfig.tokenColorFamily) {
      domStyle.set(tokenNode, {
        border: "12px solid " + tokenConfig.tokenColorFamily.dark,
        color: tokenConfig.tokenColorFamily.dark,
      });
    }

    if (tokenConfig.text) {
      var textNode = htmlUtils.addDiv(
        tokenNode,
        ["token-text"],
        "token-text",
        tokenConfig.text,
      );

      if (tokenConfig.textBackgroundColor) {
        domStyle.set(textNode, {
          "background-color": tokenConfig.textBackgroundColor,
          "border-radius": "50%",
          border: "4px solid black",
          "aspect-ratio": "1 / 1",
        });
      }
    }
    if (tokenConfig.die) {
      htmlUtils.addDiv(tokenNode, ["die-indicator"], "die-indicator");
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

  function generateOneShotTokenConfigs() {
    var oneShotTokenConfigs = [];

    for (var i = 0; i < types.oneShotTypesArray.length; i++) {
      var oneShotType = types.oneShotTypesArray[i];
      var tokenConfig = {
        images: [oneShotType],
        classes: ["one-shot", "square"],
      };
      oneShotTokenConfigs.push(tokenConfig);
    }

    return oneShotTokenConfigs;
  }

  function generatePerBoyTokenConfigs() {
    var boySide1Configs = [];
    var boySide2Configs = [];
    var stealSide1Configs = [];
    var stealSide2Configs = [];

    for (var i = 0; i < types.schoolboyConfigs.length; i++) {
      var schoolboyConfig = types.schoolboyConfigs[i];
      var boyFavorite = schoolboyConfig.favorite;
      var boyName = schoolboyConfig.name;
      var boyFirstInitial = boyName[0].toUpperCase();

      debugLog(
        "generatePerBoyTokenConfigs",
        "schoolboyConfig = ",
        JSON.stringify(schoolboyConfig),
      );

      var schoolboyConfigFamily = schoolboyConfig.family;
      debugLog(
        "generatePerBoyTokenConfigs",
        "schoolboyConfigFamily = " + schoolboyConfigFamily,
      );

      debugLog(
        "generatePerBoyTokenConfigs",
        "gameData.playerColorFamilies = " +
          JSON.stringify(gameData.playerColorFamilies),
      );

      var tokenColorFamily =
        gameData.playerColorFamilies[schoolboyConfig.family];

      var boySide1StealConfig = {
        text: boyFirstInitial,
        tokenColorFamily: tokenColorFamily,
        images: [types.iconTypes.steal],
        classes: [
          types.iconTypes.steal,
          "square",
          "family-" + schoolboyConfig.family,
        ],
      };
      stealSide1Configs.push(boySide1StealConfig);

      var boySide2StealConfig = {
        text: boyFirstInitial,
        tokenColorFamily: tokenColorFamily,
        images: ["double-steal"],
        classes: [
          types.iconTypes.steal,
          "square",
          "family-" + schoolboyConfig.family,
        ],
      };
      stealSide2Configs.push(boySide2StealConfig);

      var boySideOneTokenConfig = {
        text: boyFirstInitial,
        images: ["noise-die"],
        classes: ["boy", "family-" + schoolboyConfig.family],
        tokenColorFamily: tokenColorFamily,
      };

      boySide1Configs.push(boySideOneTokenConfig);

      var boySideTwoTokenConfig = {
        text: boyFirstInitial,
        textBackgroundColor: boyFavorite.color,
        classes: ["boy", "back", "family-" + schoolboyConfig.family],
        tokenColorFamily: tokenColorFamily,
      };
      boySide2Configs.push(boySideTwoTokenConfig);
    }
    return boySide1Configs.concat(
      boySide2Configs,
      stealSide1Configs,
      stealSide2Configs,
    );
  }

  function getAugmentedTokenConfigs() {
    var rawTokenConfigs = types.rawTokenConfigs;
    // Roll extra configs on the fly for boys and teams.
    var perBoyTokenConfigs = generatePerBoyTokenConfigs();
    var oneShotTokenConfigs = generateOneShotTokenConfigs();
    return rawTokenConfigs.concat(perBoyTokenConfigs, oneShotTokenConfigs);
  }

  function addTokens() {
    var bodyNode = dom.byId("body");

    allTokensNode = htmlUtils.addDiv(bodyNode, ["tokens"], "tokens");

    currentTokensRowNode = htmlUtils.addDiv(
      allTokensNode,
      ["row-of-tokens"],
      "row-of-tokens",
    );

    var tokenConfigs = getAugmentedTokenConfigs();
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
