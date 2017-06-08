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
  console.log(operands);
  var lhs = operands.slice(0, 1); // left hand side
  var rhs = operands.slice(1, 3); // right hand side
  /* here operands is array like ["2H2O", "Fe", "FeO2", "2H2"]*/
  /* lhs is the first two parts and rhs is the second two parts */

  // NOTE: function takes an array
  updateMolInputs( [ lhs, rhs ] );

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

function updateMolInputs (sides) {
  /* order is important */
  var sels = [
    document.getElementById("sel-mol-lhs"),
    document.getElementById("sel-mol-rhs")
  ];

  /* TODO: fix this */
  for (var i = 0; i < sels.length; i++) {
    for (var j = 0; j < sels[i].length; j++) {
      sels.insertAdjacentHTML(
        '<option value="' + sides[i][j] + '"> ' + sides[i][j] + ' </option'
      );
    }
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
    inputs[i].value = "";
  }
}