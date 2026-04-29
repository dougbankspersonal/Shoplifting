define([], function () {
  /*
  // Obsolete
  var oneShotTypeMoveFlipDie = "move-flip-die";
  var oneShotTypeNoiseFlipDie = "noise-flip-die";
  var oneShotTypeNoSteal = "no-steal";
  var oneShotTypeSecretPassage = "secret-passage";
  */

  var oneShotTypeFlipDie = "flip-die";
  var oneShotTypeExtraSteal = "extra-steal";
  var oneShotTypePersuasion = "persuasion";
  var oneShotTypeReroll = "reroll";
  var oneShotTypeCherryBomb = "cherry-bomb";
  var oneShotTypeCounterclockwise = "counterclockwise";
  var oneShotTypeHide = "hide";
  var oneShotTypeShush = "shush";

  var oneShotTypes = {
    FlipDie: oneShotTypeFlipDie,
    ExtraSteal: oneShotTypeExtraSteal,
    Persuasion: oneShotTypePersuasion,
    Reroll: oneShotTypeReroll,
    CherryBomb: oneShotTypeCherryBomb,
    Counterclockwise: oneShotTypeCounterclockwise,
    Hide: oneShotTypeHide,
    Shush: oneShotTypeShush,
  };

  var oneShotTypesArray = Object.values(oneShotTypes);

  var treat0CardConfigs = [
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

  var schoolboyConfigs = [
    {
      name: "Abner",
      family: 0,
      favorite: treat0CardConfigs[0],
    },
    {
      name: "Ben",
      family: 0,
      favorite: treat0CardConfigs[1],
    },
    {
      name: "Charles",
      family: 0,
      favorite: treat0CardConfigs[2],
    },
    {
      name: "Dudley",
      family: 1,
      favorite: treat0CardConfigs[0],
    },
    {
      name: "Eugene",
      family: 1,
      favorite: treat0CardConfigs[3],
    },
    {
      name: "Fred",
      family: 1,
      favorite: treat0CardConfigs[4],
    },
    {
      name: "George",
      family: 2,
      favorite: treat0CardConfigs[1],
    },
    {
      name: "Henry",
      family: 2,
      favorite: treat0CardConfigs[3],
    },
    {
      name: "Irving",
      family: 2,
      favorite: treat0CardConfigs[5],
    },
    {
      name: "James",
      family: 3,
      favorite: treat0CardConfigs[2],
    },
    {
      name: "Ken",
      family: 3,
      favorite: treat0CardConfigs[4],
    },
    {
      name: "Lyle",
      family: 3,
      favorite: treat0CardConfigs[5],
    },
  ];

  var powerTypeOneShot = "one-shot";
  var powerTypeModifier = "modifier";
  var powerTypeCore = "core";

  var powerTypes = {
    oneShot: powerTypeOneShot,
    modifier: powerTypeModifier,
    core: powerTypeCore,
  };

  var d1String = "<span class=die>⚀</span>";
  var d2String = "<span class=die>⚁</span>";
  var d3String = "<span class=die>⚂</span>";
  var d4String = "<span class=die>⚃</span>";
  var d5String = "<span class=die>⚄</span>";
  var d6String = "<span class=die>⚅</span>  ";

  var dieStrings = [d1String, d2String, d3String, d4String, d5String, d6String];

  var moveIcon = "move";
  var stealIcon = "steal";
  var noiseIcon = "noise";
  var consumeIcon = "consume";
  var saveIcon = "save";
  var rewardIcon = "reward";
  var rerollIcon = "reroll";
  var demeritIcon = "demerit";
  var teacherIcon = "teacher";

  var iconTypes = {
    move: moveIcon,
    steal: stealIcon,
    noise: noiseIcon,
    consume: consumeIcon,
    save: saveIcon,
    reward: rewardIcon,
    reroll: rerollIcon,
    demerit: demeritIcon,
    teacher: teacherIcon,
  };

  var iconStrings = {
    [iconTypes.move]: "<span class=shoe>👞</span>",
    [iconTypes.steal]: "🤏",
    [iconTypes.noise]: "💥",
    [iconTypes.consume]: "🥄",
    [iconTypes.save]: "🕰️",
    [iconTypes.reward]: "😋",
    [iconTypes.reroll]: "♻️",
    [iconTypes.demerit]: "☠️",
    [iconTypes.teacher]: "🍎",
  };

  var rawTokenConfigs = [
    /* Obsolete
    {
      classes: ["square", "number-tile"],
      images: ["pips-0"],
    },
    {
      classes: ["square", "number-tile"],
      images: ["pips-1"],
    },
    {
      classes: ["square", "number-tile"],
      images: ["pips-2"],
    },
    {
      classes: ["square", "number-tile"],
      images: ["pips-3"],
    },
    {
      classes: ["square", "number-tile"],
      images: ["pips-4"],
    },
    {
      classes: ["square", "number-tile"],
      images: ["pips-5"],
    },
    {
      classes: ["square", "number-tile"],
      images: ["pips-6"],
    },*/
    {
      text: iconStrings[iconTypes.demerit],
      classes: [iconTypes.demerit, "square"],
    },
    {
      images: ["professor"],
      classes: [],
    },
  ];

  // This returned object becomes the defined value of this module
  return {
    powerTypes: powerTypes,
    schoolboyConfigs: schoolboyConfigs,
    dieStrings: dieStrings,
    iconTypes: iconTypes,
    iconStrings: iconStrings,
    treat0CardConfigs: treat0CardConfigs,
    treat1CardConfigs: treat1CardConfigs,
    oneShotTypes: oneShotTypes,
    oneShotTypesArray: oneShotTypesArray,
    rawTokenConfigs: rawTokenConfigs,
  };
});
