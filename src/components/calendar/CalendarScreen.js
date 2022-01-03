import React, { useState } from 'react'

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'moment/locale/es';
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/calendar';
import { AddNewFlat } from '../ui/AddNewFlat';

moment.locale("es");
const localizer = momentLocalizer(moment);


const events = [{
    title: "Cumpleaños del jefe",
    start: moment().toDate(),
    end: moment().add( 2, 'hours' ).toDate(),
    bgcolor: '#fafafa',
    user:{
        _id:"123",
        name:"Jose"
    }
}];


export const CalendarScreen = () => {
    const dispatch = useDispatch();

    const [lastView, setLastView] = useState( localStorage.getItem("lastview") || "month" );


    const eventStyleGetter = (event, start, end, isSelected ) => {
        const style = {
            backgroundColor: "#367CF7",
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {style}
    }

    const onDoubleClickEvent = (e) => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive( e ) )
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem("lastview", e);
    }

    return (
        <div className='calendar-screen'>
            <Navbar />

            <Calendar 
                localizer={localizer}
                events={events}
                view={lastView}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter}
                messages={messages}
                onView={onViewChange}
                onSelectEvent={onSelectEvent}
                onDoubleClickEvent={onDoubleClickEvent}
                components={{
                    event: CalendarEvent
                }} />

                <CalendarModal />


                <AddNewFlat />
        </div>
    )
}
