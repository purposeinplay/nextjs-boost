import React, { Component } from 'react';
import FILMS_QUERY from 'graphql/films.graphql';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { connect, Dispatch } from 'react-redux';
import { clockActions } from 'modules/clock';
import Header from 'components/header';

interface Film {
  title: string;
}

interface Response {
  allFilms: any;
  error: boolean;
  loading: boolean;
}

interface Props {
  isLoading: boolean;
  films?: Film[];
  error: boolean;
  dispatch: Dispatch;
  lastUpdate: Date;
}

const Clock = styled.div`
  padding: 20px;
`;

const pad = (n: number) => (n < 10 ? `0${n}` : n);

const format = (date: Date) => {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

class About extends Component<Props, any> {
  static async getInitialProps(props: any) {
    const { store, isServer } = props;
    store.dispatch(clockActions.tickClock({ light: isServer }));
    return { isServer };
  }

  componentDidMount() {
    this.props.dispatch(clockActions.startClock({}));
  }

  render() {
    const { isLoading, error, films } = this.props;

    if (error) return <div>Error loading blog post.</div>;

    return (
      <div>
        <Header />
        <h2>Redux Sagas:</h2>
        <Clock>{format(new Date(this.props.lastUpdate))}</Clock>

        <h2>Movie List through GraphQL: </h2>
        {isLoading ? (
          <div>Is loading ...</div>
        ) : (
          films.map((film, index: number) => (
            <div key={index}>{film.title}</div>
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { clockReducer } = state;

  return {
    lastUpdate: clockReducer.lastUpdate
  };
};

const withConnect = connect(mapStateToProps);

const withFilms = graphql<Response>(FILMS_QUERY, {
  name: 'findFilms'
});

const mapFilmsToProps = ({ findFilms }: { findFilms: Response }) => ({
  films: findFilms.allFilms,
  error: findFilms.error,
  isLoading: findFilms.loading
});

export default compose(
  withConnect,
  withFilms,
  withProps(mapFilmsToProps)
)(About);
