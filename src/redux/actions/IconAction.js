export const UPDATE_ICON = 'UPDATE_ICON';
export const UPDATE_TEXTINPUT = 'UPDATE_TEXTINPUT';
export const REMOVE_ICON = 'REMOVE_ICON';

export const ADD_RESOURCE = 'ADD_RESOURCE';
export const UPDATE_RESOURCE = 'UPDATE_RESOURCE';
export const REMOVE_RESOURCE = 'REMOVE_RESOURCE';

export const updateIcon = icon => ({
  type: UPDATE_ICON,
  payload: icon,
});

export const updateTextInput = textinput => ({
  type: UPDATE_TEXTINPUT,
  payload: textinput,
});

export const removeIcon = index => ({
  type: REMOVE_ICON,
  payload: index,
});

export const addResource = newResource => ({
  type: ADD_RESOURCE,
  payload: newResource,
});

export const updateResource = (indexUpdated, resource) => ({
  type: UPDATE_RESOURCE,
  payload: {index: indexUpdated, item: resource},
});

export const removeResource = indexRemoved => ({
  type: REMOVE_RESOURCE,
  payload: indexRemoved,
});
