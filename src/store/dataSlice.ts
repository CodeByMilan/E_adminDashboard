import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Initialstate, OrderData, Product, User } from '../types/data';
import { authStatus } from '../types/status';
import { AppDispatch } from './store';
import { APIAuthenticated } from '../http';

const initialState: Initialstate = {
  products: [],
  users: [],
  orders: [],
  status: authStatus.loading,
  singleProduct: null,
};

const dataSlice = createSlice({
  name: 'datas',
  initialState,
  reducers: {
    setStatus(state: Initialstate, action: PayloadAction<authStatus>) {
      state.status = action.payload;
    },
    setProducts(state: Initialstate, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setOrders(state: Initialstate, action: PayloadAction<OrderData[]>) {
      state.orders = action.payload;
    },
    setUsers(state: Initialstate, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setSingleProduct(state: Initialstate, action: PayloadAction<Product>) {
        state.singleProduct = action.payload;
      },
  },
});
export const { setOrders, setProducts, setStatus, setUsers,setSingleProduct } =
  dataSlice.actions;
export default dataSlice.reducer;

export function fetchProducts() {
  return async function fetchProductsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.get('/product');
      if (response.status == 200) {
        const { data } = response.data;
        dispatch(setStatus(authStatus.success));
        dispatch(setProducts(data));
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}

export function fetchOrders() {
  return async function orderItemThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.get('/order/admin');
      if (response.status == 200) {
        const { data } = response.data;
        dispatch(setStatus(authStatus.success));
        dispatch(setOrders(response.data.data));
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}
export function fetchUsers() {
  return async function fetchUsersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.get('/admin/users');
      if (response.status == 200) {
        const { data } = response.data;
        dispatch(setStatus(authStatus.success));
        dispatch(setUsers(response.data.data));
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}

export function addProduct(data: Product) {
  return async function addProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.post('/admin/product', data);
      if (response.status == 200) {
        const { data } = response.data;
        dispatch(setStatus(authStatus.success));
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}


export function deleteProduct(productId: string) {
    return async function deleteProductThunk(dispatch: AppDispatch) {
      dispatch(setStatus(authStatus.loading));
      try {
        const response = await APIAuthenticated.delete(`/admin/product/${productId}`);
        if (response.status == 200) {
          dispatch(setStatus(authStatus.success));
        } else {
          dispatch(setStatus(authStatus.error));
        }
      } catch (error) {
        dispatch(setStatus(authStatus.error));
      }
    };
  }

  export function singleProduct(productId: string) {
    return async function singleProductThunk(dispatch: AppDispatch) {
      dispatch(setStatus(authStatus.loading));
      try {
        const response = await APIAuthenticated.get(`/admin/product/${productId}`);
        if (response.status == 200) {
          dispatch(setStatus(authStatus.success));
          dispatch(setSingleProduct(response.data.data))
        } else {
          dispatch(setStatus(authStatus.error));
        }
      } catch (error) {
        dispatch(setStatus(authStatus.error));
      }
    };
  }

  export function deleteOrder(orderId: string) {
    return async function deleteProductThunk(dispatch: AppDispatch) {
      dispatch(setStatus(authStatus.loading));
      try {
        const response = await APIAuthenticated.delete(`/admin/order/${orderId}`);
        if (response.status == 200) {
          dispatch(setStatus(authStatus.success));
        } else {
          dispatch(setStatus(authStatus.error));
        }
      } catch (error) {
        dispatch(setStatus(authStatus.error));
      }
    };
  }