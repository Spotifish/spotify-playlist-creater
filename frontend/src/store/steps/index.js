const STEP_NAMES = [
  'CHOOSE_SOURCE',
  'ANALYSIS'
]

// Register a validation function for each step
const validators = {
  [STEP_NAMES[0]]: function (state, getters) {
    return Object.entries(getters.getSelectedPlaylists).length > 0
  },
  [STEP_NAMES[1]]: function (state) {
    console.log(state);
    return true;
  }
}

import source from "./source";

export default {
  modules: {
    source
  },
  getters: {
    isStepValid: (state, getters) => name => {
      if (validators[name] === undefined) {
        throw new Error("No validator defined for specified step!")
      }
      return validators[name](state, getters);
    }
  }
}

export {
  STEP_NAMES
}

