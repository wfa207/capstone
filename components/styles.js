import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232323'
  },
  topBar: {
    flex: 1,
  },
  tabBar: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  tabBarItem: {
    color: '#BFBDC1'
  },
  buttonText: {
    fontSize: 50,
    fontWeight: '700',
    color: 'white',
    alignSelf: 'center',
    textShadowColor: '#999999',
    textShadowOffset: {
      width: 3,
      height: 3
    },
    textShadowRadius: 6
  },
  logButton: {
    height: 450,
    width: 325,
    backgroundColor: '#48BBEC',
    borderRightColor: '#23A9E3',
    borderBottomColor: '#23A9E3',
    borderLeftColor: '#48BBEC',
    borderTopColor: '#48BBEC',
    borderWidth: 1,
    shadowColor: '#636363',
    shadowOpacity: 90,
    shadowRadius: 50,
    borderRadius: 25,
    borderWidth: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  stopButton: {
    height: 450,
    width: 325,
    backgroundColor: '#D84727',
    borderRightColor: '#B93C22',
    borderBottomColor: '#B93C22',
    borderLeftColor: '#D84727',
    borderTopColor: '#D84727',
    borderWidth: 1,
    shadowColor: '#636363',
    shadowOpacity: 90,
    shadowRadius: 50,
    borderRadius: 25,
    borderWidth: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  }
});

module.exports = styles;
