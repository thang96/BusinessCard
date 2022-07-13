import {createAction, createSlice, current} from '@reduxjs/toolkit';
import axios from 'axios';
import {svgimages, svgvehicle} from '../../constants';
const initialState = {
  svgStore: [],
  //   loading: false,
  //   hasErrors: false,
};
export const listSvgSlice = createSlice({
  name: 'svgStore',
  initialState,
  reducers: {
    updateListSvg: (state, actions) => {
      state.svgStore = actions.payload;
      // state.user = [...current(state.user), actions.payload];
    },
    // getPosts: state => {
    //   state.loading = true;
    // },
    // getPostsSuccess: (state, {payload}) => {
    //   state.posts = [...current(state.posts), payload];
    //   state.loading = false;
    //   state.hasErrors = false;
    // },
    // getPostsFailure: state => {
    //   state.loading = false;
    //   state.hasErrors = true;
    // },
    // deleteData: (state, {payload}) => {
    //   const newData = [...current(state.posts)];
    //   const newUpdate = newData.filter((item, index) => item.id !== payload.id);
    //   state.posts = newUpdate;
    // },
  },
});

export const {updateListSvg} = listSvgSlice.actions;

export const svgStore = state => state.listSvg.svgStore;

export default listSvgSlice.reducer;

// export const getSvg = dataInput => {
//   if (dataInput === 'Animal') {
//     updateListSvg(svgimages);
//   } else if (dataInput === 'Vehicle') {
//     updateListSvg(svgvehicle);
//   }
// };
// export const getSvg = async dataInput => {
//   const {data,query} = dataInput;
//   return new Promise((resole, reject) => {
//     const formData = new FormData();
//     formData.append('data', data ?? '');
//     await axios
//       .post(`url${query}`, formData, {
//         Accept: 'application/json',
//         'Content-Type': 'multipart/form-data',
//         Authorization: 'Basic YnJva2VyOmJyb2tlcl8xMjM=',
//       })
//       .then(res => {
//         resole(dispatch(getPostsSuccess(res.data)));
//       })
//       .catch(errors => {
//         reject(errors.response);
//       });
//   });
// };
