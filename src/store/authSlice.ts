import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {API} from "../http";
import { authStatus } from "../types/status";


interface LoginData {
  email: string;
  password: string;
}

interface User {
  username:string|null
  email: string|null;
  password: string|null;
  token: string|null;
}

interface AuthState {
  user: User ;
  status: string;
  token:string|null
}

const initialState: AuthState = {
  user: {} as User,
  status: authStatus.loading,
  token: null

};
const authSlice = createSlice({

  name: "auth",
  initialState,
  reducers: {
    setUser(state: AuthState, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setStatus(state: AuthState, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    resetStatus(state:AuthState){
      state.status =authStatus.loading
    },
    setToken(state:AuthState,action:PayloadAction<string>){
    state.user.token = action.payload
    },
    setUserLogout(state:AuthState){
      state.token=null
      state.user={
        username:null,
        email:null,
        password:null,
        token:null
      }

    }
  },
});
//name of reducer and action should be same  because reduxtoolkit will make the action automatically
export const { setUser, setStatus,resetStatus,setToken,setUserLogout} = authSlice.actions;
export default authSlice.reducer;

export function login(data: LoginData) {
  return async function loginThunk(dispatch: any){
    dispatch(setStatus(authStatus.loading))
    try{
        const response =await API.post("/login",data)
        if(response.status ===200){
          const {data}=response.data
            dispatch(setStatus(authStatus.success))
            dispatch(setToken(data))
            localStorage.setItem('token',data)
        }
        else{
            dispatch(setStatus(authStatus.error))
        }
    }catch(error){
        console.log(error)
        dispatch(setStatus(authStatus.error))
    }
  }
}
