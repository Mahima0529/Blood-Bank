import { loginUser, userRegister } from '../redux/features/auth/authActions';
import store from '../redux/store'


export const handleLogin=(e,email,password,role)=>{
e.preventDefault();
try{
    if(!role|| !email||!password){
        return alert("Please Provide All Details");
        }
        store.dispatch(loginUser({role, email,password}))
}catch(error){
        console.log(error);
    }
};

export const handleRegister=(e,
                              name,
                              role,
                              email,
                              password ,
                              phone,
                              organisationName,
                              address ,
                              hospitalName,
                              website)  =>{
 e.preventDefault();
 try{
      store.dispatch(userRegister({ name,
                              role,
                              email,
                              password ,
                              phone,
                              organisationName,
                              address ,
                              hospitalName,
                              website}));
 }catch(error){
      console.log(error);
    }
};