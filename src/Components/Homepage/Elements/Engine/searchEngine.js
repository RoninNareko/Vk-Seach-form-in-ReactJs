import React from 'react';
import jsonp from "../jsones/jsonp";
import Form from "../form/form";
import UsersList from "../userslist/UsersList.js";
import Loading from "../loading/loading";

class SearchEngine extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                users:null,
                loading:false
            };
            this.requestJsonp = this.requestJsonp.bind(this); //метод для запроса 
            this.handleSubmit = this.handleSubmit.bind(this);//Обработчик submit
            this.requestJsonpCallback = this.requestJsonpCallback.bind(this); //Данный callback сработает после запроса 
        }
        requestJsonpCallback(results){ //result резултать которые мы получили от сервера
            console.log(results);
            this.setState({users: results.response.items,//Меняем состояние, сохроняем данные в state
                           loading:false //Меняем состояние, чтобы Закончить загрузку
            });
        }
        requestJsonp(InputsValue){
            const options = { //настроики для запроса
                token: "8960b32e897cf0a4a2716887af13558995b51bc4c75615f90c0c95ad884229ac4d4d1e58e8f24c4709f40",//токен_
                params:[`birth_year=${InputsValue[2]}`, `birth_month=${InputsValue[1]}`, `birth_day=${InputsValue[0]}`, `count=1000`, `fields=photo, nickname`].join('&'),// массив с параметрами
            }
            const REQ_URL = `https://api.vk.com/method/users.search?${options.params}&v=5.52&access_token=${options.token}`;//полный URL для запроса

            const callBack = this.requestJsonpCallback;//Данный callback сработает после запроса 

            jsonp(REQ_URL, callBack);// ВЫПОЛНЯЕМ ЗАПРОС НА СЕРВЕР
        }
        handleSubmit(event,InputsValue){//Обработчик клика на кнопку
            event.preventDefault();
            this.requestJsonp(InputsValue);//Вызываем метод для запроса на сервер и передаем туда, значение полей, которые мы получили от формы
            this.setState({loading: true});//Меняем состояние, чтобы начать загрузку
        }
        render(){   
            console.log(' render engine');
            const users = this.state.users;//массив с данными (если получили с сервера)
            return(
                <div className="main">
                    {/* Рендерим форму */}
                    <Form handleSubmit={this.handleSubmit} />              
                    <div className="list_container">
                    {   
                        (this.state.loading) ? <Loading/>://Проверяем закончилась ли загрузка
                        (users) ? <UsersList users={users}/>:null//Если мы получили данные то загружаем компонент UsersList
                    }
                    </div>
                 </div>
            );
        }     
    }
    export default SearchEngine;