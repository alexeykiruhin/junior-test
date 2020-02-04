import React, {Component} from 'react';
import css from './Header.module.css';

class Header extends Component {

    render() {
        return (
            <header className={css.header}>
                <h1>React App for <span>Aventica</span></h1>
                <div className={css.cntCards}>{this.props.cntCards}</div>
            </header>
        );
    }
}

export default Header;
