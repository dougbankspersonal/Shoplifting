define([
  "sharedJavascript/genericUtils",
  "sharedJavascript/htmlUtils",
  "sharedJavascript/debugLog",
  "javascript/gameData",
  "javascript/types",
  "dojo/domReady!",
], function (genericUtils, htmlUtils, debugLogModule, gameData, types) {
  var debugLog = debugLogModule.debugLog;

  var getRandomZeroToOne =
    genericUtils.createSeededGetZeroToOneRandomFunction(83743874);

  function maybeAppendIcons(returnString, somethingPrior, config, iconType) {
    // Config should have a type.
    console.assert(config.type, "config should have a type");
    debugLog("maybeAppendIcons", "config = ", JSON.stringify(config));
    debugLog("maybeAppendIcons", "iconType = ", iconType);

    var value = config[iconType] || 0;
    debugLog("maybeAppendIcons", "value = ", value);

    if (Array.isArray(value)) {
      value = genericUtils.getRandomArrayElement(value, getRandomZeroToOne);
      debugLog("maybeAppendIcons", "randomized value = ", value);
    }
    if (value == 0) {
      debugLog("maybeAppendIcons", "value = 0");
      return [returnString, somethingPrior];
    }

    if (somethingPrior) {
      returnString += "/";
    }

    var wrappedIconString =
      "<span class=icon-" +
      iconType +
      ">" +
      types.iconStrings[iconType] +
      "</span>";

    if (value == 1) {
      returnString += wrappedIconString;
    } else {
      returnString += value.toString() + wrappedIconString;
    }
    return [returnString, true];
  }

  function addDieConfigNode(parent, dieConfig) {
    debugLog("addDieConfigNode", "dieConfig = ", JSON.stringify(dieConfig));
    debugLog("addDieConfigNode", "gameData = ", JSON.stringify(gameData));

    // Core and modifier die configs must have a die roll.  If there isn't one,
    // make one up.
    // No one else has a die roll, that's fine.
    var dieRoll = 0;
    if (
      dieConfig.type == types.powerTypes.core ||
      dieConfig.type == types.powerTypes.modifier
    ) {
      dieRoll = dieConfig.dieRoll;
      if (!dieRoll) {
        dieRoll = genericUtils.getRandomIntInRange(
          1,
          gameData.numDieFaces,
          getRandomZeroToOne,
        );
      }
    }

    var evolvingString = "";
    var somethingPrior = false;

    if (dieRoll) {
      var index = dieRoll - 1;
      var dieString = types.dieStrings[index];
      evolvingString = "<span class=die-roll>" + dieString + "</span>:";
    } else {
      // Power comes from consume.
      evolvingString = types.iconStrings[types.iconTypes.consume] + ":";
    }

    [evolvingString, somethingPrior] = maybeAppendIcons(
      evolvingString,
      somethingPrior,
      dieConfig,
      types.iconTypes.move,
    );

    [evolvingString, somethingPrior] = maybeAppendIcons(
      evolvingString,
      somethingPrior,
      dieConfig,
      types.iconTypes.noise,
    );
    [evolvingString, somethingPrior] = maybeAppendIcons(
      evolvingString,
      somethingPrior,
      dieConfig,
      types.iconTypes.steal,
    );
    [evolvingString, somethingPrior] = maybeAppendIcons(
      evolvingString,
      somethingPrior,
      dieConfig,
      types.iconTypes.reroll,
    );

    return htmlUtils.addDiv(
      parent,
      ["die-interpretation"],
      "die-interpretation-" + index,
      evolvingString,
    );
  }

  function scaleTextInDivs(className) {
    const elements = document.querySelectorAll(className);

    elements.forEach((el) => {
      let fontSize = parseInt(window.getComputedStyle(el).fontSize); // starting font size
      const minFont = 8; // don't shrink below this

      // shrink until it fits in one line
      while (el.scrollWidth > el.clientWidth && fontSize > minFont) {
        fontSize -= 1;
        el.style.fontSize = fontSize + "px";
      }
    });
  }

  // This returned object becomes the defined value of this module
  return {
    maybeAppendIcons: maybeAppendIcons,
    addDieConfigNode: addDieConfigNode,
    scaleTextInDivs: scaleTextInDivs,
  };
});
