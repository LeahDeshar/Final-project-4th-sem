import React, { useEffect } from 'react'
import {Navigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import API from '../services/API'
import { getCurrentUser } from '../redux/auth/authAction'

function PrivateRoutes({children}) {
    const dispatch = useDispatch()

    const getUser = async () => 
    {
        try{
            const {data} = await API.get('/auth/current-user')
            if(data?.success){
                dispatch(getCurrentUser(data))
            }
        }catch(error)
        {
            localStorage.clear()
            console.log(error);
        }
    }
    useEffect(()=>
    {
        getUser()
    })

    if(localStorage.getItem('token'))
    {
        return children 
    }else 
    {
        return <Navigate to="/login"/>
    }
  
}

export default PrivateRoutes