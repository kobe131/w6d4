const DOMNodeCollection = require("./dom_node_collection.js");

window.$l = function (selector) {
  let getdoc;
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }
  else {
    return new DOMNodeCollection(Array.from(document.querySelectorAll(selector)));
  }
};