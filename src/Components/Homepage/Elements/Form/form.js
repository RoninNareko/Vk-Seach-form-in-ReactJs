import React from 'react';

function Input(props) {
    return(
        <React.Fragment>
            <label htmlFor={props.htmlFor}>{props.InputName}</label><br/>
            <input type={props.type} defaultValue={props.value} onChange={props.onChange} name={props.name}></input>
            <div style={{
                color:'red',
                fontSize:17
            }}>{props.error}</div>
            <br/> 
        </React.Fragment>
    );
}

function Button(props) {
    return (
        <button name={props.name} type={props.type}>{props.value}</button>
    );
}
class Form extends React.Component{
        constructor(props){
            super(props);
                    this.state = {
                        day: '',
                        month: '',
                        year: '',
                        dayError:'',
                        monthError:'',
                        yearError:'',
                };
                this.handleChangeDay = this.handleChangeDay.bind(this);
                this.handleChangeMonth = this.handleChangeMonth.bind(this);
                this.handleChangeYear = this.handleChangeYear.bind(this);
                this.handleSubmitForm = this.handleSubmitForm.bind(this);
            }
            handleChangeDay(event) {
                this.setState({ day: event.target.value });
            }
            handleChangeMonth(event) {
                this.setState({ month: event.target.value });
            }
            handleChangeYear(event) {
                this.setState({ year: event.target.value });
            }
            requestJsonpCallback(results){
                this.setState({users: results.response.items});
            }
            validate(){
                let dayError = '';
                let monthError = '';
                let yearError = '';

                if(this.state.day >31 || this.state.day < 1 || isNaN(this.state.day)){
                    dayError = "Не меньше 1 и не больше 31  / только цифры";
                    this.setState({  dayError });  
                    return false;
                }
                if(this.state.month >12 || this.state.month < 1 || isNaN(this.state.month)){
                    monthError = "Не меньше 1 и не больше 12 / только цифры";
                    this.setState({  monthError });  
                    return false;
                }
                if(this.state.year > 1999 || this.state.year < 1979 || isNaN(this.state.year)){
                    yearError = "Возраст должен быть не менее 20 и не более 40 лет / только цифры";
                    this.setState({  yearError });  
                    return false;
                }

                return true;

            }
            handleSubmitForm(event){
                event.preventDefault();
                const isValid = this.validate();
                if(isValid){//Проверяем валидацию
                    const InputsValue = [this.state.day, this.state.month, this.state.year];
                    this.props.handleSubmit(event,InputsValue); //вызываем оброботчик родителского класса и передаем туда значение наших полей input

                    //очишаем ошибки
                    this.setState({yearError: ' ',
                                  monthError: ' ',
                                  dayError: ' ',
                        });
                }
            }
            render(){
                console.log('render form');
            return(
                    <form id="myform" onSubmit={this.handleSubmitForm}>
                        <Input type="text" value={this.state.day}   onChange={this.handleChangeDay}   htmlFor="day"   name="day"   InputName="День"   error={this.state.dayError}/>
                        <Input type="text" value={this.state.month} onChange={this.handleChangeMonth} htmlFor="month" name="month" InputName="Месяц"  error={this.state.monthError}/>
                        <Input type="text" value={this.state.year}  onChange={this.handleChangeYear}  htmlFor="year"  name="year"  InputName="Год"    error={this.state.yearError}/>
                        <Button type="submit" value="Выполнить" name="SeachButton"/>
                    </form>
            );
        }
}
export default Form;