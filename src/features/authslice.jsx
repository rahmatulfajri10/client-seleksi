import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../configs";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        `${config.api_host_dev}/api/v1/cms/login`,
        {
          username: user.username,
          password: user.password,
        }
      );
      if (response === undefined) {
        // Tidak ada respons dari API, anggap sebagai kesalahan
        return thunkAPI.rejectWithValue("Tidak ada respons dari server");
      }

      localStorage.setItem("token", response.data.data.token);
      return response.data.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;

        return thunkAPI.rejectWithValue(message);
      } else if (error.code === "ECONNABORTED") {
        const message = "Connection timed out. Please try again later.";

        return thunkAPI.rejectWithValue(message);
      } else {
        // Handle error jaringan di sini
        const errorMessage = "Koneksi gagal, Periksa Jaringan Anda";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  }
);

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const response = await axios.post(
      `${config.api_host_dev}/api/v1/cms/me`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response === undefined) {
      // Tidak ada respons dari API, anggap sebagai kesalahan
      return thunkAPI.rejectWithValue("Tidak ada respons dari server");
    }
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    } else if (error.code === "ECONNABORTED") {
      const message = "Connection timed out. Please try again later.";

      return thunkAPI.rejectWithValue(message);
    } else {
      // Handle error jaringan di sini
      const errorMessage = "Koneksi gagal atau server tidak tersedia";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
});

export const LogOut = createAsyncThunk("user/LogOut", async () => {
  await axios.post(`${config.api_host_dev}/api/v1/cms/logout`, {
    token: localStorage.getItem("token"),
  });
  localStorage.removeItem("token");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //Get User Login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
