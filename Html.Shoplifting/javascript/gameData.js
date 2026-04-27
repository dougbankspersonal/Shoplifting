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

  var oneShotTypeMoveFlipDie = "move-flip-die";
  var oneShotTypeNoiseFlipDie = "noise-flip-die";
  var oneShotTypeSecretPassage = "secret-passage";
  var oneShotTypeNoSteal = "no-steal";
  var oneShotTypePersuasion = "persuasion";
  var oneShotTypes = {
    MoveFlipDie: oneShotTypeMoveFlipDie,
    NoiseFlipDie: oneShotTypeNoiseFlipDie,
    SecretPassage: oneShotTypeSecretPassage,
    NoSteal: oneShotTypeNoSteal,
    Persuasion: oneShotTypePersuasion,
  };

  var oneShotTypesArray = Object.values(oneShotTypes);

  var treat0InstanceCount = 5;
  var treat1InstanceCount = 5;

  var treat0TummyPoints = 1;
  var treat0PocketPoints = 2;

  var treat0CardConfigs = [
    {
      name: "Crumpet",
      class: "crumpet",
    },
    {
      name: "Gingerbread",
      class: "gingerbread",
    },
    {
      name: "Shortbread",
      class: "shortbread",
    },
    {
      name: "Rock Cake",
      class: "rock-cake",
    },
    {
      name: "Fairy Cake",
      class: "fairy-cake",
    },
    {
      name: "Custard Cream",
      class: "custard-cream",
    },
    {
      name: "Flapjack",
      class: "flapjack",
    },
  ];

  var treat1CardConfigs = [
    {
      name: "Eccles Cake",
      class: "eccles-cake",
      stealing: {
        steal: 2,
        noise: 1,
      },
      reward: {
        pocketPoints: 4,
        tummyPoints: 3,
      },
    },
    {
      name: "Victoria Sponge",
      class: "victoria-sponge",
      stealing: {
        steal: 2,
        noise: 2,
      },
      reward: {
        pocketPoints: 5,
        tummyPoints: 3,
      },
    },
    {
      name: "Jam Tart",
      class: "jam-tart",
      stealing: {
        steal: 3,
        noise: 2,
      },
      reward: {
        pocketPoints: 5,
        tummyPoints: 3,
      },
    },
    {
      name: "Biscuit",
      class: "biscuit",
      stealing: {
        steal: 3,
        noise: 3,
      },
      reward: {
        pocketPoints: 6,
        tummyPoints: 4,
      },
    },
  ];

  // This returned object becomes the defined value of this module
  return {
    boysPerPlayer: boysPerPlayer,
    numPlayers: numPlayers,
    numDieFaces: numDieFaces,

    playerColorFamilies: playerColorFamilies,
    oneShotTypes: oneShotTypes,
    oneShotTypesArray: oneShotTypesArray,

    treat1CardConfigs: treat1CardConfigs,
    treat0CardConfigs: treat0CardConfigs,

    treat0InstanceCount: treat0InstanceCount,
    treat1InstanceCount: treat1InstanceCount,
    treat0PocketPoints: treat0PocketPoints,
    treat0TummyPoints: treat0TummyPoints,
  };
});
