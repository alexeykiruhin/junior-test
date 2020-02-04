import React, {Component} from 'react';
import css from './CreateCard.module.css';

class CreateCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({value});
    }

    handleClick(btn) {
        if (this.state.value) {
            switch (btn) {
                case 'draft':
                    this.props.handleCreateDraft(this.state.value);
                    this.setState({value: ''});
                    break;
                case 'save':
                    this.props.handleCreateSave(this.state.value);
                    this.setState({value: ''});
            }
        }
    }

    render() {
        return (
            <div className={css.createCard}>
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <div className={css.buttons}>
                    <button onClick={() => this.handleClick('draft')}>Draft</button>
                    <button onClick={() => this.handleClick('save')}>Save</button>
                </div>
            </div>
        );
    }
}

export default CreateCard;
