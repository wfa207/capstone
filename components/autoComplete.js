import React, { Component, PropTypes } from 'react';
import {
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
	
export default class AutoComplete extends Component {
	static propTypes = {
		collection: PropTypes.ArrayOf(PropTypes.string).isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			collection: null,
			originalCollection: [...props.collection],
		};
	}
​
	_type = (str) => {
		this.setState({
			searchString: str,
			collection: this.state.originalCollection.filter(c => c.substr(0, str.length) === str),
		});
	}
	
	render() {
		return (
			<View>
				<TextInput
					ref="input"
					onChangeText={this._type}
					placeholder="Start Typing"
				/>
				{str && collection.length && (
					{this.state.collection.map(value) => (
						<TouchableOpacity
							onPress={() => this.refs.input.setNativeProps({ value })}
						/>
							<Text>{value}</Text>
						</TouchableOpacity>
					)}
				)}
			</View>
		)
	}
}