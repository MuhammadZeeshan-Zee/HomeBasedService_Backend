// App.js
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Ourcleaning from './components/Our Cleaning/Ourcleaning';
import Book from './components/Book/Book';
import Thanks from './components/Book/Thanks';
import Colony from './components/Services Area/Colony';
import Town from './components/Services Area/Town';
import Ghakhar from './components/Services Area/Ghakhar';
import Sattelite from './components/Services Area/Sattelite';
import FAQComponent from './components/About/FAQComponent';
import Verify from './components/Client Portal/Verify';
import Blog from './components/About/Blog';
import TermsAndConditions from './components/About/TermsAndConditions';
// In your index.js or App.js
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from './components/Client Portal/Login';
import Register from './components/Client Portal/Register';
import Profile from './components/Client Portal/Profile';
import OrderHistory from './components/Client Portal/OrderHistory';
import UpdateProfile from './components/Client Portal/UpdateProfile';
import ForgetPassword from './components/Client Portal/ForgetPassword';
import ResetPassword from './components/Client Portal/ResetPassword';
import ChangePassword from './components/Client Portal/ChangePassword';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/MainLayout';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Employees from './pages/Employees';
import ManageServices from './pages/ManageServices';
import UserContextProvider from './components/Context/UserContextProvider';
import PrivateRoute from './components/PrivateRoute';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import NotLogin from './pages/NotLogin';


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <UserContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Ourcleaning />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/OrderHistory" element={<OrderHistory />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
                <Route path="/forgetpassword" element={<ForgetPassword />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/ChangePassword" element={<ChangePassword />} />
                <Route path="/verify" element={<Verify />} />

                <Route path="/*" element={<NotLogin />} />
                <Route path="/Book" element={<Book />} />
                <Route path="/thanks" element={<Thanks />} />

                <Route path="/colony" element={<Colony />} />
                <Route path="/Town" element={<Town />} />
                <Route path="/Ghakhar" element={<Ghakhar />} />
                <Route path="/sattelite" element={<Sattelite />} />
                <Route path="/faq" element={<FAQComponent />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/termsandconditions" element={<TermsAndConditions />} />

                {/* Admin Route */}
                <Route
                  path="/admin/*"
                  element={
                    <PrivateRoute requiredRole="admin">
                      <MainLayout />
                    </PrivateRoute>
                  }>
                  <Route index element={<Dashboard />} />
                  <Route path="Orders" element={<Orders />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="Employees" element={<Employees />} />
                  <Route path="ManageServices" element={<ManageServices />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </UserContextProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;