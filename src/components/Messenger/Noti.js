import React, {useContext, useState} from 'react';
import '../../assets/scss/components/noti.scss'
import UserContext from '../../components/utilities/ContextProviders/UserContext'
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import {useEffect} from 'react'
const Noti = () => {
    const {noti, setNoti} = useContext(UserContext);
    console.dir(toast)
    
    
    const notify = () => {
        if(!noti) return;

        console.dir(noti)
        setNoti(null)
        const message = noti.message;
        const name = noti.name

        // 색상
        if(noti.type == "channel"){
            toast.warning(
                <div>
                    <h4>{name}</h4><br/>
                    <p>{message}</p>
                </div>)

        }else{
        toast.info(
        <div>
            <h4>{name}</h4><br/>
            <p>{message}</p>
        </div>)
        }
    };

    return (
        <div>
            {notify()}
            <ToastContainer 
                position='bottom-right' 
                autoClose={3000}/>
        </div>
    );

    

    // if(noti){
    //     return (
    //         <div>
    //             {notify()}
    //             <ToastContainer 
    //                 position='bottom-right' 
    //                 autoClose={3000}/>
    //         </div>
    //     );
    // } else {
    //     return (
    //         <div>
                
    //         </div>
    //     );
    // }
};

export default Noti;