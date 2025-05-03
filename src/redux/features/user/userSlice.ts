import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  criadoEm?: string; 
  email: string;
  image: string;
  job: string;
  password: string;
  user: string;
}

const initialState: UserState = {
  criadoEm: "",
  email: "",
  image: "",
  job: "",
  password: "",
  user: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload };
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
