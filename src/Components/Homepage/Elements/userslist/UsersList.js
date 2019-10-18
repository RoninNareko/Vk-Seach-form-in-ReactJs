import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function UserAvatar(props) {//аватар + lazyload
    return(
    <div className="user_avatar ">
      <LazyLoadImage
      src={props.src} // use normal <img> attributes as props
       />
    </div>
    );
}
function Description(props) {//Описание о человеке (имя фамилия)
  return(
    <div className="description">
        <span>{`${props.user.last_name} ${props.user.last_name} `}</span>
  </div>
  );
}
function ButtonLink(props) { //Кнопка Link
      return(
      <div className="Button_Link ">
        <a href={props.userLink} target="blank">Link</a>
      </div>
      );
}

function UsersList(props) { //создаем список наиденных людей
    const users = props.users;

    const listItems = users.map((user) =>{

    const userLink = `https://vk.com/id${user.id}`;
        return <div key={user.id} className="User_Information_block">
                    <UserAvatar src={user.photo}/>
                    <Description user={user} userLink ={userLink}/>
                    <ButtonLink userLink={userLink}/>
                </div>
        }
    );
    return (
      <React.Fragment>
        <h3>Наидено {users.length} Людей </h3>
        <ul>{listItems}</ul>
      </React.Fragment>
    );
  }


export default UsersList;