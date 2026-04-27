define(["javascript/types", "javascript/gameData", "dojo/domReady!"], function (
  types,
  gameData,
) {
  var pocketsPerBoy = 2;

  var gameVariant = "oneDieForAllSchoolboysCore";

  console.assert(
    types.schoolboyNames.length >= gameData.numPlayers * gameData.boysPerPlayer,
    "Not enough schoolboy names for the number of players",
  );

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
    coreDieResults.length === gameData.numDieFaces,
    "basicSchoolBoyDieConfigs length should match the number of die faces",
  );

  // Player has n schoolboys.
  // Each boy has some permuted version of core die results.
  // This maps from boy index to permuted die results.
  var coreDieConfigsBySchoolboyIndex = [];

  // In this game variant a player assigned a single die set the core die result for each
  // schoolboy.
  function setupOneDieForAllSchoolboysCore() {
    // The idea is we want something different but plausible for each roll.
    var schoolboy1Core = [];
    var schoolboy2Core = [];
    var schoolboy3Core = [];

    // First 3: small move steals, larger moves move and make noise.
    schoolboy1Core.push({
      dieRoll: 1,
      [types.iconTypes.move]: 1,
      [types.iconTypes.noise]: 1,
      [types.iconTypes.steal]: 1,
    });
    schoolboy2Core.push({
      dieRoll: 1,
      [types.iconTypes.move]: 2,
      [types.iconTypes.noise]: 1,
    });
    schoolboy3Core.push({
      dieRoll: 1,
      [types.iconTypes.move]: 3,
      [types.iconTypes.noise]: 1,
    });

    schoolboy1Core.push({
      dieRoll: 2,
      [types.iconTypes.move]: 3,
      [types.iconTypes.noise]: 1,
    });
    schoolboy2Core.push({
      dieRoll: 2,
      [types.iconTypes.move]: 1,
      [types.iconTypes.noise]: 1,
      [types.iconTypes.steal]: 1,
    });
    schoolboy3Core.push({
      dieRoll: 2,
      [types.iconTypes.move]: 2,
      [types.iconTypes.noise]: 1,
    });

    schoolboy1Core.push({
      dieRoll: 3,
      [types.iconTypes.move]: 2,
      [types.iconTypes.noise]: 1,
    });
    schoolboy2Core.push({
      dieRoll: 3,
      [types.iconTypes.move]: 3,
      [types.iconTypes.noise]: 1,
    });
    schoolboy3Core.push({
      dieRoll: 3,
      [types.iconTypes.move]: 1,
      [types.iconTypes.noise]: 1,
      [types.iconTypes.steal]: 1,
    });

    // 4 Special: lotta movement and 1 steals sneaky.
    schoolboy1Core.push({
      dieRoll: 4,
      [types.iconTypes.move]: 3,
      [types.iconTypes.steal]: 1,
    });
    schoolboy2Core.push({
      dieRoll: 4,
      [types.iconTypes.move]: 5,
      [types.iconTypes.noise]: 1,
    });
    schoolboy3Core.push({
      dieRoll: 4,
      [types.iconTypes.move]: 3,
      [types.iconTypes.noise]: 1,
    });

    // 5: Super steal, big noise.
    schoolboy1Core.push({
      dieRoll: 5,
      [types.iconTypes.move]: 1,
      [types.iconTypes.noise]: 2,
    });
    schoolboy2Core.push({
      dieRoll: 5,
      [types.iconTypes.move]: 2,
      [types.iconTypes.noise]: 1,
      [types.iconTypes.steal]: 2,
    });
    schoolboy3Core.push({
      dieRoll: 5,
      [types.iconTypes.move]: 3,
      [types.iconTypes.noise]: 1,
    });

    // Super steal.
    schoolboy1Core.push({
      dieRoll: 6,
      [types.iconTypes.noise]: 1,
      [types.iconTypes.steal]: 1,
    });
    schoolboy2Core.push({
      dieRoll: 6,
      [types.iconTypes.noise]: 1,
      [types.iconTypes.steal]: 1,
    });
    schoolboy3Core.push({
      dieRoll: 6,
      [types.iconTypes.noise]: 1,
      [types.iconTypes.steal]: 1,
    });

    coreDieConfigsBySchoolboyIndex.push(
      schoolboy1Core,
      schoolboy2Core,
      schoolboy3Core,
    );
    return coreDieConfigsBySchoolboyIndex;
  }

  setupOneDieForAllSchoolboysCore();

  // This returned object becomes the defined value of this module
  return {
    coreDieConfigsBySchoolboyIndex: coreDieConfigsBySchoolboyIndex,
    modifierDieConfigs: modifierDieConfigs,
    pocketsPerBoy: pocketsPerBoy,
  };
});
