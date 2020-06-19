import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import { Asset } from 'expo-asset';
import Icon from 'react-native-vector-icons/FontAwesome5';

import SpeedControls from './../menus/speedControls.js';
import BladeControls from './../menus/bladeControls.js';

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopColor: '#247BA0',
    borderTopWidth: 1,
    display: 'flex',
    alignItems: 'center', 
  },
  innerContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  icon: {
    fontSize: 20,
  },
  firstIcon: {
    width: 90,  
    height: 60,
    resizeMode: 'contain',
  },
  secondIcon: {
    width: 70,  
    height: 60,
    resizeMode: 'contain',
  }
});

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openSpeedControl: false,
      openFanControl: false,
    };
  }

  openSpeedControl = () => {
    this.setState({ 
      openSpeedControl: true,
    });
  }

  openFanControl = () => {
    this.setState({
      openFanControl: true,
    });
  }

  closeSpeedControl = () => {
    this.setState({ 
      openSpeedControl: false,
    });
  }

  closeFanControl = () => {
    this.setState({
      openFanControl: false,
    })
  }

  render() {
    return (
      <View style={styles.footerContainer}>
        {/* Fan speed */}
        {
          this.state.openSpeedControl ?
          <SpeedControls close={this.closeSpeedControl} />
          :
          null
        }
        {/* Blade angle */}
        {
          this.state.openFanControl ?
          <BladeControls close={this.closeFanControl} />
          :
          null
        }
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={this.openSpeedControl}>
            <Image
              style={styles.firstIcon}
              source={{
                uri: Asset.fromModule(require('./../../assets/icons/FanSpeedIcon.png')).uri,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.openFanControl}>
            <Image 
              style={styles.secondIcon}
              source={{
                uri: Asset.fromModule(require('./../../assets/icons/fanDirectionIcon.png')).uri,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    temperature: state.stemp,
    f_dir: state.f_dir,
  };
}


export default connect(mapStateToProps)(Footer);