import React, {useContext} from 'react';
import '../../assets/scss/components/noti.scss'
import UserContext from '../../components/utilities/ContextProviders/UserContext'
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import {useEffect} from 'react'
const Noti = () => {
    const {noti} = useContext(UserContext);
    console.dir(toast)
    
    
    const notify = () => {
        const message = JSON.parse(noti).message;
        const name = '쭈리'
        toast.info(
        <div>
            <h4>{name}</h4><br/>
            <p>{message}</p>
        </div>)
    };

    if(noti){
        return (
            <div>
                {notify()}
                <ToastContainer 
                    position='bottom-right' 
                    autoClose={3000}/>
            </div>
        );
    }
    else {
        return (
            <div>
                
            </div>
        );
    }
};

export default Noti;