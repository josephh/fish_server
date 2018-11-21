'strict mode';

// angler filter function
var includeAngler = function (includedAngler) {
  return function ({ angler }) {
    return angler === includedAngler;
  };
};

// species filter function
var includeSpecies = function (includedSpecies) {
  return function ({ species }) {
    return includedSpecies.includes(species);
  };
};

// This function takes any number of functions, and returns a function.
// It returns a function that will "AND" together their return values of all the original functions
var and = function (...funcs) {
  return function (...innerArgs) {
    return funcs.every(function (func) {
      return func(...innerArgs);
    });
  };
};

module.exports = function(angler, speciesArray, catchesArray) {
  // includeAngler 'closure'
  var anglerFilter = includeAngler(angler),
    speciesFilter = includeSpecies(speciesArray.map(el => el.toLowerCase()));
  return catchesArray.filter(and(anglerFilter, speciesFilter));
};
