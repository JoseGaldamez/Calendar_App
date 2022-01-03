import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

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

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowEnd.toDate());


    const [formValues, setFormValues] = useState({
        title: "Event Name",
        notes:"",
        start: now.toDate(),
        end: nowEnd.toDate()
    })

    const { notes, title } = formValues;

    const closeModal = () => {
        console.log("Cerrando modal...");

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
        console.log(formValues);
    }

    return (
        <Modal
            isOpen={true}
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
                        className="form-control"
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
