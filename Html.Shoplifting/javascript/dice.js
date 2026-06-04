define([
  "dojo/dom",
  "dojo/dom-style",
  "sharedJavascript/debugLog",
  "sharedJavascript/htmlUtils",
  "javascript/gameData",
  "javascript/tokenConfigData",
  "dojo/domReady!",
], function (
  dom,
  domStyle,
  debugLogModule,
  htmlUtils,
  gameData,
  tokenConfigData,
) {
  var debugLog = debugLogModule.debugLog;

  function addDieFace(parent, imageClass, index) {
    var classes = ["die-face"];

    var dieFaceNode = htmlUtils.addDiv(parent, classes, "die-face-" + index);

    var dieImageNode = htmlUtils.addImage(
      dieFaceNode,
      [imageClass],
      "die-image-" + index,
    );

    return dieFaceNode;
  }

  function addDieFaces(imageClasses) {
    var bodyNode = dom.byId("body");

    var allFacesNode = htmlUtils.addDiv(bodyNode, ["die-faces"], "die-faces");

    var facesRowNode = htmlUtils.addDiv(
      allFacesNode,
      ["row-of-die-faces"],
      "row-of-die-faces",
    );

    for (var i = 0; i < imageClasses.length; i++) {
      var imageClass = imageClasses[i];
      addDieFace(facesRowNode, imageClass, i);
    }
    return bodyNode;
  }

  function addNoiseDie() {
    var noiseDieImageClasses = [
      "noise-1",
      "noise-1",
      "noise-2",
      "noise-2",
      "noise-3",
      "noise-3",
    ];
    return addDieFaces(noiseDieImageClasses);
  }

  // This returned object becomes the defined value of this module
  return {
    addNoiseDie: addNoiseDie,
  };
});
