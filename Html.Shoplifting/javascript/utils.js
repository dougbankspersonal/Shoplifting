define([
  "sharedJavascript/genericUtils",
  "sharedJavascript/debugLog",
  "javascript/gameData",
  "dojo/domReady!",
], function (genericUtils, debugLogModule, gameData) {
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
      "<span class=" +
      iconType +
      ' icon">' +
      gameData.iconStrings[iconType] +
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
    scaleTextInDivs: scaleTextInDivs,
  };
});
