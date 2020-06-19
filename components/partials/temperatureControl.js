import React from 'react';
import { StyleSheet, View, Vibration } from 'react-native';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  temperatureContainer: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 100,
  },
  temperatureText: {
    fontSize: 30,
    color: 'gray',
  },
  temperatureTextContainer: {
    fontSize: 30,
  },
  button: {
    marginLeft: 40,
    width: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  }
});

class Controller extends React.Component {
  temperatureIncrease = () => {
    this.props.increase();
  }

  temperatureDecrease = () => {
    this.props.decrease();
  }

  render() {
    return (
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperatureTextContainer}><Text style={styles.temperatureText}>{ this.props.temperature }</Text> &deg;C</Text>
        <View>
          <Button onPress={this.temperatureIncrease} style={[styles.button, {marginBottom: 10, }]} dark>
            <Icon style={styles.icon} name="plus" solid />
          </Button>
          <Button onPress={this.temperatureDecrease} style={styles.button} dark>
            <Icon name="minus" style={styles.icon} solid />
          </Button>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    temperature: state.stemp,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    decrease: () => dispatch({ type: 'TEMP_DECREASE', }),
    increase: () => dispatch({ type: 'TEMP_INCREASE', }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controller);