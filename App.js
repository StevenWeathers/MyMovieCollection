/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView
} from 'react-native';

import axios from 'axios';

import List from 'antd-mobile/lib/list';

const Item = List.Item;
const Brief = Item.Brief;


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  async getMovies() {
    try {
      const { data } = await axios.get('http://movies.stevenweathers.com/api/movies');

      this.setState({
        movies: data.data.movies
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <ScrollView>
        <List renderHeader={() => 'Movies'}>
          {
            this.state.movies.length &&
            this.state.movies.map(movie => {
              return (
                <Item
                  arrow="horizontal"
                  thumb={`http://image.tmdb.org/t/p/w154/${movie.tmdb_image_url}`}
                  multipleLine
                  onClick={() => {}}
                  key={movie._id}
                >
                  {movie.title}
                  <Brief>
                    {movie.year}
                  </Brief>
                </Item>
              )
            })
          }
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
});
