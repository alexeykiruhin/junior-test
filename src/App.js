import React, {Component} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import LeftSide from "./components/LeftSide/LeftSide";
import Content from "./components/Content/Content";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draftCards: [
                {id: 0, text: 'Card1', toggleCard: false},
                {id: 1, text: 'Card2', toggleCard: false}
                ], //card = { id: 0, text: 'Hello' }
            contentCards: [
                {id: 0, text: 'Card1', toggleCard: true},
                {id: 1, text: 'Card2', toggleCard: false}
                ],
            cntCards: 0,
        };
        this.handleCreateDraft = this.handleCreateDraft.bind(this);
        this.handleCreateSave = this.handleCreateSave.bind(this);
        this.handleMark = this.handleMark.bind(this);
        this.handleContentDraft = this.handleContentDraft.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDraftSave = this.handleDraftSave.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleUpdateCntCards = this.handleUpdateCntCards.bind(this);
        this.handleUpdateIdCards = this.handleUpdateIdCards.bind(this);
        console.log('constructor');
    }

    componentWillMount() {
        //Пересчитываем зеленые индикаторы
        this.handleUpdateCntCards()
    }

    //Создать карточку в драфт
    handleCreateDraft(text) {
        const card = {id: this.state.draftCards.length, text: text, toggleCard: false};
        this.setState(state => {
            const draftCards = state.draftCards.concat(card);
            return {
                draftCards,
            };
        });
    }

    //Сохранить карточку в контент
    handleCreateSave(text) {
        const card = {id: this.state.contentCards.length, text: text, toggleCard: false};
        this.setState(state => {
            const contentCards = state.contentCards.concat(card);
            return {
                contentCards,
            };
        });
    }

    //Переключение индикатора
    handleMark(id) {
        //Копируем массив contentsCard
        const copyContentCards = this.state.contentCards;
        //переменная для хранения одной карточки
        let card = null;
        //Проходим по массиву contentCards и нахожу нужный id
        this.state.contentCards.map((element) => {
            if (element.id === id) {
                //кладем в card нужную карточку
                card = element;
                //Меняю цвет индикатора на противоположный
                card.toggleCard = !element.toggleCard;
            }
        });
        //Удаляем старую карточку и вставляем новую с измененным индикатором
        copyContentCards.splice(id, 1, card);
        //Пересчитываем количество зеленых индикаторов
        this.handleUpdateCntCards();
        //Обновляем стейт
        this.setState({contentCards: copyContentCards});
    }

    //Переместить карточку из контента в драфт
    handleContentDraft(id) {
        //Копируем массивы карточек для дальнейшего
        //удаления из одного и добавления в другой
        const copyContentCards = this.state.contentCards;
        const copyDraftCards = this.state.draftCards;
        //Переменная для хранения пересылаемой карточки
        let sendCard = null;
        //Проходим по массиву и ищем нужную карточку по id
        this.state.contentCards.map((element) => {
            if (element.id === id) {
                sendCard = element;
                //Меняем айди, чтобы не совпадали
                sendCard.id = this.state.draftCards.length;
            }
        });
        //Добавляем карточку в драфт
        copyDraftCards.push(sendCard);
        //Удаляем ее из контента
        copyContentCards.splice(id, 1);
        //Обновляем id оставшихся карточек для исключения коллизий
        this.handleUpdateIdCards(copyContentCards);
        //Пересчитываем зеленые индикаторы
        this.handleUpdateCntCards();
        this.setState({
            draftCards: copyDraftCards,
            contentCards: copyContentCards
        });
    }

    //Удалить карточку из драфта
    handleRemove(id) {
        //Копирууем массив карточек
        const copyDraftCards = this.state.draftCards;
        //Переменная для хранения удаляемой карточки
        let sendCard = null;
        //Удаляем нужный
        copyDraftCards.map((element) => {
            if (element.id === id) {
                sendCard = element;
                //Меняем айди, чтобы не совпадали
                sendCard.id = this.state.draftCards.length - 1;
            }
        });
        copyDraftCards.splice(id, 1);
        //Обновляем id оставшихся карточек для исключения коллизий
        this.handleUpdateIdCards(copyDraftCards);
        console.log('delete');
        //Обновляем стейт
        this.setState({draftCards: copyDraftCards});
    }

    //Переместить карточку из драфта в контент
    handleDraftSave(id) {
        //Копируем массивы карточек для дальнейшего
        //удаления из одного и добавления в другой
        const copyContentCards = this.state.contentCards;
        const copyDraftCards = this.state.draftCards;
        //Переменная для хранения пересылаемой карточки
        let sendCard = null;
        //Проходим по массиву и ищем нужную карточку по id
        this.state.draftCards.map((element) => {
            if (element.id === id) {
                sendCard = element;
                //Меняем айди, чтобы не совпадали
                sendCard.id = this.state.contentCards.length;
            }
        });
        //Добавляем карточку в контент
        copyContentCards.push(sendCard);
        //Удаляем ее из драфта
        copyDraftCards.splice(id, 1);
        //Обновляем id оставшихся карточек для исключения коллизий
        this.handleUpdateIdCards(copyDraftCards);
        //Пересчитываем зеленые индикаторы
        this.handleUpdateCntCards();
        //Обновляем стейт
        this.setState({
            draftCards: copyDraftCards,
            contentCards: copyContentCards
        });
    }

    handleText(id, text) {
        const copyDraftCards = this.state.draftCards;
        let changeCard = null;
        this.state.draftCards.map((element) => {
            if (element.id === id) changeCard = element;
        });
        changeCard.text = text;
        copyDraftCards.splice(id, 1, changeCard);
        this.setState({draftCards: copyDraftCards});
    }

    //Пересчитать зеленые индикаторы
    handleUpdateCntCards() {
        let cnt = 0;
        //Проходим по массиву и ищем где toggleCard === true
        this.state.contentCards.map((element => {
            if (element.toggleCard) cnt += 1;
        }));
        //Обновляем стейт
        this.setState({cntCards: cnt});
    }

    //Обновляем id оставшихся карточек для исключения коллизий
    handleUpdateIdCards(arr) {
        arr.map((element, index) => {
            element.id = index;
        });
    }

    render() {
        return (
            <div className="App">
                <Header cntCards={this.state.cntCards} />
                <LeftSide handleCreateDraft={this.handleCreateDraft}
                          handleCreateSave={this.handleCreateSave}
                          draftCards={this.state.draftCards}
                          handleRemove={this.handleRemove}
                          handleDraftSave={this.handleDraftSave}
                          handleText={this.handleText} />
                <Content contentCards={this.state.contentCards}
                         handleMark={this.handleMark}
                         handleContentDraft={this.handleContentDraft} />
            </div>
        );
    }
}

export default App;
