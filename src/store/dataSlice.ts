import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, Initialstate, OrderData, OrderStatus, Product, SingleOrder, User } from '../types/data';
import { authStatus } from '../types/status';
import { AppDispatch } from './store';
import { APIAuthenticated } from '../http';

export interface AddProduct{
  productName:string,
  price: number,
  description:string,
  image: null,
  categoryId:string,
  productQuantity:number,
}

const initialState: Initialstate = {
  products: [],
  users: [],
  orders: [],
  status: authStatus.loading,
  singleProduct: null,
  category:[],
  singleOrder:[]
};
interface DeleteOrder {
  orderId: string;
}
interface DeleteUser {
userId: string;
}

interface DeleteProduct {
  productId: string;
  }
  interface DeleteCategory{
    categoryId: string;
   }
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
    setCategory(state: Initialstate, action: PayloadAction<Category[]>) {
      state.category = action.payload;
    },
    setSingleProduct(state: Initialstate, action: PayloadAction<Product>) {
      state.singleProduct = action.payload;
    },
    setSingleOrder(state: Initialstate, action: PayloadAction<SingleOrder[]>) {
      state.singleOrder = action.payload;
    },
    updateOrderStatusById(state:Initialstate,action:PayloadAction<{orderId : string, status : OrderStatus}>){
      const index =  state.singleOrder.findIndex(order=>order.id=action.payload.orderId)
       if(index !== -1){
           state.singleOrder[index].Order.orderStatus = action.payload.status 
           console.log(action.payload.status,"STATUS")
       }
   },
    setDeleteOrder(state: Initialstate, action: PayloadAction<DeleteOrder>) {
      const index = state.orders.findIndex(
        (item) => (item.id === action.payload.orderId),
      );
      if(index!==-1){
      state.orders.splice(index, 1);
      }
    },
    setDeleteUser(state: Initialstate, action: PayloadAction<DeleteUser>) {
      const index = state.users.findIndex(
        (item) => item.id === action.payload.userId, 
      );
    
      if (index !== -1) {
        state.users.splice(index, 1); 
      }
    },
    setDeleteProduct(state: Initialstate, action: PayloadAction<DeleteProduct>) {
      const index = state.products.findIndex(
        (item) => item.id === action.payload.productId, 
      );
    
      if (index !== -1) {
        state.products.splice(index, 1); 
      }
    },
    setDeleteCategory(state: Initialstate, action: PayloadAction<DeleteCategory>) {
      const index = state.category.findIndex(
        (item) => item.id === action.payload.categoryId, 
      );
    
      if (index !== -1) {
        state.category.splice(index, 1); 
      }
    },
  },
});
export const {
  setOrders,
  setProducts,
  setStatus,
  setUsers,
  setSingleProduct,
  setDeleteOrder,
  setDeleteUser,
  setDeleteProduct,
  setDeleteCategory,
  setCategory,
  setSingleOrder,
  updateOrderStatusById
} = dataSlice.actions;
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

export function addProduct(data: AddProduct) {
  return async function addProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.post('/admin/product', data,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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
      const response = await APIAuthenticated.delete(
        `/admin/product/${productId}`,
      );
      if (response.status == 200) {
        dispatch(setStatus(authStatus.success));
        dispatch(setDeleteProduct({productId:productId}))
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
      const response = await APIAuthenticated.get(
        `/admin/product/${productId}`,
      );
      if (response.status == 200) {
        dispatch(setStatus(authStatus.success));
        dispatch(setSingleProduct(response.data.data));
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}

export function deleteOrder(orderId: string) {
  return async function deleteOrderThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.delete(`/order/admin/${orderId}`);
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


export function DeleteUser(userId: string) {
  return async function deleteUserThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.delete(`/admin/users/${userId}`);
      if (response.status == 200) {
        dispatch(setStatus(authStatus.success));
        dispatch(setDeleteUser({userId:userId}))
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}
export function addCategory(data:{categoryName:string}) {
  return async function addCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.post('/admin/category', data)
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

export function deleteCategory(categoryId: string) {
  return async function deleteCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.delete(`/category/${categoryId}`);
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
export function fetchCategory() {
  return async function fetchCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.get('/category');
      if (response.status == 200) {
        const { data } = response.data;
        dispatch(setStatus(authStatus.success));
        dispatch(setCategory(data));
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}
export function fetchSingleOrder(orderId: string) {
  return async function fetchSingleOrderThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.get(
        `/order/customer/${orderId}`,
      );
      if (response.status == 200) {
        dispatch(setStatus(authStatus.success));
        dispatch(setSingleOrder(response.data.data));
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}
export function handleOrderStatusById(status:OrderStatus,id:string){
  return async function handleOrderStatusThunk(dispatch : AppDispatch){
      dispatch(setStatus(authStatus.loading))
      try {
          const response = await APIAuthenticated.patch('/order/admin/' + id,{orderStatus : status})
          if(response.status === 200){
              dispatch(setStatus(authStatus.success))
              dispatch(updateOrderStatusById({orderId:id,status}))
          }else{
              dispatch(setStatus(authStatus.error))
          }
      } catch (error) {
          dispatch(setStatus(authStatus.error))
      }
  }
}