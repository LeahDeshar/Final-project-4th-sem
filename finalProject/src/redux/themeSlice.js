// import { createSlice } from '@reduxjs/toolkit';

// const storedTheme = localStorage.getItem('theme');
// // const initialState = {
// //   isDarkTheme: storedTheme ? JSON.parse(storedTheme) : false,
// // };

// const themeSlice = createSlice({
//   name: 'theme',
//   initialState: {
//     isDarkTheme: storedTheme ? JSON.parse(storedTheme) : false,
//   },
//   reducers: {
//     toggleTheme: (state) => {
//       state.isDarkTheme = !state.isDarkTheme;
//       localStorage.setItem('theme', JSON.stringify(state.isDarkTheme));
//     },
//   },
// });

// export const { toggleTheme } = themeSlice.actions;
// export default themeSlice.reducer;