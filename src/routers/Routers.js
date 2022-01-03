import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const Routers = () => {
    return (
        <Router>
            <div>
                <Routes>

                    <Route path="/login" exact element={<LoginScreen />} />
                    <Route path="/" exact element={<CalendarScreen />} />

                    <Route path="/*" element={<Navigate to='/' />} />

                </Routes>
            </div>
        </Router>
    )
}
