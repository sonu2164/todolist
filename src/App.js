// import React from 'react';
// import { Toaster } from 'react-hot-toast';
// import AppContent from './components/AppContent';
// import AppHeader from './components/AppHeader';
// import PageTitle from './components/PageTitle';
// import styles from './styles/modules/app.module.scss';

// function App() {
//   return (
//     <>
//       <div className="container">
//         <PageTitle>TODO List</PageTitle>
//         <div className={styles.app__wrapper}>
//           <AppHeader />
//           <AppContent />
//         </div>
//       </div>
//       <Toaster
//         position="bottom-right"
//         toastOptions={{
//           style: {
//             fontSize: '1.4rem',
//           },
//         }}
//       />
//     </>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppContent from './components/AppContent';
// import AppHeader from './components/AppHeader';
import Login from './components/Login' // Import your login form component
import Register from './components/Register'
// import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component for protected routes
import styles from './styles/modules/app.module.scss';
import { Navigate } from 'react-router-dom';
import Home from './components/Home';
function App() {
  return (
    <Router> {/* Wrap your components in a BrowserRouter */}
      <>
        <div className="container">


          <div className={styles.app__wrapper}>
            <Routes>

              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} /> {/* Route for the login page */}
              <Route path="/register" element={<Register />} /> {/* Route for the login page */}
              {/* Use PrivateRoute for protected routes */}

              {/* <PrivateRoute path="/todo" component={AppHeader} /> */}
              <Route path="/todo" element={<AppContent />} />
            </Routes>
          </div>
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontSize: '1.4rem',
            },
          }}
        />
      </>
    </Router>
  );
}

export default App;

