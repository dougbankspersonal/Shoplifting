define(["javascript/types", "dojo/domReady!"], function (types) {
  var numPlayers = 4;

  var maxTreats = 3;

  var boysPerPlayer = 3;

  console.assert(
    types.schoolboyNames.length >= numPlayers * boysPerPlayer,
    "Not enough schoolboy names for the number of players",
  );
  var numDieFaces = 6;

  // Basic set of die -> move/noise/steal.
  // Each boy has some reordered set of these die results.
  const coreDieResults = [
    {
      [types.iconTypes.move]: 1,
      [types.iconTypes.noise]: 1,
    },
    {
      [types.iconTypes.move]: 1,
      [types.iconTypes.noise]: 1,
      [types.iconTypes.steal]: 1,
    },
    {
      [types.iconTypes.move]: 2,
      [types.iconTypes.noise]: 1,
    },
    {
      [types.iconTypes.move]: 2,
      [types.iconTypes.noise]: 1,
      [types.iconTypes.steal]: 1,
    },
    {
      [types.iconTypes.move]: 4,
      [types.iconTypes.noise]: 1,
    },
    {
      [types.iconTypes.move]: 4,
      [types.iconTypes.noise]: 2,
      [types.iconTypes.steal]: 1,
    },
  ];

  // Basic set of modifier die results.  Each boy has same.
  const modifierDieConfigs = [
    {
      dieRoll: 1,
      [types.iconTypes.move]: 1,
    },
    {
      dieRoll: 2,
      [types.iconTypes.move]: -1,
    },
    {
      dieRoll: 3,
      [types.iconTypes.noise]: 1,
    },
    {
      dieRoll: 4,
      [types.iconTypes.noise]: -1,
    },
    {
      dieRoll: 5,
      [types.iconTypes.steal]: 1,
    },
    {
      dieRoll: 6,
      [types.iconTypes.steal]: -1,
    },
  ];

  console.assert(
    coreDieResults.length === numDieFaces,
    "basicSchoolBoyDieConfigs length should match the number of die faces",
  );

  // Player has n schoolboys.
  // Each boy has some permuted version of core die results.
  // This maps from boy index to permuted die results.
  var coreDieConfigsBySchoolboyIndex = [];

  function setupcoreDieConfigsBySchoolboyIndex() {
    var offset = 0;
    for (var j = 0; j < boysPerPlayer; j++) {
      var schoolboyRollPowers = [];
      for (var i = 0; i < numDieFaces; i++) {
        var basicPowerIndex = (i + offset) % numDieFaces;
        var copiedRollPower = structuredClone(coreDieResults[basicPowerIndex]);
        copiedRollPower.dieRoll = i + 1;
        schoolboyRollPowers.push(copiedRollPower);
      }
      coreDieConfigsBySchoolboyIndex.push(schoolboyRollPowers);
      offset++;
    }
  }

  var playerColorFamilies = [
    {
      light: "#eeeeff",
      medium: "#ccccff",
      dark: "#000044",
    },
    {
      light: "#ffeeee",
      medium: "#ffcccc",
      dark: "#440000",
    },
    {
      light: "#eeffee",
      medium: "#ccffcc",
      dark: "#004400",
    },
    {
      light: "#ffffcc",
      medium: "#ffff99",
      dark: "#444400",
    },
  ];

  setupcoreDieConfigsBySchoolboyIndex();

  // This returned object becomes the defined value of this module
  return {
    boysPerPlayer: boysPerPlayer,
    numPlayers: numPlayers,
    numDieFaces: numDieFaces,

    coreDieConfigsBySchoolboyIndex: coreDieConfigsBySchoolboyIndex,
    modifierDieConfigs: modifierDieConfigs,

    maxTreats: maxTreats,

    playerColorFamilies: playerColorFamilies,
  };
});
