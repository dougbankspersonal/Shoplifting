define([
  "dojo/dom",
  "dojo/dom-style",
  "sharedJavascript/debugLog",
  "sharedJavascript/htmlUtils",
  "javascript/gameData",
  "javascript/tokenConfigData",
  "dojo/domReady!",
], function (
  dom,
  domStyle,
  debugLogModule,
  htmlUtils,
  gameData,
  tokenConfigData,
) {
  var debugLog = debugLogModule.debugLog;
  var tokensPerRow = 10;
  var globalTokenCount = 0;
  var allTokensNode;
  var currentTokensRowNode;

  function addToken(parent, tokenConfig) {
    var classes = ["token"];
    classes = classes.concat(tokenConfig.classes);

    var tokenNode = htmlUtils.addDiv(parent, classes, "token");

    htmlUtils.applyColorFamily(tokenNode, tokenConfig.colorFamily);

    var borderWidth = tokenConfig.borderWidth
      ? tokenConfig.borderWidth
      : gameData.defaultBorderWidth;
    domStyle.set(tokenNode, {
      "border-width": borderWidth + "px",
    });

    if (tokenConfig.colorFamily) {
      var borderWidth = tokenConfig.borderWidth
        ? tokenConfig.borderWidth
        : gameData.defaultBorderWidth;

      domStyle.set(tokenNode, {
        border: borderWidth + "px solid " + tokenConfig.colorFamily.border,
        color: tokenConfig.colorFamily.font,
        background:
          "linear-gradient(to bottom, " +
          tokenConfig.colorFamily.gradient1 +
          " 0%, " +
          tokenConfig.colorFamily.gradient2 +
          " 100%)",
      });
    }

    if (tokenConfig.text) {
      var textNode = htmlUtils.addDiv(
        tokenNode,
        ["token-text"],
        "token-text",
        tokenConfig.text,
      );
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

  function addTokens() {
    var bodyNode = dom.byId("body");

    allTokensNode = htmlUtils.addDiv(bodyNode, ["tokens"], "tokens");

    currentTokensRowNode = htmlUtils.addDiv(
      allTokensNode,
      ["row-of-tokens"],
      "row-of-tokens",
    );

    var tokenConfigs = tokenConfigData.getTokenConfigs();
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
