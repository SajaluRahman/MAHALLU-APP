// src/redux/slices/complaintsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig"; // adjust path to your firebase config

type Complaint = {
  id: string;
  [key: string]: any;
};

type ComplaintsState = {
  data: Complaint[];
  loading: boolean;
  error: string | null;
};

const initialState: ComplaintsState = {
  data: [],
  loading: false,
  error: null,
};

// Thunk to fetch complaints
export const getComplaints = createAsyncThunk(
  "complaints/fetchAll",
  async (_, thunkAPI) => {
    try {
      const snapShot = await getDocs(collection(firestore, "complaints"));
      const data = snapShot.docs.map((doc) => {
        const rawData = doc.data();
        return {
          id: doc.id,
          ...rawData,
          createdAt: rawData.createdAt?.toDate().toISOString() || null, // convert here
        };
      });
     

      return data;
      
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


const complaintsSlice = createSlice({
  name: "complaints",
  initialState,
  reducers: {
    setComplaints(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setComplaints } = complaintsSlice.actions;
export default complaintsSlice.reducer;
