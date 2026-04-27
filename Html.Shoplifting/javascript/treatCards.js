define([
  "sharedJavascript/cards",
  "sharedJavascript/htmlUtils",
  "sharedJavascript/debugLog",
  "javascript/gameData",
  "javascript/types",
  "javascript/utils",
  "dojo/domReady!",
], function (cards, htmlUtils, debugLogModule, gameData, types, utils) {
  var debugLog = debugLogModule.debugLog;

  var _treatCardConfigs = null;
  function getTreatCardConfigs() {
    if (_treatCardConfigs) {
      return _treatCardConfigs;
    }

    var rawTreat0CardConfigs = gameData.treat0CardConfigs;
    var rawTreat1CardConfigs = gameData.treat1CardConfigs;

    // Fill in some basic data true for all low end configs.
    var updatedTreat0CardConfigs = [];
    for (var i = 0; i < rawTreat0CardConfigs.length; i++) {
      var config = structuredClone(rawTreat0CardConfigs[i]);
      config.tier = 0;
      config.stealing = {
        steal: 1,
        noise: 0,
      };
      config.reward = {
        pocketPoints: gameData.treat0PocketPoints,
        tummyPoints: gameData.treat0TummyPoints,
      };
      config.count = gameData.treat0InstanceCount;

      updatedTreat0CardConfigs.push(config);
    }

    // Basic data true for all high end configs.
    var updatedTreat1CardConfigs = [];
    for (var i = 0; i < rawTreat1CardConfigs.length; i++) {
      var config = structuredClone(rawTreat1CardConfigs[i]);
      config.tier = 1;
      config.count = gameData.treat1InstanceCount;

      updatedTreat1CardConfigs.push(config);
    }

    // Concat them together.
    _treatCardConfigs = updatedTreat0CardConfigs.concat(
      updatedTreat1CardConfigs,
    );
    debugLog(
      "getTreatCardConfigs",
      "_treatCardConfigs = " + JSON.stringify(_treatCardConfigs),
    );

    return _treatCardConfigs;
  }

  function addStealingNode(parent, config) {
    var stealingConfig = config.stealing;
    console.assert(stealingConfig, "Expected config.stealing to be defined");

    var noiseString = "";
    [noiseString, addedNoise] = utils.maybeAppendIcons(
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

    var finalString;
    if (addedNoise) {
      finalString = noiseString + ":" + stealString;
    } else {
      finalString = stealString;
    }

    var stealingNode = htmlUtils.addDiv(
      parent,
      ["stealing", "card-stats"],
      "stealing",
      finalString,
    );
    return stealingNode;
  }

  function addPointsNode(parent, config) {
    var rewardsConfig = config.reward;
    console.assert(rewardsConfig, "Expected config.reward to be defined");

    var consumeString =
      "<span class='consume'>" + rewardsConfig.tummyPoints + "</span>";
    var saveString =
      "<span class='save'>" + rewardsConfig.pocketPoints + "</span>";
    var finalString =
      types.iconStrings[types.iconTypes.reward] +
      ":" +
      consumeString +
      "/" +
      saveString;
    var pointsNode = htmlUtils.addDiv(
      parent,
      ["points", "card-stats"],
      "points",
      finalString,
    );

    return pointsNode;
  }

  function maybeAddOneShotNode(parent, config, index) {
    if (config.tier != 0) {
      return null;
    }
    var oneShotType =
      gameData.oneShotTypesArray[index % gameData.oneShotTypesArray.length];

    var oneShotNode = htmlUtils.addImage(
      parent,
      ["one-shot", oneShotType, "token"],
      "one-shot-" + index,
    );
    return oneShotNode;
  }

  function addCardFrontAtIndex(parent, index) {
    debugLog("addCardFrontAtIndex", "index = ", index);

    var treatCardConfigs = getTreatCardConfigs();
    debugLog(
      "addCardFrontAtIndex",
      "treatCardConfigs = ",
      JSON.stringify(treatCardConfigs),
    );

    // Special case: last 3 cards are backs.
    var numTreatCards = cards.getNumCardsFromConfigs(treatCardConfigs);

    if (index >= numTreatCards) {
      index = index - numTreatCards;
      return addCardBackAtIndex(parent, index);
    }

    var config = cards.getCardConfigAtIndex(treatCardConfigs, index);
    debugLog("addCardFrontAtIndex", "config = ", JSON.stringify(config));

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

    maybeAddOneShotNode(middleNode, config, index);

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
    var treatCardConfigs = getTreatCardConfigs();

    debugLog(
      "addCards",
      "treatCardConfigs = " + JSON.stringify(treatCardConfigs),
    );

    var numTreatCards = cards.getNumCardsFromConfigs(treatCardConfigs);
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
