// import React, { useState } from 'react';
// import Login from './Login';
// import Register from './Register';

// function AuthPage() {
//     const [isLogin, setIsLogin] = useState(true);
//     const [isRegisterOpen, setIsRegisterOpen] = useState(false);

//     const handleToggle = () => {
//         setIsLogin(!isLogin);
//     };

//     const handleRegisterClick = () => {
//         setIsRegisterOpen(true);
//     };

//     const handleCloseRegister = () => {
//         setIsRegisterOpen(false);
//     };

//     return (
//         <div>
//             {isLogin ? (
//                 <Login onRegisterClick={handleRegisterClick} />
//             ) : (
//                 <>
//                     <button onClick={handleToggle}>Back to Login</button>
//                     {/* Render the Register when isRegisterOpen is true */}
//                     <Register isOpen={isRegisterOpen} onClose={handleCloseRegister} />
//                 </>
//             )}
//             <div>
//                 {isLogin ? (
//                     <>
//                         Don't have an account?{' '}
//                         <button onClick={handleToggle}>Register</button>
//                     </>
//                 ) : (
//                     <>
//                         Already have an account?{' '}
//                         <button onClick={handleToggle}>Login</button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default AuthPage;
