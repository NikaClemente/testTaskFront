import React from 'react';
import { bindAll } from 'lodash';
import ProviderElement from './providerElement';
import Providers from '../date/providers';
import styled from 'styled-components';


const CSSProviders = styled.div`
    width: 30%;
    margin-top: 50px;
`;

const CSSProvidersTitle = styled.div`
    text-align: center;
    font-size: 24px;
    font-weight: bold;
`;

const CSSProvidersElements = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 20px;
`;

const CSSModal = styled.div`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 270px;
    transform: translate(-50%, -50%);
    z-index: 10;
    background: white;
    border-radius: 1%;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
`;

const CSSModalElements = styled.div`
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    top: -30px;
    width: 80%;
    height: 100%;
`;

const CSSModalTitle = styled.div`
    /* margin: 0 auto; */
    margin-top: 30px;
    padding-bottom: 10px;
    
    border-bottom: 3px black solid;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
`;

const CSSBtnClose = styled.button`
    position: absolute;
    right: 0;
    width: 40px;
    height: 30px;
    font-size: 20px;
    font-weight: 600;
    
`;

const CSSInput = styled.input`
    width: 100%;
`;

const CSSBtnSubmit = styled.button`
    position: absolute;
    width: 100%;
    bottom: 0px;
    right: 0px;
`;

const CSSTextInput = styled.div`
    margin-top: ${props => props.first ? '30px' : '10px'};
    font-size: 14px;
`;


const CSSPayDone = styled.div`
    position: absolute;
    font-size: 12px;
    color: ${props => props.error ? 'red' : 'green'};
    bottom: 10px;
    width: 100%;
    text-align: center;
`;

const CSSErrorText = styled.div`
    color: red;
    font-size: 12px;
`;



export default class ProviderList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            modalTitle: "",
            modalIsOpen: false,
            isVisible: false,
            isDone: false,
            isError: true,
            errorPhone: false,
            errorPhoneText: '',
            errorPay: false,
            errorPayText: '',
            phone: '',
            pay: ''
            
        }

        bindAll(this, ['selectElement', 'modalClose', 'rand', 'modalSubmit', 'changePhone', 'changePay', 'isFormValid', 'isPhoneValid' , 'isPayValid'])
    }
    

    selectElement(element) {
        this.setState({
            modalTitle: element.provider.name,
            modalIsOpen: true
              }
        );
    }

    modalClose() {
        this.setState({
            modalIsOpen: false,
            isVisible: false,
            isDone: false,
            errorPhone: false,
            errorPhoneText: '',
            errorPay: false,
            errorPayText: '',
            phone: '',
            pay: ''
            }
        );
    }

    rand(){
        let min = 1;
        let max = 100;
        let rand =  min + (Math.random() * (max-min));
        return Math.round(rand);
    }

    changePhone (e) {
        this.setState({ 
            phone: e.target.value
         })
    }

    changePay (e) {
        this.setState({ 
            pay: e.target.value
         })
    }

    modalSubmit (event) {
        event.preventDefault();

        if (!this.isFormValid()) return;

        let random = this.rand() > 50 ? true : false;

        this.setState({ 
            isVisible: true,
            isDone: random
         })

         if (random) {
            setTimeout(() => {
                this.modalClose();
            }, 1000);
         }
    }

    isFormValid() {
        return this.isPhoneValid(this.state.phone) && this.isPayValid(this.state.pay)
    }

    isPhoneValid(phone) {
        let errorPhoneText = '';
        let pattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/

        if (phone === ''){
            errorPhoneText = 'Поле не может быть пустым!';
            this.setState({ 
                errorPhoneText,
                errorPhone: true
             });
            return false;
        }

        if(!pattern.test(phone)){
            errorPhoneText = 'Введите корректный номер телефона! (Пример: 81234567899)';
            this.setState({ 
                errorPhoneText,
                errorPhone: true
             });
            return false;
        }

        this.setState({ 
            errorPhoneText,
            errorPhone: false
         });

        return true;
    }

    isPayValid(payT) {

        let errorPayText = '';

        if (!Number(payT)){
            errorPayText = 'Введите числовое значение!';
            this.setState({ 
                errorPayText,
                errorPay: true
             });
            return false;
        }


        let pay = Number(payT);
        if (pay <= 0){
            errorPayText = 'Сумма должна быть больше 0 руб.!';
            
            this.setState({ 
                errorPayText,
                errorPay: true
             });
            return false;
        }

        if (pay > 1000 ){
            errorPayText = 'Сумма должна быть меньше 1000 руб.!';
            
            this.setState({ 
                errorPayText,
                errorPay: true
             });
            return false;
        }

        this.setState({ 
            errorPayText,
            errorPay: false
         });
         
        return true;
    }
    
    render() {
        return (
            <CSSProviders>
                <CSSProvidersTitle>Список операторов</CSSProvidersTitle>
                <CSSProvidersElements>
                    {Providers.map(provider => {
                        return <ProviderElement provider={provider} key={provider.id} onClick={this.selectElement}/>
                    })}
                </CSSProvidersElements>
                {
                    this.state.modalIsOpen &&
                    <CSSModal> 
                        <CSSBtnClose onClick={this.modalClose}>X</CSSBtnClose>
                        
                        <CSSModalElements>
                        <CSSModalTitle>{this.state.modalTitle}</CSSModalTitle>
                        <form >
                                
                                <CSSTextInput first>Номер телефона:</CSSTextInput>
                                <CSSInput 
                                    name="phoneNumber" 
                                    placeholder="* +7(___)___-__-__" 
                                    value={ this.state.phone }
                                    onChange={ this.changePhone }
                                    />
                            
                                {
                                    this.state.errorPhone &&
                                    <CSSErrorText>{this.state.errorPhoneText}</CSSErrorText>
                                }
                                <CSSTextInput>Сумма:</CSSTextInput>
                                <CSSInput 
                                    name="pay"
                                    placeholder="* Сумма от 1 руб. до 1000 руб."  
                                    value={ this.state.pay }
                                    onChange={ this.changePay }
                                    />
                                  
                                  {
                                    this.state.errorPay &&
                                    <CSSErrorText>{this.state.errorPayText}</CSSErrorText>
                                }
                            <CSSBtnSubmit type="submit" onClick={ this.modalSubmit }>Отправить</CSSBtnSubmit>
                            
                            </form>
                        </CSSModalElements>
                        
                        {
                            this.state.isVisible && this.state.isDone &&
                            <CSSPayDone>* Оплата прошла успешно!</CSSPayDone>
                        }

                        {
                            this.state.isVisible && !this.state.isDone &&
                            <CSSPayDone error>* Ошибка отправки! Повторите попытку позднее...</CSSPayDone>
                        }
                        
                    </CSSModal>
                }
            </CSSProviders>
            
        );
    }
}
    
