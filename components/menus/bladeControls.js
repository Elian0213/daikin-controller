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
    width: 70,  
    height: 50,
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
  }
});

class angleControlMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        'off',
        'Up down movement',
        'Left right movement',
        'Everything at once',
      ]
    }
  }

  closeMe = () => {
    this.props.close();
  }

  updateBladeInfo = (e) => {
    this.props.updateBlade(e);
  }

  render() {
    return (
    <View style={styles.overflowContainer}>
      <View style={styles.overflowBox}>
        <View style={styles.overflowBoxHeader}>
          <View style={styles.overflowBoxHeaderContent}>
            <Text>Blade angles</Text>
            <TouchableOpacity onPress={this.closeMe}>
              <Icon name="times" style={styles.closeIcon} solid />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.overflowContainerContent}>
          <Text style={styles.statusText}>{ this.state.options[this.props.f_dir] }</Text>
          <View style={styles.overflowContainerIconRow}>
            <TouchableOpacity onPress={() => this.updateBladeInfo(0)}>
              <Icon style={styles.iconText} name="ban" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.updateBladeInfo(1)}>
              <Image
                style={styles.firstIcon}
                source={{
                  uri: this.props.f_dir === 1 ? Asset.fromModule(require('./../../assets/icons/fanIconUpDown_active.png')).uri : Asset.fromModule(require('./../../assets/icons/fanIconUpDown.png')).uri,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.updateBladeInfo(2)}>
              <Image
                style={styles.upDownIcon}
                source={{
                  uri: this.props.f_dir === 2 ? Asset.fromModule(require('./../../assets/icons/fanIconLeftRight_active.png')).uri : Asset.fromModule(require('./../../assets/icons/fanIconLeftRight.png')).uri,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.updateBladeInfo(3)}>
              <Text style={this.props.f_dir === 3 ? styles.icon3DActve : styles.icon3D}>3D</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    f_dir: state.f_dir,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateBlade: (data) => dispatch({ type: 'UPDATE_DIR', f_dir: data, }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(angleControlMenu);