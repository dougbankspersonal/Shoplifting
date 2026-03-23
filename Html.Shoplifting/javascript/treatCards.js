define([
  "dojo/dom",
  "dojo/dom-style",
  "sharedJavascript/cards",
  "sharedJavascript/htmlUtils",
  "sharedJavascript/debugLog",
  "sharedJavascript/genericMeasurements",
  "javascript/gameData",
  "javascript/treatData",
  "javascript/types",
  "javascript/utils",
  "dojo/domReady!",
], function (
  dom,
  domStyle,
  cards,
  htmlUtils,
  debugLogModule,
  genericMeasurements,
  gameData,
  treatData,
  types,
  utils,
) {
  var debugLog = debugLogModule.debugLog;

  function addStealingNode(parent, config) {
    var stealingConfig = config.stealing;
    console.assert(stealingConfig, "Expected config.stealing to be defined");

    var noiseString = "";
    [noiseString, _] = utils.maybeAppendIcons(
      noiseString,
      false,
      stealingConfig,
      types.iconTypes.noise,
    );

    var stealString = "";
    [stealString, _] = utils.maybeAppendIcons(
      stealString,
      false,
      stealingConfig,
      types.iconTypes.steal,
    );

    var stealingNode = htmlUtils.addDiv(parent, ["stealing"], "stealing");
    htmlUtils.addDiv(stealingNode, ["noise"], "noise", noiseString);
    htmlUtils.addDiv(stealingNode, ["steal"], "steal", stealString);
    return stealingNode;
  }

  function addPointsNode(parent, config) {
    var pointsNode = htmlUtils.addDiv(parent, ["points"], "points");

    var rewardsConfig = config.reward;
    console.assert(rewardsConfig, "Expected config.reward to be defined");

    var consumeString =
      types.iconStrings[types.iconTypes.consume] +
      ": " +
      rewardsConfig.consumePoints +
      types.iconStrings[types.iconTypes.reward];
    var saveString =
      types.iconStrings[types.iconTypes.save] +
      ": " +
      rewardsConfig.savePoints +
      types.iconStrings[types.iconTypes.reward];

    var consumeNode = htmlUtils.addDiv(
      pointsNode,
      ["consume-points"],
      "consume-points",
      consumeString,
    );
    var saveNode = htmlUtils.addDiv(
      pointsNode,
      ["save-points"],
      "save-points",
      saveString,
    );
    return pointsNode;
  }

  function maybeAddPowerNode(parent, config) {
    if (!config.power) {
      return null;
    }

    var powerType = config.power.type;
    var powerNode = htmlUtils.addDiv(parent, ["power", powerType], "power");

    utils.addDieConfigNode(powerNode, config.power);
  }

  function addCardFrontAtIndex(parent, index) {
    var config = cards.getCardConfigAtIndex(treatData.treatCardConfigs, index);

    var tierClass = "card-tier-" + config.tier;
    var powerTypeClass = config.power ? config.power.type : "no-power";

    var cardFrontNode = cards.addCardFront(
      parent,
      [tierClass, powerTypeClass],
      "card-front-" + index,
    );

    var titleWrapperNode = htmlUtils.addDiv(
      cardFrontNode,
      ["title-wrapper"],
      "title-wrapper",
    );

    var titleNode = htmlUtils.addDiv(
      titleWrapperNode,
      ["title"],
      "title",
      config.name,
    );

    var imageNode = htmlUtils.addImage(
      cardFrontNode,
      ["treat-image", config.class],
      "treat-image-" + index,
    );

    var pointsAndStealingWrapperNode = htmlUtils.addDiv(
      cardFrontNode,
      ["points-and-stealing-wrapper"],
      "points-and-stealing-wrapper-" + index,
    );

    addPointsNode(pointsAndStealingWrapperNode, config);
    addStealingNode(pointsAndStealingWrapperNode, config);

    maybeAddPowerNode(cardFrontNode, config);

    return cardFrontNode;
  }

  function addCardBackAtIndex(parent, index) {
    var config = cards.getCardConfigAtIndex(treatData.treatCardConfigs, index);
    var tier = config.tier;

    var title;
    if (tier == 0) {
      title = "🩷";
    } else if (tier == 1) {
      title = "🩷🩷";
    } else {
      title = "🩷🩷🩷";
    }

    var cardBackNode = cards.addCardBack(parent, index, {
      classes: ["card-tier-" + tier],
    });

    var titleNode = htmlUtils.addDiv(cardBackNode, ["title"], "title", title);
    return cardBackNode;
  }

  function addCards() {
    debugLog(
      "addCards",
      "treatData.treatCardConfigs = " +
        JSON.stringify(treatData.treatCardConfigs),
    );

    var numTreatCards = cards.getNumCardsFromConfigs(
      treatData.treatCardConfigs,
    );
    debugLog("addCards", "numTreatCards = " + numTreatCards);

    cards.addCards(numTreatCards, addCardFrontAtIndex, {
      callback: addCardBackAtIndex,
    });
  }

  // This returned object becomes the defined value of this module
  return {
    addCards: addCards,
  };
});
