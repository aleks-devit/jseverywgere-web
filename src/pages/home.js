import React from 'react';
// Импортируем необходимые библиотеки
import {useQuery} from '@apollo/client';
import NoteFeed from "../components/NoteFeed";
import Button from "../components/Button";
import {GET_NOTES} from "../gql/query";


const Home = () => {
  // Хук запроса
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  if (loading) return <p>Loading...</p>;
  // Если при получении данных произошел сбой, отображаем сообщение об ошибке
  if (error) return <p>Error!</p>;

  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes}/>
      {
        data.noteFeed.hasNextPage && (
          // onClick выполняет запрос, передавая в качестве переменной текущий курсор
          <Button
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor
              },
              updateQuery: (previousResult, {fetchMoreResult}) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    // Совмещаем новые результаты со старыми
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    __typename: 'noteFeed'
                  }
                }
              }
            })
          }
          >Load more</Button>
        )
      }
    </React.Fragment>
  ) ;
};

export default Home;