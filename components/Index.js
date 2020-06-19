import React from 'react';
import { StyleSheet, View, Vibration } from 'react-native';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import Daikin from './../helpers/Daikin';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

import Roboto from './../assets/fonts/Roboto.ttf';
import Roboto_medium from './../assets/fonts/Roboto_medium.ttf';

// Components
import Header from './partials/header';
import TemperatureControl from './partials/temperatureControl';
import Footer from './partials/footer';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  mainContainer: {
    marginTop: 100,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      loading: true 
    };
  }

  loadImages = async () => {
    const images = [
      require('./../assets/icons/FanSpeedIcon.png'), 
      // Fan blade stuff
      require('./../assets/icons/fanDirectionIcon.png'), 
      require('./../assets/icons/fanIconLeftRight.png'),
      require('./../assets/icons/fanIconLeftRight_active.png'),
      require('./../assets/icons/fanIconUpDown.png'),
      require('./../assets/icons/fanIconUpDown_active.png'),
      // Fan speed stuff
      require('./../assets/icons/AutomaticFanSpeed.png'),
      require('./../assets/icons/AutomaticFanSpeed_active.png'),
      require('./../assets/icons/NightFanSpeed.png'),
      require('./../assets/icons/NightFanSpeed_active.png'),
      require('./../assets/icons/OneFanSpeed.png'),
      require('./../assets/icons/OneFanSpeed_active.png'),
    ];

    const cacheImages = await images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    })

    return cacheImages;
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: Roboto,
      Roboto_medium: Roboto_medium,
    });
    
    this.loadImages()
      .then(() => {
        this.setState({ loading: false });
      })

    Daikin.info()
    .then((data) => {
      this.props.update(data);
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <AppLoading />
      );
    }

    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.mainContainer}>
          <TemperatureControl />
        </View>
        <Footer />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.mode,
    adv: state.adv,
    stemp: state.stemp,
    shum: state.shum,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    update: (data) => dispatch({ type: 'UPDATE', data: data, }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);