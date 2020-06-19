import React from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'native-base';
import { connect } from 'react-redux';
import { Asset } from 'expo-asset';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  overflowContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    top: -(Dimensions.get('window').height - 70),
    left: 0,
    zIndex: 10,
    position: 'absolute',
  },
  overflowBox: {
    zIndex: 11,
    position: 'absolute',
    backgroundColor: 'white',
    height: 225,
    zIndex: 12,
    width: '100%',
    bottom: 0,
    left: 0, 
  },
  overflowBoxHeader: {
    backgroundColor: '#f1f3f2',
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overflowBoxHeaderContent: {
    width: '80%',
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 19,
    color: '#757575',
    padding: 5,
  },
  firstIcon: {
    width: 60,  
    height: 40,
    resizeMode: 'contain',
  },
  upDownIcon: {
    width: 50, 
    height: 50,
    resizeMode: 'contain',
  },
  iconText: {
    fontSize: 40,
  },
  overflowContainerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: -20,
  },
  overflowContainerIconRow: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  icon3D: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  icon3DActve: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'rgb(100, 130, 183)',
  },
  iconSpeed: {
    width: 20,  
    height: 20,
  },
  iconSpeedTwo: {
    width: 20,  
    height: 30,
  },
  iconSpeedThree: {
    width: 20,  
    height: 40,
  },
  iconSpeedFour: {
    width: 20,  
    height: 50,
  },
  iconSpeedFive: {
    width: 20,  
    height: 60,
  },
});

class speedControlMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        'A' : 'Automatic',
        'B' : 'Nightmode - quiet as hell',
        '3' : 'Level 1',
        '4' : 'Level 2',
        '5' : 'Level 3',
        '6' : 'Level 4',
        '7' : 'Level 5',
      },
      iconData: [
        {
          image: Asset.fromModule(require('./../../assets/icons/AutomaticFanSpeed.png')).uri,
          image_active: Asset.fromModule(require('./../../assets/icons/AutomaticFanSpeed_active.png')).uri,
          style: styles.firstIcon,
          onClickValue: 'A'
        },
        {
          image: Asset.fromModule(require('./../../assets/icons/NightFanSpeed.png')).uri,
          image_active: Asset.fromModule(require('./../../assets/icons/NightFanSpeed_active.png')).uri,
          style: styles.firstIcon,
          onClickValue: 'B'
        },
        {
          image: Asset.fromModule(require('./../../assets/icons/OneFanSpeed.png')).uri,
          image_active: Asset.fromModule(require('./../../assets/icons/OneFanSpeed_active.png')).uri,
          style: styles.iconSpeed,
          onClickValue: '3'
        },
        {
          image: Asset.fromModule(require('./../../assets/icons/OneFanSpeed.png')).uri,
          image_active: Asset.fromModule(require('./../../assets/icons/OneFanSpeed_active.png')).uri,
          style: styles.iconSpeedTwo,
          onClickValue: '4'
        },
        {
          image: Asset.fromModule(require('./../../assets/icons/OneFanSpeed.png')).uri,
          image_active: Asset.fromModule(require('./../../assets/icons/OneFanSpeed_active.png')).uri,
          style: styles.iconSpeedThree,
          onClickValue: '5'
        },
        {
          image: Asset.fromModule(require('./../../assets/icons/OneFanSpeed.png')).uri,
          image_active: Asset.fromModule(require('./../../assets/icons/OneFanSpeed_active.png')).uri,
          style: styles.iconSpeedFour,
          onClickValue: '6'
        },
        {
          image: Asset.fromModule(require('./../../assets/icons/OneFanSpeed.png')).uri,
          image_active: Asset.fromModule(require('./../../assets/icons/OneFanSpeed_active.png')).uri,
          style: styles.iconSpeedFive,
          onClickValue: '7'
        },
      ],
    }
  }

  closeMe = () => {
    this.props.close();
  }

  updateSpeedInfo = (e) => {
    this.props.updateSpeed(e);
  } 

  render() {
    return (
    <View style={styles.overflowContainer}>
      <View style={styles.overflowBox}>
        <View style={styles.overflowBoxHeader}>
          <View style={styles.overflowBoxHeaderContent}>
            <Text>Blowing speed</Text>
            <TouchableOpacity onPress={this.closeMe}>
              <Icon name="times" style={styles.closeIcon} solid />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.overflowContainerContent}>
          <Text style={styles.statusText}>{ this.state.options[this.props.f_rate] }</Text>
          <View style={styles.overflowContainerIconRow}>
            {
              this.state.iconData.map((icon, i) => {
                return (<TouchableOpacity onPress={() => this.updateSpeedInfo(icon.onClickValue)} key={i}>
                  <Image
                    style={icon.style}
                    source={{
                      uri: icon.onClickValue === this.props.f_rate ? icon.image_active : isNaN(icon.onClickValue) ? icon.image : icon.onClickValue,
                    }}
                  />
              </TouchableOpacity>)
              })
            }
          </View>
        </View>
      </View>
    </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    f_rate: state.f_rate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSpeed: (data) => dispatch({ type: 'UPDATE_RATE', f_rate: data, }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(speedControlMenu);  