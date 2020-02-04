import React, {Component} from 'react';
import css from './Draft.module.css';

class Draft extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, id) {
        this.props.handleText(id, e.target.value)
    }

    render() {
        return (
            <div className={css.draft}>
                <h2>Draft</h2>
                <div className={css.draftList}>
                    {(this.props.draftCards || []).map((element, index) =>
                        <div key={index} className={css.cardDraft}>
                            <input className={css.text}
                                   type="text"
                                   value={element.text}
                                   onChange={(e) => this.handleChange(e, element.id)} />
                            <div className={css.cardBtns}>
                                <div className={css.removeBtn}
                                     onClick={() => this.props.handleRemove(element.id)}>Remove</div>
                                <div className={css.saveBtn}
                                     onClick={() => this.props.handleDraftSave(element.id)}>Save</div>
                            </div>
                        </div>)}
                </div>
            </div>
        );
    }
}

export default Draft;
