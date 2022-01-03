import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store';


import { Routers } from './routers/Routers'




export const CalendarApp = () => {
    return (
        <Provider store={ store }>
            <Routers />
        </Provider>
    )
}
