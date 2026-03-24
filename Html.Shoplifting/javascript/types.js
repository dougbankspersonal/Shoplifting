define([], function () {
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

  var powerTypeOneShot = "one-shot";
  var powerTypeModifier = "modifier";
  var powerTypeCore = "core";

  var powerTypes = {
    oneShot: powerTypeOneShot,
    modifier: powerTypeModifier,
    core: powerTypeCore,
  };

  var d1String = "⚀";
  var d2String = "⚁";
  var d3String = "⚂";
  var d4String = "⚃";
  var d5String = "⚄";
  var d6String = "⚅";

  var dieStrings = [d1String, d2String, d3String, d4String, d5String, d6String];

  var moveIcon = "move";
  var stealIcon = "steal";
  var noiseIcon = "noise";
  var consumeIcon = "consume";
  var saveIcon = "save";
  var rewardIcon = "reward";
  var rerollIcon = "reroll";
  var demeritIcon = "demerit";

  var iconTypes = {
    move: moveIcon,
    steal: stealIcon,
    noise: noiseIcon,
    consume: consumeIcon,
    save: saveIcon,
    reward: rewardIcon,
    reroll: rerollIcon,
    demerit: demeritIcon,
  };

  var iconStrings = {
    [iconTypes.move]: "👞",
    [iconTypes.steal]: "🤏",
    [iconTypes.noise]: "💥",
    [iconTypes.consume]: "🥄",
    [iconTypes.save]: "🕰️",
    [iconTypes.reward]: "😋",
    [iconTypes.reroll]: "🎲♻️",
    [iconTypes.demerit]: "☠️",
  };

  // This returned object becomes the defined value of this module
  return {
    powerTypes: powerTypes,
    schoolboyNames: schoolboyNames,
    dieStrings: dieStrings,
    iconTypes: iconTypes,
    iconStrings: iconStrings,
  };
});
