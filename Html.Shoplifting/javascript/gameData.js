define([], function () {
  var numPlayers = 4;

  var schoolboyNames = [
    "Abner",
    "Benedict",
    "Charles",
    "Dudley",
    "Eugene",
    "Frederick",
    "George",
    "Henry",
    "Irving",
    "James",
    "Kenneth",
    "Lytton",
  ];

  var maxTreats = 3;
  var maxPowers = 3;

  var boysPerPlayer = 3;

  console.assert(
    schoolboyNames.length >= numPlayers * boysPerPlayer,
    "Not enough schoolboy names for the number of players",
  );
  var numDieFaces = 6;

  var d1String = "⚀";
  var d2String = "⚁";
  var d3String = "⚂";
  var d4String = "⚃";
  var d5String = "⚄";
  var d6String = "⚅";

  var dieStrings = [d1String, d2String, d3String, d4String, d5String, d6String];

  var noiseString = "💥";
  var stealString = "🤏";
  var mansShoeString = "👞";

  // Basic set of die -> move/noise/steal.
  // Each boy has some reordered set of these die results.
  const coreDieResults = [
    {
      move: 1,
      noise: 1,
    },
    {
      move: 1,
      noise: 1,
      steal: 1,
    },
    {
      move: 2,
      noise: 1,
    },
    {
      move: 2,
      noise: 1,
      steal: 1,
    },
    {
      move: 4,
      noise: 1,
    },
    {
      move: 4,
      noise: 2,
      steal: 1,
    },
  ];

  // Basic set of modifier die results.  Each boy has same.
  const modifierDieResults = [
    {
      move: 1,
    },
    {
      move: -1,
    },
    {
      noise: 1,
    },
    {
      noise: -1,
    },
    {
      steal: 1,
    },
    {
      steal: -1,
    },
  ];

  console.assert(
    coreDieResults.length === numDieFaces,
    "basicSchoolBoyDieConfigs length should match the number of die faces",
  );

  // Player has n schoolboys.
  // Each boy has some permuted version of core die results.
  // This maps from boy index to permuted die results.
  var coreDieResultsBySchoolboyIndex = [];

  function setupCoreDieResultsBySchoolboyIndex() {
    for (var j = 0; j < boysPerPlayer; j++) {
      var schoolboyRollPowers = [];
      for (var i = 0; i < numDieFaces; i++) {
        var basicPowerIndex = (i + j * 2) % numDieFaces;
        var copiedRollPower = structuredClone(coreDieResults[basicPowerIndex]);
        schoolboyRollPowers.push(copiedRollPower);
      }
      coreDieResultsBySchoolboyIndex.push(schoolboyRollPowers);
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

  var lowEndInstanceCount = 4;
  var midRangeInstanceCount = 3;
  var highEndInstanceCount = 2;

  var powerTypeOneShot = "one-shot";
  var powerTypeModifier = "modifier";
  var powerTypeCore = "core";

  var powerTypes = {
    oneShot: powerTypeOneShot,
    modifier: powerTypeModifier,
    core: powerTypeCore,
  };

  var treatCardConfigs = [
    // Low end treats.
    {
      count: lowEndInstanceCount,
      name: "Crumpets",
      class: "crumpets",
      tier: 0,
      steal: 1,
      consume: 2,
      save: 4,
      power: {
        type: powerTypes.oneShot,
        steal: 1,
      },
    },
    {
      count: lowEndInstanceCount,
      name: "Gingerbread",
      class: "gingerbread",
      tier: 0,
      steal: 1,
      consume: 2,
      save: 4,
      power: {
        type: powerTypes.oneShot,
        noise: 1,
      },
    },
    {
      count: lowEndInstanceCount,
      name: "Shortbread",
      class: "shortbread",
      tier: 0,
      steal: 1,
      consume: 2,
      save: 4,
      power: {
        type: powerTypes.oneShot,
        reroll: 1,
      },
    },
    {
      count: lowEndInstanceCount,
      name: "Rock Cakes",
      class: "rock-cakes",
      tier: 0,
      steal: 1,
      consume: 2,
      save: 4,
      power: {
        type: powerTypes.modifier,
        dieResult: 0,
        move: 2,
      },
    },
    {
      count: lowEndInstanceCount,
      name: "Fairy Cakes",
      class: "fairy-cakes",
      tier: 0,
      steal: 1,
      consume: 2,
      save: 4,
      power: {
        type: powerTypes.modifier,
        dieResult: 1,
        noise: -2,
      },
    },
    {
      count: lowEndInstanceCount,
      name: "Custard Creams",
      class: "custard-creams",
      tier: 0,
      steal: 2,
      consume: 4,
      save: 8,
      power: {
        type: powerTypes.core,
        dieResult: 2,
        move: 3,
        noise: 1,
        steal: 1,
      },
    },

    // Mid range treats,
    {
      count: midRangeInstanceCount,
      name: "Flapjacks",
      class: "flapjacks",
      tier: 1,
      steal: 2,
      consume: 4,
      save: 8,
      power: {
        type: powerTypes.oneShot,
        steal: 2,
      },
    },
    {
      count: midRangeInstanceCount,
      name: "Eccles Cakes",
      class: "eccles-cakes",
      tier: 1,
      steal: 2,
      consume: 4,
      save: 8,
      power: {
        type: powerTypes.oneShot,
        noise: -1,
      },
    },
    {
      count: midRangeInstanceCount,
      name: "Victoria Sponge",
      class: "victoria-sponge",
      tier: 1,
      steal: 2,
      consume: 4,
      save: 8,
      power: {
        type: powerTypes.modifier,
        dieResult: 3,
        move: -4,
      },
    },
    {
      count: midRangeInstanceCount,
      name: "Jam Tart",
      class: "jam-tart",
      tier: 1,
      steal: 2,
      consume: 4,
      save: 8,
      power: {
        type: powerTypes.modifier,
        dieResult: 4,
        noise: 2,
      },
    },
    {
      count: midRangeInstanceCount,
      name: "Chocolate Digestive",
      class: "chocolate-digestive",
      tier: 1,
      steal: 2,
      consume: 4,
      save: 8,
      power: {
        type: powerTypes.core,
        dieResult: 5,
        move: 1,
        noise: 3,
      },
    },
    {
      count: midRangeInstanceCount,
      name: "Blueberrty Scone",
      class: "blueberry-scone",
      tier: 1,
      steal: 2,
      consume: 4,
      save: 8,
      power: {
        type: powerTypes.core,
        dieResult: 5,
        move: 2,
        noise: 2,
        steal: 2,
      },
    },

    // High end treats,
    {
      count: highEndInstanceCount,
      name: "Sausage Roll",
      class: "sausage-roll",
      tier: 2,
      steal: 4,
      consume: 7,
      save: 14,
    },
    {
      count: highEndInstanceCount,
      name: "Scotch Egg",
      class: "scotch-egg",
      tier: 2,
      steal: 3,
      noise: 1,
      consume: 6,
      save: 12,
    },
    {
      count: highEndInstanceCount,
      name: "Jammy Dodger",
      class: "jammy-dodger",
      tier: 2,
      steal: 4,
      noise: 2,
      consume: 8,
      save: 15,
    },
    {
      count: highEndInstanceCount,
      name: "Battenberg",
      class: "battenberg",
      tier: 2,
      steal: 4,
      noise: 2,
      consume: 8,
      save: 15,
    },
  ];

  var treatCountByTier = [4, 2, 1];

  setupCoreDieResultsBySchoolboyIndex();

  // This returned object becomes the defined value of this module
  return {
    schoolboyNames: schoolboyNames,
    boysPerPlayer: boysPerPlayer,
    numPlayers: numPlayers,
    numDieFaces: numDieFaces,

    dieStrings: dieStrings,

    noiseString: noiseString,
    stealString: stealString,
    mansShoeString: mansShoeString,

    coreDieResultsBySchoolboyIndex: coreDieResultsBySchoolboyIndex,
    modifierDieResults: modifierDieResults,

    maxTreats: maxTreats,
    maxPowers: maxPowers,

    playerColorFamilies: playerColorFamilies,

    treatCardConfigs: treatCardConfigs,
  };
});
