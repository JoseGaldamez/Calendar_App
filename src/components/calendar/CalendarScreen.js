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
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/calendar';
import { AddNewFlat } from '../ui/AddNewFlat';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale("es");
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    const dispatch = useDispatch();
    const {events} = useSelector(state => state.calendar );

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

    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() )
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
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onViewChange}
                onSelectEvent={onSelectEvent}
                onDoubleClickEvent={onDoubleClickEvent}
                components={{
                    event: CalendarEvent
                }} />

                <CalendarModal />


                <AddNewFlat />
                <DeleteEventFab />
        </div>
    )
}
