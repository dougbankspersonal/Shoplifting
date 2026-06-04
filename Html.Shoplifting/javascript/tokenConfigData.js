define([
  "sharedJavascript/debugLog",
  "sharedJavascript/screentop/seatColors",
  "javascript/gameData",
  "dojo/domReady!",
], function (debugLogModule, seatColors, gameData) {
  var debugLog = debugLogModule.debugLog;

  const gRawTokenConfigs = [
    {
      text: gameData.iconStrings[gameData.iconTypes.demerit],
      classes: [gameData.iconTypes.demerit, "square"],
    },
    {
      images: ["professor"],
      classes: [],
    },
  ];

  function generatePerBoyTokenConfigs() {
    var boySide1TokenConfigs = [];
    var boySide2TokenConfigs = [];
    var stealSide1TokenConfigs = [];
    var stealSide2TokenConfigs = [];

    for (var i = 0; i < gameData.boyConfigs.length; i++) {
      var boyConfig = gameData.boyConfigs[i];
      var boyName = boyConfig.name;
      var boyFirstInitial = boyName[0].toUpperCase();

      debugLog(
        "generatePerBoyTokenConfigs",
        "boyConfig = ",
        JSON.stringify(boyConfig),
      );

      var boyConfigFamily = boyConfig.family;
      debugLog(
        "generatePerBoyTokenConfigs",
        "boyConfigFamily = " + boyConfigFamily,
      );

      var seatIndex = Math.floor(i / gameData.boysPerPlayer);
      var lightColorFamily = seatColors.getLightColorFamilyForSeat(seatIndex);
      var mediumColorFamily = seatColors.getMediumColorFamilyForSeat(seatIndex);

      var favoriteTreatConfig = boyConfig.favoriteTreatConfig;
      var favoriteColor = favoriteTreatConfig.color;

      var boyConfigTemplate = {
        text: boyFirstInitial,
        borderWidth: gameData.boyBorderWidth,
      };

      // Copy the template and add new fields.
      var stealSide1TokenConfig = structuredClone(boyConfigTemplate);
      stealSide1TokenConfig.images = [gameData.iconTypes.steal];
      stealSide1TokenConfig.classes = [
        gameData.iconTypes.steal,
        "square",
        "boy",
      ];
      stealSide1TokenConfig.colorFamily = mediumColorFamily;
      stealSide1TokenConfigs.push(stealSide1TokenConfig);

      var stealSide2TokenConfig = structuredClone(boyConfigTemplate);
      stealSide2TokenConfig.images = ["double-steal"];
      stealSide2TokenConfig.classes = [
        gameData.iconTypes.steal,
        "square",
        "boy",
      ];
      stealSide2TokenConfig.colorFamily = mediumColorFamily;
      stealSide2TokenConfigs.push(stealSide2TokenConfig);

      var boySide1TokenConfig = structuredClone(boyConfigTemplate);
      boySide1TokenConfig.images = ["move-die"];
      boySide1TokenConfig.classes = ["boy", "moved", "square"];
      boySide1TokenConfig.colorFamily = lightColorFamily;
      boySide1TokenConfig.colorFamily.border = favoriteColor;
      boySide1TokenConfigs.push(boySide1TokenConfig);

      var boySide2TokenConfig = structuredClone(boyConfigTemplate);
      boySide2TokenConfig.classes = ["boy", "not-moved", "square"];
      boySide2TokenConfig.colorFamily = lightColorFamily;
      boySide2TokenConfig.colorFamily.border = favoriteColor;
      boySide2TokenConfigs.push(boySide2TokenConfig);
    }
    return boySide1TokenConfigs.concat(
      boySide2TokenConfigs,
      stealSide1TokenConfigs,
      stealSide2TokenConfigs,
    );
  }

  function generateOneShotTokenConfigs() {
    var oneShotTokenConfigs = [];

    for (var i = 0; i < gameData.oneShotTypesArray.length; i++) {
      var oneShotType = gameData.oneShotTypesArray[i];
      var tokenConfig = {
        images: [oneShotType],
        classes: ["one-shot", "square"],
      };
      oneShotTokenConfigs.push(tokenConfig);
    }

    return oneShotTokenConfigs;
  }

  function generateTokenConfigs() {
    // Roll extra configs on the fly for boys and teams.
    var perBoyTokenConfigs = generatePerBoyTokenConfigs();
    var oneShotTokenConfigs = generateOneShotTokenConfigs();
    var finalTokenConfigs = perBoyTokenConfigs.concat(
      oneShotTokenConfigs,
      gRawTokenConfigs,
    );
    return finalTokenConfigs;
  }

  var gTokenConfigs = null;
  function getTokenConfigs() {
    if (gTokenConfigs) {
      return gTokenConfigs;
    }
    gTokenConfigs = generateTokenConfigs();
    return gTokenConfigs;
  }

  // This returned object becomes the defined value of this module
  return {
    getTokenConfigs: getTokenConfigs,
  };
});
