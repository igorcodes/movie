import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Card, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import User2 from "./User2";

function Authfb() {

  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});

  const responseFacebook = (response) => {
    console.log('response Authfb' + response);
    setData(response);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

  return (
    <div class="container" align="right">
      
          {!login &&
            <FacebookLogin
              appId="351722520051537"
              autoLoad={false}
              fields="name,email"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              icon="fa-facebook" />
          }
          {login &&
            <User2 />
          }
        <Card>
        {login &&
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Link to="/my-library">Мои Избранные</Link>
            <Card.Text>
              {data.email}
            </Card.Text>
          </Card.Body>
        }
      </Card>
    </div>
  );
}

export default Authfb;
