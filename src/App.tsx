import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import { Provider } from 'react-redux';
import store from './store/store';

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
          path="/forms/form-layout"
          element={
            <>
            <DefaultLayout>
            <PageTitle title="Form Layout " />
            <FormLayout />
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
          path="/settings"
          element={
            <>
             <DefaultLayout>
             <PageTitle title="Settings " />
             <Settings />
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
