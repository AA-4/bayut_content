import React, { useState, useRef } from 'react';

const Accordion = props => {
    const [active, setActive] = useState('');
    const [height, setHeight] = useState('20px');
    const content = useRef(null);

    const toggleAccordion = () => {
        setActive(active === '' ? props.status : '');
        setHeight(active === props.status ? '20px' : `${content.current.scrollHeight}px`);
    };

    return (
        <div className={props.className}>
            <div
                ref={content}
                className={props.isMobile ? active : ''}
                style={{
                    maxHeight: `${props.isMobile ? height : ''}`,
                    overflow: `hidden`,
                    transition: `max-height 0.6s ease`,
                }}
            >
                {props.isMobile && <button className={active} onClick={toggleAccordion}></button>}
                {props.children}
            </div>
        </div>
    );
};

export default Accordion;
