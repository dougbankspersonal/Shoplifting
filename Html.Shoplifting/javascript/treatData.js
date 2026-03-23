define([
  "dojo/dom",
  "dojo/dom-style",
  "javascript/types",
  "dojo/domReady!",
], function (dom, domStyle, types) {
  var lowEndInstanceCount = 4;
  var midRangeInstanceCount = 3;
  var highEndInstanceCount = 2;

  var treatCardConfigs = [
    // Low end treats.
    {
      count: lowEndInstanceCount,
      name: "Crumpet",
      class: "crumpet",
      tier: 0,
      stealing: {
        steal: 1,
        noise: 1,
      },
      reward: {
        consumePoints: 2,
        savePoints: 4,
      },
      power: {
        type: types.powerTypes.oneShot,
        steal: 1,
      },
    },
    {
      count: lowEndInstanceCount,
      name: "Gingerbread",
      class: "gingerbread",
      tier: 0,
      stealing: {
        steal: 1,
        noise: 1,
      },
      reward: {
        consumePoints: 2,
        savePoints: 4,
      },
      power: {
        type: types.powerTypes.oneShot,
        noise: [-1, 1],
      },
    },
    {
      count: lowEndInstanceCount,
      name: "Shortbread",
      class: "shortbread",
      tier: 0,
      stealing: {
        steal: 1,
        noise: 1,
      },
      reward: {
        consumePoints: 2,
        savePoints: 4,
      },
      power: {
        type: types.powerTypes.oneShot,
        reroll: 1,
      },
    },
    {
      count: lowEndInstanceCount,
      name: "Rock Cake",
      class: "rock-cake",
      tier: 0,
      stealing: {
        steal: 1,
        noise: 1,
      },
      reward: {
        consumePoints: 2,
        savePoints: 4,
      },
      power: {
        type: types.powerTypes.modifier,
        move: [-4, -3, -2, 2, 3, 4],
      },
    },
    {
      count: lowEndInstanceCount,
      name: "Fairy Cake",
      class: "fairy-cake",
      tier: 0,
      stealing: {
        steal: 1,
        noise: 1,
      },
      reward: {
        consumePoints: 2,
        savePoints: 4,
      },
      power: {
        type: types.powerTypes.modifier,
        noise: 2,
      },
    },
    {
      count: lowEndInstanceCount,
      name: "Custard Cream",
      class: "custard-cream",
      tier: 0,
      stealing: {
        steal: 1,
        noise: 1,
      },
      reward: {
        consumePoints: 2,
        savePoints: 4,
      },
      power: {
        type: types.powerTypes.core,
        move: 3,
        steal: 1,
      },
    },

    // Mid range treats,
    {
      count: midRangeInstanceCount,
      name: "Flapjack",
      class: "flapjack",
      tier: 1,
      stealing: {
        steal: 2,
        noise: 2,
      },
      reward: {
        consumePoints: 4,
        savePoints: 8,
      },
      power: {
        type: types.powerTypes.oneShot,
        steal: 2,
      },
    },
    {
      count: midRangeInstanceCount,
      name: "Eccles Cake",
      class: "eccles-cake",
      tier: 1,
      stealing: {
        steal: 2,
        noise: 2,
      },
      reward: {
        consumePoints: 4,
        savePoints: 8,
      },
      power: {
        type: types.powerTypes.oneShot,
        noise: [-2, 2],
      },
    },
    {
      count: midRangeInstanceCount,
      name: "Victoria Sponge",
      class: "victoria-sponge",
      tier: 1,
      stealing: {
        steal: 2,
        noise: 2,
      },
      reward: {
        consumePoints: 4,
        savePoints: 8,
      },
      power: {
        type: types.powerTypes.modifier,
        move: -4,
      },
    },
    {
      count: midRangeInstanceCount,
      name: "Jam Tart",
      class: "jam-tart",
      tier: 1,
      stealing: {
        steal: 2,
        noise: 2,
      },
      reward: {
        consumePoints: 4,
        savePoints: 8,
      },
      power: {
        type: types.powerTypes.modifier,
        steal: 2,
      },
    },
    {
      count: midRangeInstanceCount,
      name: "Biscuit",
      class: "biscuit",
      tier: 1,
      stealing: {
        steal: 2,
        noise: 2,
      },
      reward: {
        consumePoints: 4,
        savePoints: 8,
      },
      power: {
        type: types.powerTypes.core,
        move: 1,
        noise: 3,
      },
    },
    {
      count: midRangeInstanceCount,
      name: "Scone",
      class: "scone",
      tier: 1,
      stealing: {
        steal: 2,
        noise: 2,
      },
      reward: {
        consumePoints: 4,
        savePoints: 8,
      },
      power: {
        type: types.powerTypes.core,
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
      stealing: {
        steal: 4,
        noise: 4,
      },
      reward: {
        consumePoints: 7,
        savePoints: 14,
      },
    },
    {
      count: highEndInstanceCount,
      name: "Scotch Egg",
      class: "scotch-egg",
      tier: 2,
      stealing: {
        steal: 4,
        noise: 3,
      },
      reward: {
        consumePoints: 6,
        savePoints: 12,
      },
    },
    {
      count: highEndInstanceCount,
      name: "Jammy Dodger",
      class: "jammy-dodger",
      tier: 2,
      stealing: {
        steal: 4,
        noise: 4,
      },
      reward: {
        consumePoints: 9,
        savePoints: 12,
      },
    },
    {
      count: highEndInstanceCount,
      name: "Battenberg",
      class: "battenberg",
      tier: 2,
      stealing: {
        steal: 4,
        noise: 5,
      },
      reward: {
        consumePoints: 7,
        savePoints: 16,
      },
    },
  ];

  // This returned object becomes the defined value of this module
  return {
    treatCardConfigs: treatCardConfigs,
  };
});
