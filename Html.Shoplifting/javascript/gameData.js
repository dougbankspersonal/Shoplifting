define(["sharedJavascript/screentop/seatColors", "dojo/domReady!"], function (
  seatColors,
) {
  const gBoysPerPlayer = 3;
  const gNumPlayers = 4;
  const gNumDieFaces = 6;

  const gOneShotTypeFlipDie = "flip-die";
  const gOneShotTypeDoubleStealBacked = "double-steal-backed";
  const gOneShotTypePersuasion = "persuasion";
  const gOneShotTypeReroll = "reroll";
  const gOneShotTypeCherryBomb = "cherry-bomb";
  const gOneShotTypeCounterclockwise = "counterclockwise";
  const gOneShotTypeHide = "hide";
  const gOnehotTypeShush = "shush";

  const gBoyBorderWidth = 16;
  const gDefaultBorderWidth = 12;

  const gOneShotTypes = {
    FlipDie: gOneShotTypeFlipDie,
    DoubleStealBacked: gOneShotTypeDoubleStealBacked,
    Persuasion: gOneShotTypePersuasion,
    Reroll: gOneShotTypeReroll,
    CherryBomb: gOneShotTypeCherryBomb,
    Counterclockwise: gOneShotTypeCounterclockwise,
    Hide: gOneShotTypeHide,
    Shush: gOnehotTypeShush,
  };

  const gOneShotTypesArray = Object.values(gOneShotTypes);

  const gTreat0CardConfigs = [
    {
      name: "Crumpet",
      class: "crumpet",
      color: "#FF6B6B",
    },
    {
      name: "Gingerbread",
      class: "gingerbread",
      color: "#FFD93D",
    },
    {
      name: "Shortbread",
      class: "shortbread",
      color: "#6BCB77",
    },
    {
      name: "Rock Cake",
      class: "rock-cake",
      color: "#4D96FF",
    },
    {
      name: "Fairy Cake",
      class: "fairy-cake",
      color: "#B983FF",
    },
    {
      name: "Custard Cream",
      class: "custard-cream",
      color: "#FF8E3C",
    },
  ];

  const gTreat1CardConfigs = [
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

  var gBoyConfigs = [
    {
      name: "Abner",
      favoriteTreatConfig: gTreat0CardConfigs[0],
    },
    {
      name: "Ben",
      favoriteTreatConfig: gTreat0CardConfigs[1],
    },
    {
      name: "Charles",
      favoriteTreatConfig: gTreat0CardConfigs[2],
    },
    {
      name: "Dudley",
      favoriteTreatConfig: gTreat0CardConfigs[0],
    },
    {
      name: "Eugene",
      favoriteTreatConfig: gTreat0CardConfigs[3],
    },
    {
      name: "Fred",
      favoriteTreatConfig: gTreat0CardConfigs[4],
    },
    {
      name: "George",
      favoriteTreatConfig: gTreat0CardConfigs[1],
    },
    {
      name: "Henry",
      favoriteTreatConfig: gTreat0CardConfigs[3],
    },
    {
      name: "Irving",
      favoriteTreatConfig: gTreat0CardConfigs[5],
    },
    {
      name: "James",
      favoriteTreatConfig: gTreat0CardConfigs[2],
    },
    {
      name: "Ken",
      favoriteTreatConfig: gTreat0CardConfigs[4],
    },
    {
      name: "Lyle",
      favoriteTreatConfig: gTreat0CardConfigs[5],
    },
  ];

  const gMoveIcon = "move";
  const gStealIcon = "steal";
  const gNoiseIcon = "noise";
  const gConsumeIcon = "consume";
  const gSaveIcon = "save";
  const gRewardIcon = "reward";
  const gRerollIcon = "reroll";
  const gDemeritIcon = "demerit";
  const gTeacherIcon = "teacher";

  const gIconTypes = {
    move: gMoveIcon,
    steal: gStealIcon,
    noise: gNoiseIcon,
    consume: gConsumeIcon,
    save: gSaveIcon,
    reward: gRewardIcon,
    reroll: gRerollIcon,
    demerit: gDemeritIcon,
    teacher: gTeacherIcon,
  };

  const gIconStrings = {
    [gIconTypes.move]: "<span class=shoe>👞</span>",
    [gIconTypes.steal]: "🤏",
    [gIconTypes.noise]: "💥",
    [gIconTypes.consume]: "🥄",
    [gIconTypes.save]: "🕰️",
    [gIconTypes.reward]: "😋",
    [gIconTypes.reroll]: "♻️",
    [gIconTypes.demerit]: "☠️",
    [gIconTypes.teacher]: "🍎",
  };

  console.assert(
    gBoyConfigs.length >= gNumPlayers * gBoysPerPlayer,
    "Not enough schoolboy names for the number of players",
  );

  const gTreat0InstanceCount = 5;
  const gTreat1InstanceCount = 5;

  const gTreat0TummyPoints = 1;
  const gTreat0PocketPoints = 2;

  // This returned object becomes the defined value of this module
  return {
    boysPerPlayer: gBoysPerPlayer,
    numPlayers: gNumPlayers,
    numDieFaces: gNumDieFaces,

    boyBorderWidth: gBoyBorderWidth,
    defaultBorderWidth: gDefaultBorderWidth,

    boyConfigs: gBoyConfigs,
    iconTypes: gIconTypes,
    iconStrings: gIconStrings,
    treat0CardConfigs: gTreat0CardConfigs,
    treat1CardConfigs: gTreat1CardConfigs,
    oneShotTypes: gOneShotTypes,
    oneShotTypesArray: gOneShotTypesArray,

    treat0InstanceCount: gTreat0InstanceCount,
    treat1InstanceCount: gTreat1InstanceCount,
    treat0PocketPoints: gTreat0PocketPoints,
    treat0TummyPoints: gTreat0TummyPoints,
  };
});
