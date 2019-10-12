import React from 'react';
import ResultatsContainer from './Components/Homepage/Elements/ResultatsContainer/resultatsContainer';
import Form from "./Components/Homepage/Elements/Form/form";

//css 

class App extends React.Component{
  render(){
    return(
        <React.Fragment>
          <ResultatsContainer/>
          <Form/>
        </React.Fragment>      
    );
  }
}


export default  App;

