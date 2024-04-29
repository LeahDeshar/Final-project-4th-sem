import { userLogin, userRegister } from "../redux/Features/auth/authAction";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please Provide All Information");
    }
    store.dispatch(userLogin({email, password, role}))
    console.log("login", e, email, password, role);
  } catch (error) {
    console.log(error);
  }
};
  export const handleRegister = (
    e,
    role,
    email,
    password
  ) => {
    e.preventDefault();
    try {
      store.dispatch(userRegister(
       { 
        role,
        email,
        password,
       }))
      console.log(
        "Register => ",
       
        role,
        email,
        password,
       
      );
    } catch (error) {
      console.log(error);
    }
  };