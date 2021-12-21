import React, { useContext } from 'react';
import UserContext from '../../utilities/ContextProviders/UserContext';

const Bottom = () => {
    const { authUser } = useContext(UserContext);
    
    return (
        <nav>
            <ul id="main-menu">
                {navItems(nav.top)}
                <NavSpacer />
                {navItems(nav.bottom)}
            </ul>
        </nav>
    );
};

export default Bottom;