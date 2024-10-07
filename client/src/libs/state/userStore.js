import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const initialState = {
  currentUser: null,
  noteId: null,
};

export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo", //string action type
  async (uid, { rejectWithValue }) => {
    // payload creator callback, once called will return promise
    try {
      const docSnap = await getDoc(doc(db, "users", uid));

      if (docSnap) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchUserInfo.pending, (state) => {
    //   state.currentUser = null;
    // });

    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });

    builder.addCase(fetchUserInfo.rejected, (state) => {
      state.currentUser = null;
    });
  },
});

export default authSlice.reducer;
export const { logoutUser } = authSlice.actions;
