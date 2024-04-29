import React, { useEffect } from 'react'
import './add.css'
import { useDispatch, useSelector } from 'react-redux';
import { getServiceOfUser } from '../../redux/service/serviceAction';


function Notification() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.role === "Provider") {
      console.log("Provider");
    } else if (user) {
      dispatch(getServiceOfUser());
    }
  }, [dispatch, user]);

  if (!user) {
    return null; // Return null or a loading spinner while user data is being fetched
  }

  let totalAuthNoti = [];
  if (user.notification && user.notification.length > 0) {
    totalAuthNoti = user.notification.flat();
  }

  let totalSeenNoti = [];
  let seenNotification = [];
  if (user.seen && user.seen.length > 0) {
    totalSeenNoti = user.seen.flat();
    if (totalSeenNoti.length > 0) {
      seenNotification = totalSeenNoti.slice(1).reverse();
      console.log(seenNotification);
    }
  }

  // const servicePost = useSelector((state) => state.service.servicePosts);

  return (
    <div className="notification">
      <div className="notification__container">
        {totalAuthNoti.length > 0 && totalAuthNoti ? (
          <>
            <h5>New Notification</h5>
            <p>
              {totalAuthNoti.map((noti) => {
                return <p>{noti}</p>;
              })}
            </p>
          </>
        ) : (
          <></>
        )}

        {totalSeenNoti.length > 0 && totalSeenNoti ? (
          <>
            <h5>Old Notification</h5>
            <p>
              {seenNotification.length > 0 && seenNotification ? (
                seenNotification.map((noti) => {
                  return <p>{noti}</p>;
                })
              ) : (
                <></>
              )}
            </p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Notification;
