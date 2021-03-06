/*
  Replaces the getContext method for webgl canvas contexts with a wrapper which
  ensures the attribute "preserveDrawingBuffer" is true.
  This allows the webgl canvas to have readable pixels.
  
  Credit - https://stackoverflow.com/a/54054125/12688391

  This script must be executed from the DOM's JS environment using inject.js
*/

console.log('webglContextWrapper.js')

HTMLCanvasElement.prototype.getContext = function(origFn) {
  const typesWeCareAbout = {
    "webgl": true,
    "webgl2": true,
    "experimental-webgl": true,
  };
  return function(type, attributes = {}) {
    if (typesWeCareAbout[type]) {
      attributes.preserveDrawingBuffer = true;
    }
    return origFn.call(this, type, attributes);
  };
}(HTMLCanvasElement.prototype.getContext);
