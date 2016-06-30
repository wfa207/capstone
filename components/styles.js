import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232323'
  },
  segmentControl: {
    marginTop: 70,
    marginHorizontal: 10
  },
  navBar: {
    height: 60,
    backgroundColor: '#969494', // 969494
    borderBottomColor: '#232323', // 404040
    borderBottomWidth: 1,
    shadowColor: '#232323',
    shadowRadius: 10,
    shadowOpacity: 5,
    shadowOffset: {
      height: -3
    }
  },
  logContainer: {
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF',
  },
  leftNavButtonText: {
    color: '#393A3A',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 8,
    fontWeight: '400'
  },
  rightNavButtonText: {
    color: '#393A3A',
    fontSize: 16,
    marginRight: 10,
    marginTop: 8,
    fontWeight: '400'
  },
  NavBarTitle: {
    flex: 3,
    fontSize: 20,
    fontWeight: '700',
    color: '#393A3A', //232323
    marginTop: 5
  },
  banner: {
    flex: 1,
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
  optionsText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    textShadowColor: '#999999',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 3,
    padding: 3
  },
  optionsButton: {
    height: 50,
    width: 325,
    backgroundColor: '#FFD3A1',
    borderRightColor: '#FFBB6F',
    borderBottomColor: '#FFBB6F',
    borderLeftColor: '#FFA745',
    borderTopColor: '#FFA745',
    borderWidth: 1,
    shadowColor: '#FF8700',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 1
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
  logsOption: {
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
  },
  map: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 48,
  },
  mapButton: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 40,
    width: 40,
    right: 7,
    bottom: 57,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    backgroundColor: 'rgba(35, 35, 35, 0.5)'
  },
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 8,
    position: 'absolute',
    top: 150,
    left: 20,
    right: 0
  },
  chartText: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    textShadowColor: '#999999',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 3,
    padding: 3,
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
  },
  rowStyle: {
    paddingVertical: 20,
    paddingLeft: 16,
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderBottomColor: '#E0E0E0',
    borderWidth: 1
  }
});

module.exports = styles;
