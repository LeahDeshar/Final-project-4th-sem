import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './factory.css'
import { UserContext } from '../utils/Context';
import { BsBell } from 'react-icons/bs';
import { BiSolidBellRing } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import store from '../../redux/store';
import { getCurrentUser, updateproUserCategory } from '../../redux/auth/authAction';

function Factorystep({step1,step2,step3,step4}) {
    const dispatch = useDispatch();
    // const {serName,categoryList,updateCategoryList}= useContext(UserContext)
    const {serName}= useContext(UserContext)

    const res = useSelector(state=>state.auth)
    const [isNotificationClicked, setNotificationClicked] = useState(false);
     

    
    
    
    
  const [categoryList,setCategoryList] = useState({
    laundary: false,
    painter:  false ,
    chef: false ,
    carService:  false ,
    plumber: false ,
    electrician:false ,
    category7: false ,
    category8:  false ,
    furniture:  false ,
    cleaning: false ,
    petcare1:  false ,
    petcare2: false 
    })
  
    const updateCategoryList = (input) => {
        console.log("category List",res.user.category)
        let updateList = res.user.category
        if (updateList.hasOwnProperty(input)) {
          const updatedCategoryList = {
            ...updateList,
            [input]: !updateList[input],
          };
          console.log( {
            ...updateList,
            [input]: !updateList[input],
          },
          { updatedCategoryList },
          "testing true category"
          )
          setCategoryList(updatedCategoryList);
         dispatch(updateproUserCategory({  updatedCategoryList }));
        }
      };
    const handleNotificationClick = () => {
        const input = serName.toLowerCase()
        updateCategoryList(input)
        setNotificationClicked(!isNotificationClicked);
       
    //    dispatch(updateproUserCategory({categoryList}))
    //    dispatch(getCurrentUser())

        
    };
    // useEffect(() => {
    //    dispatch(getCurrentUser())     
    // }, [dispatch])

    useEffect(() => {
        dispatch(getCurrentUser())     
     }, [dispatch])
     useEffect(() => {
         if (categoryList !== res.user.category) {
           setCategoryList(res.user.category)
         }
     }, [res.user.category,categoryList])
  return (
    <div className='factorystep__container'>
        <div className="component">
            {res.user.role==='Provider'?  <h1 className='factory__header'>    {serName}</h1>:<h1 className='factory__header'>SERVICES</h1>}
       
        <div className="factory__navbar">
        <div className='factory__navbar-left'>
            
            <div className='themelink'>
            {step1 ? (
                <Link className='factory__dark' to={'/work-on-progress'}>Work On Progress</Link>
            ) : (
                <Link to={'/work-on-progress'} className='factory__color'>Work On Progress</Link>
            )}
            </div>
            <div>
            {step2 ? (
                <Link to={'/service-posted'} className='factory__dark'>{res.user.role==='Provider'? "Customer Post" : "My Post"}</Link>
            ) : (
                <Link to={'/service-posted'} className='factory__color'>{res.user.role==='Provider'? "Customer Post" : "My Post"}</Link>
            )}
            </div>
            <div>
            {step3 ? (
                <Link to={'/service-request'}className='factory__dark'>{res.user.role==='Provider'? "My Request" : "Incomming Request"}</Link>

                ) : (
                    <Link to={'/service-request'} className='factory__color'>{res.user.role==='Provider'? "My Request" : "Incomming Request"}</Link>
                )}
            </div>
            <div>
           { 
           res.user.role==='Customer'?<>
           {step4 ? (
                <Link to={'/all-post'}className='factory__dark'>History Log</Link>

                ) : (
                    <Link to={'/all-post'} className='factory__color'>History Log</Link>
                )}
           
           </>:
           <></>
            }
            </div>
                        
            
        </div>
        </div>
           
        </div>
    </div>
  )
}

export default Factorystep