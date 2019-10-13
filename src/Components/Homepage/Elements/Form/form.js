import React from 'react';

import jsonp from "../jsones/jsonp";


class Form extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                day: '',
                month: '',
                year: ''
            };
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleChangeDay = this.handleChangeDay.bind(this);
            this.handleChangeMonth = this.handleChangeMonth.bind(this);
            this.handleChangeYear = this.handleChangeYear.bind(this);
            this.clearBlock = this.clearBlock.bind(this);

            this.request = this.request.bind(this);
            this.validation = this.validation.bind(this);
            this.lazyLoader = this.lazyLoader.bind(this);
            this.callBack = this.callBack.bind(this);
            this.contaIner = this.container.bind(this);
        }
        handleChangeDay(event) {
            this.setState({
                day: event.target.value
            });
        }
        handleChangeMonth(event) {
            this.setState({
                month: event.target.value
            });
        }
        handleChangeYear(event) {
            this.setState({
                year: event.target.value
            });
        }
        validation(inputs) {
            let errorText1 = document.querySelector('#err_day');
            let errorText2 = document.querySelector('#err_year');
            let errorText3 = document.querySelector('#err_mont');

            if (inputs[0] > 31 || inputs[0] < 1 || isNaN(inputs[0])) {
                let errorMessage = "Не меньше 1 и не больше 31  / только цифры";
                errorText2 = document.querySelector('#err_year').textContent = '';
                errorText3 = document.querySelector('#err_mont').textContent = ' ';
                errorText1.textContent = errorMessage;
                return false;
            }
            if (inputs[1] > 12 || inputs[1] < 1 || isNaN(inputs[1])) {
                let errorMessage = "Не меньше 1 и не больше 12 / только цифры";
                errorText1 = document.querySelector('#err_day').textContent = ' ';
                errorText2 = document.querySelector('#err_year').textContent = '';
                errorText3.textContent = errorMessage;
                return false;
            }
            if (inputs[2] > 1999 || inputs[2] < 1979 || isNaN(inputs[2])) {
                let errorMessage = "Возраст должен быть не менее 20 и не более 40 лет / только цифры";
                errorText1 = document.querySelector('#err_day').textContent = ' ';
                errorText3 = document.querySelector('#err_mont').textContent = ' ';
                errorText2.textContent = errorMessage;
                return false;
            } else {
                errorText1 = document.querySelector('#err_day').textContent = ' ';
                errorText2 = document.querySelector('#err_year').textContent = '';
                errorText3 = document.querySelector('#err_mont').textContent = ' ';
                return true;
            }
        }
        container(userData) {

            let template = document.querySelector('#usersInfo').children[0];
            //let element = template.children[0];

            let clone = template.cloneNode(true);

            let userAvatar = clone.children[0].children[0];
            userAvatar.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/109de7b0-3cd2-49c1-87a8-9f4beb60da6f/d8fh6oo-9b7a3cfb-2f08-4717-bb83-5a3a75774d41.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEwOWRlN2IwLTNjZDItNDljMS04N2E4LTlmNGJlYjYwZGE2ZlwvZDhmaDZvby05YjdhM2NmYi0yZjA4LTQ3MTctYmI4My01YTNhNzU3NzRkNDEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0._N053We4l-ffHuM_WEA-szYV1l3QDNnTaa6dTnKR_sU";
            userAvatar.setAttribute('data', `${userData.photo}`)

            let FIO = clone.children[1].children[0];
            FIO.textContent = `${userData.first_name} ${userData.last_name} ${userData.nickname}`;

            let userLink = clone.children[1].children[1];
            userLink.textContent = "https://vk.com/id" + userData.id;
            userLink.href = "https://vk.com/id" + userData.id;

            document.querySelector('#results').appendChild(clone);

        }
        lazyLoader(images) {

            let options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }

            function handleImg(myImg, observer) {
                myImg.forEach(myImgSingle => {

                    if (myImgSingle.intersectionRatio > 0) {
                        loadImage(myImgSingle.target);
                    }
                })
            }

            function loadImage(image) {
                image.src = image.getAttribute('data');
            }

            let observer = new IntersectionObserver(handleImg, options);

            images.forEach(img => {
                observer.observe(img);
            })
        }
        callBack(result) {
            let resultatsText = document.querySelector('#resText');
            result.response.items.forEach(element => {
                this.container(element);
            });
            resultatsText.textContent = `Наидено ${result.response.items.length} Человек`;

            let images = document.querySelectorAll('img');

            this.lazyLoader(images);

        }
        request(InputsValue){
            let token = "8960b32e897cf0a4a2716887af13558995b51bc4c75615f90c0c95ad884229ac4d4d1e58e8f24c4709f40";
            let params = [`birth_year=${InputsValue[2]}`, `birth_month=${InputsValue[1]}`, `birth_day=${InputsValue[0]}`, `count=1000`, `fields=photo, nickname`].join('&');
            let response_url = `https://api.vk.com/method/users.search?${params}&v=5.52&access_token=${token}`;

            let callbackFunk = this.callBack;
            
            jsonp(response_url, callbackFunk);
        }
        clearBlock(){

            let resultatsCount = document.querySelector('#resText');
            resultatsCount.textContent = ` `;

            let div = document.querySelector("#results");
            let elems = div.childNodes;

            if (elems.length > 0) {
                while (div.firstChild) {
                    div.removeChild(div.firstChild);
                }
            }
        }
        handleSubmit(event) {
            event.preventDefault();
            let InputsValue = [this.state.day, this.state.month, this.state.year];

            this.clearBlock();

            if (this.validation(InputsValue)) {
                    this.request(InputsValue);
            } else {
                console.log('Неварнные данные!');
                return

            }

        }
        render(){
            return (
                <div className="App">
                <form id="myform" onSubmit={this.handleSubmit}>
                    <label htmlFor="day">День</label><br/>
                    <input type="text"
                     value={this.state.day} onChange = {this.handleChangeDay}
                     name="day"/>
                    <span id="err_day"></span>
                    <br/>
                    <label htmlFor="month">Месяц</label><br/>
                    <input type="text"
                     value={this.state.month} onChange = {this.handleChangeMonth}
                     name="month"/>
                    <span id="err_mont"></span>
                    <br/>
                    <label htmlFor="year">Год</label><br/>
                    <input type="text"
                     value={this.state.year} onChange = {this.handleChangeYear}
                     name="year"/>
                    <span id="err_year"></span>
                    <br/>
                    <button type="submit" value="Поиск" name="seachData">Поиск</button>
                </form>
            </div>
         );
        }
      }

    export default Form;