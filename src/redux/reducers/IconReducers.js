import {
  UPDATE_ICON,
  REMOVE_ICON,
  UPDATE_TEXTINPUT,
  ADD_RESOURCE,
  UPDATE_RESOURCE,
  REMOVE_RESOURCE,
} from '../actions/IconAction';
const initialState = {
  icon: [],
  resources: [],
};

const actionForReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case ADD_RESOURCE: {
      return {
        ...state,
        resources: [...state.resources, action.payload],
      };
    }
    case UPDATE_RESOURCE: {
      const newResources = [...state.resources];
      newResources[action.payload.index] = action.payload.item;
      return {
        ...state,
        resources: newResources,
      };
    }
    case REMOVE_RESOURCE: {
      const newResources = [...state.resources];
      newResources.splice(action.payload, 1);
      return {
        ...state,
        resources: newResources,
      };
    }

    case UPDATE_ICON: {
      return {
        ...state,
        icon: [...state.icon, action.payload],
      };
    }
    case UPDATE_TEXTINPUT: {
      return {
        ...state,
        icon: [...state.icon, action.payload],
      };
    }
    case REMOVE_ICON: {
      return {
        ...state,
        icon: action.payload,
      };
    }
    default:
      return state;
  }
};
export default actionForReducer;
