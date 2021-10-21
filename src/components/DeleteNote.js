import React from 'react';
import ButtonAsLink from "./ButtonAsLink";
import {withRouter} from "react-router-dom";
import {DELETE_NOTE} from "../gql/mutation";
import {useMutation} from "@apollo/client";
import {GET_MY_NOTES, GET_NOTES} from "../gql/query";

const DeleteNote = props => {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteId
    },
    refetchQueries: [{query: GET_MY_NOTES, GET_NOTES}],
    onCompleted: data => {
      props.history.push('/mynotes')
    }
  })
  return <ButtonAsLink onClick={deleteNote()}>Delete Note</ButtonAsLink> ;
};

export default withRouter(DeleteNote);