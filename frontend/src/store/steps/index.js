// TODO this should be a map of name -> validator. All logic concerning step validation should live here.
const STEP_NAMES = [
  'CHOOSE_SOURCE',
  'ANALYSIS'
]

// Register a validation function for each step
const validators = {
  [STEP_NAMES[0]]: function (state, getters) {
    return getters.isAnyPlaylistSelected
  },
  [STEP_NAMES[1]]: function () {
    return true;
  }
}

import source from "./source";
import analysis from "./analysis";

export default {
  modules: {
    source,
    analysis
  },
  getters: {
    isStepValid: (state, getters) => name => {
      if (validators[name] === undefined) {
        throw new Error(`No validator defined for step ${name}!`)
      }
      return validators[name](state, getters);
    }
  }
}

export {
  STEP_NAMES
}

