import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Chart from './pages/Chart';
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
          index
          element={
            <>
             <DefaultLayout>
              <PageTitle title="Dashboard " />
              <ECommerce />
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
              <Profile />
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
            <AddProductPage />
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
            <AddCategoryPage/>
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
             <Tables />
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
             <SingleOrderPage />
             </DefaultLayout>
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
             <DefaultLayout>
             <PageTitle title="Basic Chart " />
             <Chart />
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
