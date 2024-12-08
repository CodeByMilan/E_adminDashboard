import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import ECommerce from './pages/Dashboard/ECommerce';

import Profile from './pages/Profile';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import { Provider } from 'react-redux';
import store from './store/store';
import AddProductPage from './pages/Form/AddProduct';
import AddCategoryPage from './pages/Form/AddCategory';
import SingleOrderPage from './pages/SingleOrderPage';
import { io } from 'socket.io-client';
import Protected from './Protected';

export const socket = io("http://localhost:3000",{
  auth : {
    token : localStorage.getItem('token')
  }
})

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Provider store={store}>
      <Routes>
      <Route
          path="/login"
          element={
            <>
              <PageTitle title="login" />
              <SignIn />
            </>
          }
        />
        
        <Route
        path='/'
          index
          element={
            <>
             <DefaultLayout>
              <PageTitle title="Dashboard " />
             <Protected> <ECommerce /></Protected>
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <DefaultLayout>
              <PageTitle title="Profile " />
              <Protected><Profile /></Protected>
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/forms/addProduct"
          element={
            <>
            <DefaultLayout>
            <PageTitle title="Add product " />
            <Protected> <AddProductPage /></Protected>
            </DefaultLayout>
            </>
          }
        />
        <Route
          path="/forms/addCategory"
          element={
            <>
            <DefaultLayout>
            <PageTitle title="Add Category " />
            <Protected><AddCategoryPage/></Protected>
            </DefaultLayout>
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
             <DefaultLayout>
             <PageTitle title="Tables " />
             <Protected><Tables /></Protected>
             </DefaultLayout>
            </>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <>
             <DefaultLayout>
             <PageTitle title="single order page" />
            <Protected><SingleOrderPage /></Protected> 
             </DefaultLayout>
            </>
          }
        />
        
        <Route
          path="/ui/alerts"
          element={
            <>
              <DefaultLayout>
              <PageTitle title="Alerts " />
              <Alerts />
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
            <DefaultLayout>
            <PageTitle title="Buttons " />
            <Buttons />
            </DefaultLayout>
            </>
          }
        />
       
      </Routes>
    </Provider>
  );
}

export default App;
