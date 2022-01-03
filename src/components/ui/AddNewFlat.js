import React from 'react'
import { useDispatch } from 'react-redux'
import { eventClearActiveEvent } from '../../actions/calendar';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFlat = () => {


    const dispatch = useDispatch();

    const handleAddNewEvent = () => {
        dispatch( eventClearActiveEvent() );
        dispatch( uiOpenModal() );
    }

    return (
        <button className='btn btn-primary fab' onClick={handleAddNewEvent} >
            <i className='fas fa-plus'></i>
        </button>
    )
}
