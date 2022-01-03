import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowEnd = moment().minutes(0).seconds(0).add(2, 'hours');


export const CalendarModal = () => {


    // STATES

    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowEnd.toDate());

    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState({
        title: "Event Name",
        notes:"",
        start: now.toDate(),
        end: nowEnd.toDate()
    });

    const {title, notes, start, end} = formValues;

    const { modalOpen } = useSelector(state => state.ui)

    // FUNCIONTS

    const closeModal = () => {
       dispatch( uiCloseModal() )
    }

    const onChangeStartDate = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues, start: e
        });
    }

    const onChangeEndDate = (e) => {
        setDateEnd(e);

        setFormValues({
            ...formValues, end: e
        });
    }

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues, [e.target.name]:e.target.value
        });
    }

    const handleSubmitForm = ( e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd) ) {
            Swal.fire("Error", "La fecha final debe ser mayor que la del inicio", 'error');
            return;
        }

        if ( title.trim().length < 2 ) {
            setTitleValid(false);
            return;
        }


        //TODO: save in database

        setTitleValid(true);
        closeModal()
    }

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className='modal'
            overlayClassName='modal-fondo'>

            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={handleSubmitForm}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        amPmAriaLabel="Select AM/PM"
                        className='form-control'
                        onChange={onChangeStartDate}
                        value={ dateStart }
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        amPmAriaLabel="Select AM/PM"
                        minDate={dateStart}
                        className='form-control'
                        onChange={ onChangeEndDate }
                        value={ dateEnd }
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        value={title}
                        className={`form-control ${titleValid ? "" : "is-invalid"}`}
                        placeholder="Título del evento"
                        name="title"
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        value={notes}
                        className="form-control"
                        placeholder="Notas"
                        rows="3"
                        name="notes"
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block" >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
