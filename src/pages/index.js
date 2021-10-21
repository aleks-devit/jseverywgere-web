// Импортируем React и зависимости //маршрутизации
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {useQuery, gql} from "@apollo/client";
// Импортируем маршруты
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Layout from "../components/Layout";
import NotePage from "./note";
import SignUp from "./signup";
import SignIn from "./signin";
import NewNote from "./new";
import EditNote from "./edit";

const IS_LOGGED_IN = gql`
{
  isLoggedIn @client 
}
`

// Определяем маршруты
const Pages = () => {
  return (
    <Router>
      <Layout>
        <PrivateRoute exact path="/" component={Home}/>
        <PrivateRoute path="/mynotes" component={MyNotes}/>
        <PrivateRoute path="/favorites" component={Favorites}/>
        <PrivateRoute path="/new" component={NewNote}/>
        <PrivateRoute path="/edit/:id" component={EditNote}/>
        <Route path="/note/:id" component={NotePage}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/signin" component={SignIn} />
      </Layout>
    </Router>
  )
}

const PrivateRoute = ({component: Component, ...rest}) => {
  const {loading, error, data} = useQuery(IS_LOGGED_IN)
  // Если данные загружаются, выводим сообщение о загрузке
  if (loading) return <p>Loading...</p>;
// Если при получении данных произошел сбой, выводим сообщение об ошибке
  if (error) return <p>Error!</p>;
// Если пользователь авторизован, направляем его к запрашиваемому компоненту
// В противном случае перенаправляем на страницу авторизации
  return (
    <Route {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props}/>
        ): (
          <Redirect to={{
            pathname: '/signin',
            state: {from: props.location}
          }}
          />
        )
      }
    />
  )
}

export default Pages