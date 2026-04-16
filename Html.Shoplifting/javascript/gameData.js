define(["javascript/types", "dojo/domReady!"], function (types) {
  var numPlayers = 4;

  var boysPerPlayer = 3;

  console.assert(
    types.schoolboyNames.length >= numPlayers * boysPerPlayer,
    "Not enough schoolboy names for the number of players",
  );
  var numDieFaces = 6;

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

  // This returned object becomes the defined value of this module
  return {
    boysPerPlayer: boysPerPlayer,
    numPlayers: numPlayers,
    numDieFaces: numDieFaces,

    playerColorFamilies: playerColorFamilies,
  };
});
