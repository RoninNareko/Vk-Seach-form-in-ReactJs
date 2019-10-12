import React from 'react';

class ResultsContainer extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div id="data">
                <h3 id="resText"> </h3>
                <div id="results" className="movileres">

                </div>
                </div>
                <template id="usersInfo">
                <div className="usersContainer">
                <div className="user_avatar_block">
                <img id="userAvatar" data=" " src="" alt=""/>
                </div>
                <div className="text_info" id="text_mobil">
                <span className="FIO">Имя фамилия отечество</span>
                <a href="#link" className="profile_link" target="_blank">Link</a>
                </div>
                </div>
                </template>
            </React.Fragment>
        );
    }
}

export default ResultsContainer;