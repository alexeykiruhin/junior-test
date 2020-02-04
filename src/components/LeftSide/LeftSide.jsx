import React, {Component} from 'react';
import CreateCard from "../CreateCard/CreateCard";
import Draft from "../Draft/Draft";
import css from './LeftSide.module.css';

class LeftSide extends Component {
    render() {
        return (
            <div className={css.leftSide}>
                <CreateCard handleCreateDraft={this.props.handleCreateDraft}
                            handleCreateSave={this.props.handleCreateSave} />
                <Draft draftCards={this.props.draftCards}
                       handleRemove={this.props.handleRemove}
                       handleDraftSave={this.props.handleDraftSave}
                       handleText={this.props.handleText} />
            </div>
        );
    }
}

export default LeftSide;
