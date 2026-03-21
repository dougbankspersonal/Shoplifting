define([
  "dojo/dom",
  "dojo/dom-style",
  "sharedJavascript/cards",
  "sharedJavascript/htmlUtils",
  "sharedJavascript/debugLog",
  "sharedJavascript/genericMeasurements",
  "javascript/gameData",
  "dojo/domReady!",
], function (
  dom,
  domStyle,
  cards,
  htmlUtils,
  debugLogModule,
  genericMeasurements,
  gameData,
) {
  var debugLog = debugLogModule.debugLog;

  function addCardFrontAtIndex(parent, index) {
    var config = cards.getCardConfigAtIndex(gameData.treatCardConfigs, index);

    var tierClass = "card-tier-" + config.tier;
    var powerTypeClass = config.power ? config.power.type : "no-power";

    var cardFrontNode = cards.addCardFront(
      parent,
      [tierClass, powerTypeClass],
      "card-front-" + index,
    );

    var titleNode = htmlUtils.addDiv(
      cardFrontNode,
      ["title"],
      "title",
      config.name,
    );
    return cardFrontNode;
  }

  function addCardBackAtIndex(parent, index) {
    var config = cards.getCardConfigAtIndex(gameData.treatCardConfigs, index);
    var tier = config.tier;

    var title;
    if (tier == 0) {
      title = "Tasty";
    } else if (tier == 1) {
      title = "Delicious";
    } else {
      title = "Scrumptious";
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
      "ameData.treatCardConfigs = " + JSON.stringify(gameData.treatCardConfigs),
    );

    var numTreatCards = cards.getNumCardsFromConfigs(gameData.treatCardConfigs);
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
