// import React,{useEffect} from 'react'
// import{useDispatch} from 'react-redux'
// import API from '../../services/API'
// import { getCurrentUser } from '../../redux/features/auth/authActions'
// import { Navigate } from 'react-router-dom'
// const ProtectedRoute = ({children}) => {
//     const dispatch = useDispatch()

//     // get current user
//     const getUser = async()=>{
//         try{
//             const {data}= await API.get('/auth/currentuser')
//             if(data?.success){
//                 dispatch(getCurrentUser(data))
//             }
//         }catch(error){

//             localStorage.clear()
//             console.log(error)
//         }
//     }

//     useEffect(()=>{
//         getUser()
//     })
// if(localStorage.getItem('token')){
//     return children
// }else{
//     return <Navigate to ="/login"/>
// }
// };

// export default ProtectedRoute



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import API from '../../services/API';
import { getCurrentUser } from '../../redux/features/auth/authActions';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  // Step 1: Local loading state for showing a spinner while checking
  const [loading, setLoading] = useState(true);

  // Step 2: Get user data from Redux (optional but more reliable)
  const { user } = useSelector((state) => state.auth);


  // Step 3: Function to check if token is valid and get user
// eslint-disable-next-line no-unused-vars
  const getUser = async () => {
    try {
      const { data } = await API.get('/auth/currentuser'); // Backend check
      if (data?.success) {
        dispatch(getCurrentUser(data)); // Set user in Redux
      } else {
        localStorage.clear(); // Clear invalid token
      }
    } catch (error) {
      localStorage.clear(); // Also clear if token is expired or broken
      console.log('Token invalid:', error);
    } finally {
      setLoading(false); // Stop loading after check
    }
  };

  // Step 4: Run the check only once when component loads
//   useEffect(() => {
//     if (localStorage.getItem('token')) {
//       verifyUser(); // Token exists? Verify with server
//     } else {
//       setLoading(false); // No token? Stop loading and go to login
//     }
//   }, []);


useEffect(() => {
  const getUser = async () => {
    try {
      const { data } = await API.get('/auth/currentuser');
      if (data?.success) {
        dispatch(getCurrentUser(data));
      } else {
        localStorage.clear();
      }
    } catch (error) {
      localStorage.clear();
      console.log('Token invalid:', error);
    } finally {
      setLoading(false);
    }
  };

  if (localStorage.getItem('token')) {
    getUser();
  } else {
    setLoading(false);
  }
}, [dispatch]);


  // Step 5: Show a spinner or message while checking
  if (loading) {
    return <h2>Loading...</h2>; // Can replace with a fancy loader
  }

  // Step 6: If token exists AND user is set, allow access
  if (localStorage.getItem('token') && user) {
    return children;
  }

  // Step 7: If not authenticated, redirect to login
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
