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
  };
});
