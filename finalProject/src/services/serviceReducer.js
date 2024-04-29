import { useContext } from "react";
import { createServicePost, updateServiceOfUser } from "../redux/service/serviceAction";
import store from "../redux/store";

export const handleCreateService = (date, time, address, contactInfo, details, servicePrice,category) =>
{
    console.log("state",date, time, address, contactInfo, details, servicePrice);
   
    try {
        if(!date || !time || !address || !contactInfo || !details || !servicePrice)
        {
            return alert("Fill all the information")
        }
        store.dispatch(createServicePost({date, time, address, contactInfo, details, servicePrice,category}))
        console.log({date, time, address, contactInfo, details, servicePrice});
    } catch (error) {
        console.log(error);
    }
}

