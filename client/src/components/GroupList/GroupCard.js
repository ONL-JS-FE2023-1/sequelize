import React from 'react';
import './style.css';

const GroupCard = (props) => {
    const { name, description } = props.group;
    return (
        <article className='card-wrapper' onClick={props.onClick}>
            <h1>{name}</h1>
            <p>{description ? description : 'Description not specified'}</p>
        </article>
    );
}

export default GroupCard;