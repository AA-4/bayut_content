import React from 'react';
import { animatedSpinner } from 'shared-ui/core/images';

const Spinner = () => {
    return (
        <>
            <img className="loader" src={animatedSpinner} alt="Loading" />
        </>
    );
};
export default Spinner;
