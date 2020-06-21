import React from 'react';
import { Link } from 'react-router-dom';


const header = () => {
    return (
        <header>
            <div>
                {/* <Link to="/uncontrolled"> Uncontrolled </Link> */}
                {/* <Link to="/controlled"> Controlled </Link> */}
                <Link to="/"> Home </Link>
                <Link to="/user"> Sign up </Link>
                <Link to="/login"> Login/Logout </Link>
            </div>
        </header>
    );
};

export default header;
