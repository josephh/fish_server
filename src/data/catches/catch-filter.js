'strict mode';

// angler filter function
var includeAngler = function(includedAngler) {
  return function({angler}) {
    return angler.toLowerCase() === includedAngler.toLowerCase();
  };
};

// species filter function
var includeSpecies = function(includedSpecies) {
  return function({species}) {
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

module.exports.and = function(angler, speciesArray, catchesArray) {
  // includeAngler 'closure'
  var anglerFilter = includeAngler(angler),
    speciesFilter = includeSpecies(speciesArray.map(el => el.toLowerCase()));
  return catchesArray.filter(and(anglerFilter, speciesFilter));
};

module.exports.single = function(fieldName, val, catchesArray) {
  return catchesArray.filter(function(elem) {
    return elem[fieldName] === val;
  });
};

module.exports.multi = function(fieldName, valsArray, catchesArray) {
  return catchesArray.filter(function(elem) {
    /**
         * make use of Array.filter(...)'s second argument: 'thisArg'.
         * "Value to use as this when executing callback."
         */
    return this.indexOf(elem[fieldName]) > - 1;
  }, valsArray);
};
