import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
function Register()
{ 
  return(  
  <Formik
    initialValues={{fullname:"", username: "", password: "" ,confirm_password:""}}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        axios.post("https://radiant-reaches-85700.herokuapp.com/register",values)
        .then(response=>{
            if(response.data!="already exist")
            {
              console.log("added")
              window.location.replace("/login");
            }
            else
            {
              window.location.replace("/userexist");
            }
            });
        setSubmitting(false);
      }, 500);
    }}

    validationSchema={Yup.object().shape({
      fullname:Yup.string()
         .required("Required"),  
      username: Yup.string()
        .email()
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number."),
      confirm_password: Yup.string()
        .required("confirm your password")
        .min(8, "Password is too short , 8 characters minimum")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")  
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;  
      return (
        <div className="container mt-5">
        <h1>Register</h1>
        <div className="row">
            <div className="col-sm-8">
                 <div className="card">
                      <div className="card-body">
                            <form >
                                <div className="form-group">
                                    <label htmlFor="fullname">fullname</label>
                                    <input
                                        name="fullname"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={values.fullname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control"
                                        style={errors.fullname && touched.fullname && {borderColor:"red"}}
                                    />
                                </div>
                                {errors.fullname && touched.fullname && (
                                    <div className="input-feedback">{errors.fullname}</div>
                                )}
                                <div className="form-group">
                                    <label htmlFor="username">username</label>
                                    <input
                                        name="username"
                                        type="text"
                                        placeholder="Enter your email"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control"
                                        style={errors.username && touched.username && {borderColor:"red"}}
                                    />
                                </div>
                                {errors.username && touched.username && (
                                    <div className="input-feedback">{errors.username}</div>
                                )}
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control"
                                        style={errors.password && touched.password&& {borderColor:"red"}}
                                    />
                                </div>
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                                <div className="input-feedback">password must contain atleast 8 characters having atleast 1 digit</div>
                                <div className="form-group">
                                    <label htmlFor="confirm_password">Confirm Password</label>
                                    <input
                                        name="confirm_password"
                                        type="password"
                                        placeholder="confirm you password"
                                        value={values.confirm_password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control"
                                        style={errors.confirm_password && touched.confirm_password && {borderColor:"red"}}
                                    />
                                </div>
                                {errors.confirm_password && touched.confirm_password && (
                                    <div className="input-feedback">{errors.confirm_password}</div>
                                )}
                                <button onClick={handleSubmit} className="btn btn-dark" disabled={!props.isValid || isSubmitting}> Register </button>
                            </form>
                      </div>
                 </div>
           </div>
        </div>
  </div>
    );     
    }}
  </Formik>
  );
}
export default Register;