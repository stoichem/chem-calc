/* HELPER FUNCTIONS */
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
  var out = [].concat.apply([], arguments[0]);

  for (var i = 1; i < arguments.length; i++) {
    out = [].concat.apply(out, arguments[i]);
  }

  return out;
}

/* MAIN CODE */
function tryParseEqu (equ) {
  var    regex = /^([a-z0-9()]+)\s*\+\s*([a-z0-9()]+)\s*=\s*([a-z0-9()]+)\s*\+\s*([a-z0-9()]+)$/gi;
  var matches  = regex.exec(equ);
  if (null === matches) {
    return false;
  }
  var operands = matches.slice(1, 5);
  var lhs = operands.slice(0, 2); // left hand side
  var rhs = operands.slice(2, 4); // right hand side
  console.log(lhs);
  console.log(rhs);
  /* here operands is array like ["2H2O", "Fe", "FeO2", "2H2"]*/
  /* lhs is the first two parts and rhs is the second two parts */

  updateMolInputs(lhs, rhs);

  /*
    here you can use a function to evaluate the left and right hand sides
    and return false if the equation can't be balanced
  */
}

function processEquation () {
  var eq_el = document.getElementById("equation-input").value;
  var parsed = tryParseEqu(eq_el);
  if (false === parsed) {
    document.getElementById("alert").style.display = "inline";
    return;
  }
  // otherwise it's OK
  document.getElementById("alert").style.display = "none";
}

function updateMolInputs (lhs, rhs) {
  /* order is important */
  var sel_l = document.getElementById("sel-mol-lhs"),
      sel_r = document.getElementById("sel-mol-rhs");

  /* do the left side */
  for (var i = 0; i < lhs.length; i++) {
    sel_l.insertAdjacentHTML("beforeend", makeOptionTag(lhs[i]));
  }

  /* and the right side */
  for (var i = 0; i < rhs.length; i++) {
    sel_r.insertAdjacentHTML("beforeend", makeOptionTag(rhs[i]));
  }
}

function clearInputs () {
  var inputs  = document.getElementsByTagName("input");
  var selects = [
    document.getElementById("sel-mol-rhs"),
    document.getElementById("sel-mol-lhs")
  ];

  for (var i = 0; i < selects.length; i++) {
    removeChildren(selects[i]);
  }

  for (var i = 0; i < inputs.length; i++) {
    var t = inputs[i];
    /* don't clear the input field */
    if ("equation-input" !== t.id) {
      t.value = "";
    }
  }
}

function makeOptionTag (name) {
  return "<option value='" + name + "'> " + name + " </option>";
}
