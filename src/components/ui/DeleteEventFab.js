import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { eventDeleted } from '../../actions/calendar';

export const DeleteEventFab = () => {

    const {activeEvent} = useSelector (state => state.calendar)
    const dispatch = useDispatch();


    const onHandleDelete = () => {
        dispatch( eventDeleted() );
    }


    if (!activeEvent) {
        return null;
    } else {
        return (
            <button onClick={onHandleDelete} className='btn btn-danger fab-danger'>
                <i className='fas fa-trash'></i>
                <span> Borrar Evento</span>
            </button>
        )
    }


}
