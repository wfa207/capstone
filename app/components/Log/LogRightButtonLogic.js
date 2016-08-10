'use strict';

import {
  TouchableHighlight,
  Text
} from 'react-native';

module.exports = routeTitle => {
  switch(routeTitle) {
    case 'Details':
      return (
        <TouchableHighlight
        onPress={() => navigator.push({
          title: "Edit Name",
          component: LogEditView,
          passProps: route.passProps})}
        underlayColor="transparent">
        <Text style={styles.rightNavButtonText}>Edit</Text>
        </TouchableHighlight>
      );
    break;
    case 'Edit Name':
      return (
        <TouchableHighlight
        onPress={() => {
          var locationId = me._routeComponent.props._id;
          var newLocationValues = me._routeComponent.state.newLocationValues || {};
          if (Object.keys(newLocationValues).length) {
            return db.locations.updateById(newLocationValues, locationId)
            .then(() => navigator.pop())
          }
          navigator.pop();
        }}
        underlayColor="transparent">
        <Text style={styles.rightNavButtonText}>Done</Text>
        </TouchableHighlight>
      )
    default:
    return null;
  }
}