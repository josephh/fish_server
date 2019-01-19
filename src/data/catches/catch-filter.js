'strict mode';

// angler filter function
var includeAnglers = function(includedAnglers) {
  return function({
    angler
  }) {
    return includedAnglers.includes(angler);
  };
};

// species filter function
var includeSpecies = function(includedSpecies) {
  return function({
    species
  }) {
    return includedSpecies.includes(species);
  };
};

// This function takes any number of functions, and returns a function.
// It returns a function that will "AND" together their return values of all the original functions
var and = function(...funcs) {
  return function(...innerArgs) {
    return funcs.every(function(func) {
      return func(...innerArgs);
    });
  };
};

module.exports.and = function(anglers, speciesArray, catchesArray) {
  // includeAngler 'closure'
  var anglersFilter = includeAnglers(anglers.map(el => el.toLowerCase())),
    speciesFilter = includeSpecies(speciesArray.map(el => el.toLowerCase()));
  return catchesArray.filter(and(anglersFilter, speciesFilter));
};

module.exports.filter = function(fieldName, valsArray, catchesArray) {
  return catchesArray.filter(function(elem) {
    /**
     * make use of Array.filter(...)'s second argument: 'thisArg'.
     * "Value to use as this when executing callback."
     */
    return this.indexOf(elem[fieldName]) > -1;
  }, valsArray);
};
