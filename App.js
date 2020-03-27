import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default class App extends React.Component {

  state = {
    isLoading:true,
    dataSource: null,
  }

  componentDidMount () {
    return fetch('https://api.coinranking.com/v1/public/coins')
      .then( (response) => response.json() )
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.data.coins
        })
      })
    .catch((error) => {
      console.log(error)
    });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
      )
    } else {
        let coins = this.state.dataSource.map((val, key) => {
          return  <View key={key} style={styles.wrapper}>
                    <Text style={styles.item}>{val.name}</Text>
                    <Text style={styles.item}>{val.symbol}</Text>
                    <Text style={styles.item}>{val.price}</Text>
                  </View>
        });

      return (
        <View style={styles.container}>
          <View style={styles.new}>
            {coins}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    margin: 10,

  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2ecc71',
    // backgroundColor: '#34495e',
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee'
  },
  new: {
    backgroundColor: '#34495e',
    // width:
  }
});
