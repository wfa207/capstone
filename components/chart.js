'use strict'

import React, { Component } from 'react';
import { View } from 'react-native';
import Chart from 'react-native-chart';
import styles from './styles';

const data = [
    [0, .2],
    [2, .2],
    [4, .2],
    [6, .2],
];

class SimpleChart extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Chart
                    style={styles.pieChart}
                    data={data}
                    type="pie"
                    showAxis={false}
                 />
            </View>
        );
    }
}

module.exports = SimpleChart;
