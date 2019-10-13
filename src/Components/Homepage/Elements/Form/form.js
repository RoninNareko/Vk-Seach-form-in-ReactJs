import React from 'react';

import jsonp from "../jsones/jsonp";


class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            day:'',
            month:'',
            year:''
            };
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleChangeDay = this.handleChangeDay.bind(this);
        this.handleChangeMonth = this.handleChangeMonth.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        
        this.lazy = this.lazy.bind(this);
        this.Callback = this.Callback.bind(this);  
        this.Container = this.Container.bind(this);  
    }
    handleChangeDay(event){
        this.setState({day: event.target.value});
    }
    handleChangeMonth(event){
        this.setState({month: event.target.value});
    }
    handleChangeYear(event){
        this.setState({year: event.target.value});
    }
    Container(userData) {
       
        let template = document.querySelector('#usersInfo');
        let element = template.children[0];

        let clone = element.cloneNode(true); 

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
    lazy(images) {

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
     Callback(result){
        let resultatsText = document.querySelector('#resText');
        result.response.items.forEach(element => {
            // console.log(element);
            this.Container(element);
        });
        resultatsText.textContent = `Наидено ${result.response.items.length} Человек`;
        //lazy
        let images = document.querySelectorAll('img');
        // console.log(images);
        this.lazy(images);
        //
        // console.log(result);
    }
    handleSubmit(event){  
        event.preventDefault();
        let resultatsText = document.querySelector('#resText');
        resultatsText.textContent = ` `;
        let div = document.querySelector("#results");
        let elems = div.childNodes;
    
        if (elems.length > 0) {
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
        }

        let day = this.state.day;
        let month = this.state.month;
        let year =  this.state.year;
    
        let birth_day = day; //День рождения
        let birth_month = month; //месяц рождения.
        let birth_year = year; //год рождени

        let errorText1 = document.querySelector('#err_day');
        let errorText2 = document.querySelector('#err_year');
        let errorText3 = document.querySelector('#err_mont');

        if (day > 31 || day < 1 || isNaN(day)) {
            let errorMessage = "Не меньше 1 и не больше 31  / только цифры";
            errorText2 = document.querySelector('#err_year').textContent = '';
            errorText3 = document.querySelector('#err_mont').textContent = ' ';
            
            errorText1.textContent = errorMessage;
            return;
        }
        if (year > 1999 || year < 1979 || isNaN(year)) {
            let errorMessage = "Возраст должен быть не менее 20 и не более 40 лет / только цифры";
            errorText1 = document.querySelector('#err_day').textContent = ' ';
            errorText3 = document.querySelector('#err_mont').textContent = ' ';
          
            errorText2.textContent = errorMessage;
            return;
        }
        if (month > 12 || month < 1 || isNaN(month)) {
            let errorMessage = "Не меньше 1 и не больше 12 / только цифры";
          
            errorText1 = document.querySelector('#err_day').textContent = ' ';
            errorText2 = document.querySelector('#err_year').textContent = '';
            errorText3.textContent = errorMessage;
            return;
        }
        else{
          
                errorText1 = document.querySelector('#err_day').textContent = ' ';
                errorText2 = document.querySelector('#err_year').textContent = '';
                errorText3 = document.querySelector('#err_mont').textContent = ' ';
           
        }
        //
        let token = "8960b32e897cf0a4a2716887af13558995b51bc4c75615f90c0c95ad884229ac4d4d1e58e8f24c4709f40";

        let array = [`birth_year=${birth_year}`, `birth_month=${birth_month}`, `birth_day=${birth_day}`, `count=1000`, `fields=photo, nickname`];
        let params = array.join('&');
        let response_url = `https://api.vk.com/method/users.search?${params}&v=5.52&access_token=${token}`;
        let Callback = this.Callback;
        //
        jsonp(response_url,Callback);
        //
        
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