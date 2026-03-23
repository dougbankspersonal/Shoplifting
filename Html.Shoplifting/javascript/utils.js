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

  function getDieRollFromConfig(config) {
    var dieRoll = config.dieRoll;
    if (!dieRoll) {
      dieRoll = genericUtils.getRandomIntInRange(
        1,
        gameData.numDieFaces,
        getRandomZeroToOne,
      );
    }
    return dieRoll;
  }

  function addActionsNode(parent, powerConfig, opt_dieRoll) {
    var evolvingString = "";
    var somethingPrior = false;

    if (opt_dieRoll) {
      console.assert(
        opt_dieRoll >= 1 && opt_dieRoll <= gameData.numDieFaces,
        "Invalid die roll",
      );
      var index = opt_dieRoll - 1;
      var dieString = types.dieStrings[index];
      evolvingString = "<span class=die-roll>" + dieString + "</span>:";
    } else {
      // Power comes from consume.
      evolvingString = types.iconStrings[types.iconTypes.consume] + ":";
    }

    [evolvingString, somethingPrior] = maybeAppendIcons(
      evolvingString,
      somethingPrior,
      powerConfig,
      types.iconTypes.move,
    );

    [evolvingString, somethingPrior] = maybeAppendIcons(
      evolvingString,
      somethingPrior,
      powerConfig,
      types.iconTypes.noise,
    );
    [evolvingString, somethingPrior] = maybeAppendIcons(
      evolvingString,
      somethingPrior,
      powerConfig,
      types.iconTypes.steal,
    );
    [evolvingString, somethingPrior] = maybeAppendIcons(
      evolvingString,
      somethingPrior,
      powerConfig,
      types.iconTypes.reroll,
    );

    return htmlUtils.addDiv(
      parent,
      ["actions"],
      "actions-" + index,
      evolvingString,
    );
  }

  // Add a node describing what happens with a particular die roll.
  // If the config has a die roll, use that.
  // Otherwise use a random die roll.
  function addDieConfigNode(parent, dieConfig) {
    debugLog("addDieConfigNode", "dieConfig = ", JSON.stringify(dieConfig));
    debugLog("addDieConfigNode", "gameData = ", JSON.stringify(gameData));

    var dieRoll = getDieRollFromConfig(dieConfig);

    return addActionsNode(parent, dieConfig, dieRoll);
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
    addActionsNode: addActionsNode,
    scaleTextInDivs: scaleTextInDivs,
  };
});
