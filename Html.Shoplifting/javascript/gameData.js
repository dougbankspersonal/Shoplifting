define(["javascript/types", "dojo/domReady!"], function (types) {
  var numPlayers = 4;
  var boysPerPlayer = 3;
  var numDieFaces = 6;

  console.assert(
    types.schoolboyConfigs.length >= numPlayers * boysPerPlayer,
    "Not enough schoolboy names for the number of players",
  );

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

  var treat0InstanceCount = 5;
  var treat1InstanceCount = 5;

  var treat0TummyPoints = 1;
  var treat0PocketPoints = 2;

  // This returned object becomes the defined value of this module
  return {
    boysPerPlayer: boysPerPlayer,
    numPlayers: numPlayers,
    numDieFaces: numDieFaces,

    playerColorFamilies: playerColorFamilies,

    treat0InstanceCount: treat0InstanceCount,
    treat1InstanceCount: treat1InstanceCount,
    treat0PocketPoints: treat0PocketPoints,
    treat0TummyPoints: treat0TummyPoints,
  };
});
