import React from 'react';

const Field = (props) => {
    return (
        <div className="form-field d-flex align-items-center">
            <input key={props.key} type={props.type} name={props.id} id={props.id} placeholder={props.placeholder} onChange={props.onChange}/>
        </div>
    )
}
export default Field;