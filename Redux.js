import React from 'react';
import { createStore } from 'redux';
import Daikin from './helpers/Daikin';

let initialState = {
  ret: 0,
  pow: 0,
  mode: 0,
  adv: 0,
  stemp: 0,
  shum: 0,
  dt1: 0,
  dt2: 0,
  dt3: 0,
  dt4: 0,
  dt5: 0,
  dt7: 0,
  dh1: 0,
  dh2: 0,
  dh3: 0,
  dh4: 0,
  dh5: 0,
  dh7: 0,
  dhh: 0,
  b_mode: 0,
  b_stemp: 0,
  b_shum: 0,
  alert: 0,
  f_rate: 0,
  f_dir: 0,
  b_f_rate: 0,
  b_f_dir: 0,
  dfr1: 0,
  dfr2: 0,
  dfr3: 0,
  dfr4: 0,
  dfr5: 0,
  dfr6: 0,
  dfr7: 0,
  dfrh: 0,
  dfd1: 0,
  dfd2: 0,
  dfd3: 0,
  dfd4: 0,
  dfd5: 0,
  dfd6: 0,
  dfd7: 0,
  dfdh: 0,
  dmnd_run: 0,
  en_demand: 0,
  sensorInfo: {
    temp_inside: 0,
    temp_outside: 0,
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE':
      if (action.date !== false) {
        return action.data;
      } else {
        return state;
      }
    case 'TOGGLE':
      Daikin.update({ ...state, pow: state.pow === 1 ? 0 : 1 });

      return { ...state, pow: state.pow === 1 ? 0 : 1 };
    case 'TEMP_DECREASE':
      Daikin.update({ ...state, stemp: state.stemp - 1  });

      return { ...state, stemp: state.stemp - 1  };
    case 'TEMP_INCREASE':
      Daikin.update({ ...state, stemp: state.stemp + 1  });

      return { ...state, stemp: state.stemp + 1  };
    case 'UPDATE_DIR':
      Daikin.update({ ...state, f_dir: action.f_dir });

      return { ...state, f_dir: action.f_dir };
    case 'UPDATE_RATE':
      Daikin.update({ ...state, f_rate: action.f_rate });

      return { ...state, f_rate: action.f_rate };
  }

  return state;
}

export default createStore(reducer);