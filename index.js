/* remove all children elements of an HTML element */
function removeChildren(elt) {
  while (elt.firstChild) {
    elt.removeChild(elt.firstChild);
  }
}

/*
  unpack (flatten) arrays.
  polyfill for the spread operator (...) or python's starred iterable unpacking
*/
function spread () {
  var out = [];
      out = [].concat.apply([], arguments[0]);

  for (var i = 1; i < arguments.length; i++) {
    out = [].concat.apply(out, arguments[i]);
  }

  return out;
}

function clearInputs() {
  var inputs  = document.getElementsByTagName("input");
  var selects = [
    document.getElementById("sel-mol-rhs"),
    document.getElementById("sel-mol-lhs")
  ];

  for (var i = 0; i < selects.length; i++) {
    removeChildren(selects[i]);
  }

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}