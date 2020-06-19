import React from 'react';
import { StyleSheet, View, Vibration } from 'react-native';
import { connect } from 'react-redux';
import { Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: '#247BA0',
    borderBottomWidth: 1,
    position: 'absolute',
    top: 40,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  headerTemperature: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 20,
  },
  sensorIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
    fontSize: 15,  
    color: '#6482b7',
  }
});

class Header extends React.Component {
  togglePower = () => {
    Vibration.vibrate(100)
    this.props.toggle();
  }

  render() {
    return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Button onPress={this.togglePower} rounded dark>
          <Text>{ this.props.pow === 1 ? 'On' : 'Off'}</Text>
        </Button>
        <View style={styles.headerTemperature}>
          <View style={styles.sensorIcon}>
            <Icon style={styles.icon} name="home" solid />
            <Text style={styles.marginRight}>{ this.props.sensorInfo.temp_inside } &deg;C</Text>
          </View>
          <View style={styles.sensorIcon}>
            <Icon style={styles.icon} name="thermometer-three-quarters" solid />
            <Text>{ this.props.sensorInfo.temp_outside } &deg;C</Text>
          </View>
        </View>
      </View>
    </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    pow: state.pow,
    mode: state.mode,
    adv: state.adv,
    stemp: state.stemp,
    shum: state.shum,
    sensorInfo: state.sensorInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: () => dispatch({ type: 'TOGGLE', }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);