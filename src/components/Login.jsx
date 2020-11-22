import React ,{ useContext } from "react";
import axios from "axios";
import {idContext} from "../App";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

function Login()
{
    const context=useContext(idContext);
    if(context.id!==null){
        context.setId(context.id);
        return <Redirect to="/keeper" />;
    }
    else
    {
        return(
            <Formik 
            initialValues={{username:"", password:"" }}
            onSubmit={(values,{ setSubmitting })=>{
                
                setTimeout(()=>{
                    axios.post("https://radiant-reaches-85700.herokuapp.com/login",values)
                    .then(response=>{
                    if(response.data!=="wrong password" && response.data !=="not found")
                    {
                        context.setId(response.data._id);
                    } 
                    });
                    setSubmitting(false);
                },500);      
            }}
            validationSchema={Yup.object().shape({
            username: Yup.string()
            .email()
            .required("Required"),
            password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/(?=.*[0-9])/, "Password must contain a number.")
            })}
            >
            {(props)=>{
                const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
                }=props;
                return (
            <div className="container mt-5">
            <h1>Login</h1>
            <div className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">
                                <form >
                                    <div className="form-group">
                                        <label htmlFor="username">username</label>
                                        <input
                                            name="username"
                                            type="text"
                                            placeholder="Enter your username"
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
                                    <button onClick={handleSubmit} className="btn btn-dark" disabled={!props.isValid || isSubmitting}> login </button>
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
}






// import React ,{useState , useEffect ,useContext} from "react";
// import axios from "axios";
// import {idContext} from "../App";
// import { Redirect } from "react-router-dom";
// function Login()
// {
//     const context=useContext(idContext);
//     const [user,setUser]=useState({
//         username:"",
//         password:""
//     });
//     // useEffect(()=>{
//     //      console.log(context.id);  
//     // });
//     function handleChange(event)
//     {
//           const {name,value}=event.target;
//           setUser(prevValue=>{
//               return {
//                   ...prevValue,
//                   [name]:value
//               };
//           });
//     }
     
//     function handleSubmit(event)
//     {
//         event.preventDefault();
//         setUser({
//             username:"",
//             password:""
//         });
        // axios.post("https://radiant-reaches-85700.herokuapp.com/login",user)
        // .then(response=>{
        //     //console.log("logged in");
        //     if(response.data!=="wrong password" && response.data !=="not found")
        //     {
        //         context.setId(response.data._id);
        //     }
        // });
//     }
//     if(context.id!==null){
//         context.setId(context.id);
//         return <Redirect to="/keeper" />;
//     }
//     else
//     {
//         return (
//             <div className="container mt-5">
//             <h1>Login</h1>
        
//             <div className="row">
//             <div className="col-sm-8">
//                 <div className="card">
//                 <div className="card-body">
//                 <form >
//                         <div className="form-group">
//                             <label for="email">Email</label>
//                             <input onChange={handleChange} type="email" className="form-control" name="username" value={user.username}/>
//                         </div>
//                         <div className="form-group">
//                             <label for="password">Password</label>
//                             <input onChange={handleChange} type="password" className="form-control" name="password" value={user.password}/>
//                         </div>
//                         <button onClick={handleSubmit} className="btn btn-dark"> Login </button>
//                     </form>
        
//                 </div>
//                 </div>
//             </div>
//             </div>
//         </div>
//         );
//     }
// }
export default Login;