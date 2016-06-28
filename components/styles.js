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
  navBar: {
    height: 60,
    backgroundColor: '#E0E0E0',
    borderBottomColor: '#404040',
    borderBottomWidth: 1,
    shadowColor: '#1B998B',
    shadowOpacity: 50,
    shadowRadius: 20,
  },
  leftNavButtonText: {
    color: '#000000',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 8,
    fontWeight: '400'
  },
  rightNavButtonText: {
    color: '#000000',
    fontSize: 16,
    marginRight: 10,
    marginTop: 8,
    fontWeight: '400'
  },
  NavBarTitle: {
    flex: 3,
    fontSize: 20,
    fontWeight: '700',
    color: '#232323',
    marginTop: 5
  },
  banner: {
    flex: 1,
  },
  tabBarPlaceholder: {
    height: 49
  },
  buttonText: {
    fontSize: 50,
    fontWeight: '700',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    textShadowColor: '#999999',
    textShadowOffset: {
      width: 3,
      height: 3
    },
    textShadowRadius: 6,
    padding: 6
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
    shadowOffset: {
      height: 7
    },
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
    shadowOffset: {
      height: 7
    },
    borderRadius: 25,
    borderWidth: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  map: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 48,
  },
});

module.exports = styles;
