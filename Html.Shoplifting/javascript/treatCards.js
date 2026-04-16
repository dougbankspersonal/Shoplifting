define([
  "sharedJavascript/cards",
  "sharedJavascript/htmlUtils",
  "sharedJavascript/debugLog",
  "javascript/treatData",
  "javascript/types",
  "javascript/utils",
  "dojo/domReady!",
], function (cards, htmlUtils, debugLogModule, treatData, types, utils) {
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

    var finalString = noiseString + ":" + stealString;

    var stealingNode = htmlUtils.addDiv(
      parent,
      ["stealing"],
      "stealing",
      finalString,
    );
    return stealingNode;
  }

  function addPointsNode(parent, config) {
    var rewardsConfig = config.reward;
    console.assert(rewardsConfig, "Expected config.reward to be defined");

    var consumeString =
      "<span class='consume'>" + rewardsConfig.consumePoints + "</span>";
    var saveString =
      "<span class='save'>" + rewardsConfig.savePoints + "</span>";
    var finalString =
      types.iconStrings[types.iconTypes.reward] +
      ":" +
      consumeString +
      "/" +
      saveString;
    var pointsNode = htmlUtils.addDiv(
      parent,
      ["points"],
      "points",
      finalString,
    );

    return pointsNode;
  }

  function maybeAddPowerNode(parent, config) {
    if (!config.power) {
      return null;
    }

    var powerType = config.power.type;
    var powerNode = htmlUtils.addDiv(parent, ["power", powerType], "power");

    // Depends on power type.
    if (
      powerType == types.powerTypes.modifier ||
      powerType == types.powerTypes.core
    ) {
      // There is a die involved.
      utils.addDieConfigNode(powerNode, config.power);
    } else {
      utils.addActionsNode(powerNode, config.power);
    }
  }

  function addCardFrontAtIndex(parent, index) {
    // Special case: last 3 cards are backs.
    var numTreatCards = cards.getNumCardsFromConfigs(
      treatData.treatCardConfigs,
    );

    if (index >= numTreatCards) {
      index = index - numTreatCards;
      return addCardBackAtIndex(parent, index);
    }

    var config = cards.getCardConfigAtIndex(treatData.treatCardConfigs, index);

    var tierClass = "card-tier-" + config.tier;
    var powerTypeClass = config.power ? config.power.type : "no-power";

    var cardFrontNode = cards.addCardFront(
      parent,
      [tierClass, powerTypeClass],
      "card-front-" + index,
    );

    // Info in corners.
    addPointsNode(cardFrontNode, config);
    addStealingNode(cardFrontNode, config);

    // Middle: title and powers.
    var middleNode = htmlUtils.addDiv(
      cardFrontNode,
      ["middle"],
      "middle-" + index,
    );

    var titleNode = htmlUtils.addDiv(
      middleNode,
      ["title"],
      "title",
      config.name,
    );

    maybeAddPowerNode(middleNode, config);

    return cardFrontNode;
  }

  function addCardBackAtIndex(parent, index) {
    var tier = index;

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

    cards.addCards(numTreatCards + 3, addCardFrontAtIndex, {
      callback: addCardBackAtIndex,
    });
  }

  // This returned object becomes the defined value of this module
  return {
    addCards: addCards,
  };
});
