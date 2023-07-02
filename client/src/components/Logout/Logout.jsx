import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, notifyError, notifyLoggedOut } from "../../App";

const Logout = ()=>{
    const navigate = useNavigate();
    const {state, dispatch} = useContext(UserContext);

    //promises
    useEffect(()=>{
        fetch("/api/user/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type" : "application/json"

            },
            credentials: "include"
        }).then((res)=>{
            dispatch({type: "USER", payload:false});
            localStorage.removeItem('token')
            notifyLoggedOut()
            navigate("/");
            if(res.status !== 200){
                notifyError()
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            notifyError()
            console.log(err);
        })
    });
    
    return (
        <>
        
        </>
    )
}
export default Logout;