import React, {Component} from 'react';
import css from './Content.module.css';

class Content extends Component {

    render() {
        return (
            <div className={css.content}>
                {(this.props.contentCards || []).map((element, index) =>
                    <div key={index} className={css.cardContent}>
                        <p>{element.text}</p>
                        <div className={element.toggleCard ? css.toggleCardGreen: css.toggleCardRed}> </div>
                        <button className={css.draftBtn}
                                onClick={() => this.props.handleContentDraft(element.id)}>Draft</button>
                        <button className={css.markBtn}
                                onClick={() => this.props.handleMark(element.id)}>Mark</button>
                    </div>
                )}
            </div>
        );
    }
}

export default Content;
