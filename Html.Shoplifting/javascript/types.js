define([], function () {
  var schoolboyNames = [
    "Abner",
    "Ben",
    "Charles",
    "Dudley",
    "Eugene",
    "Fred",
    "George",
    "Henry",
    "Irving",
    "James",
    "Ken",
    "Lyle",
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

  // This returned object becomes the defined value of this module
  return {
    powerTypes: powerTypes,
    schoolboyNames: schoolboyNames,
    dieStrings: dieStrings,
    iconTypes: iconTypes,
    iconStrings: iconStrings,
  };
});
