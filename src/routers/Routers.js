import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import { startChecking } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const Routers = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch]);


    if (checking) {
        return <h5>Espere...</h5>
    }

    return (
        <Router>
            <div>

                    { uid != null ? ( 
                        <Routes>
                            <Route path="/" exact element={<CalendarScreen />} />
                            <Route path="/*" element={<Navigate to='/' />} />
                        </Routes>
                        ) : (
                        <Routes>
                            <Route path="/login" exact element={<LoginScreen />} />
                            <Route path="/*" element={<Navigate to='/login' />} />
                        </Routes>
                    )}

            </div>
        </Router>
    )
}
