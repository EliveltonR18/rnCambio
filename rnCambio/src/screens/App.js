import React, {Fragment, Component} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, 
    ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import * as _ from 'lodash';

import api from '../api';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [],
            coin1: 'EUR',
            coin2: '',
            coinsL: [],
            result: '',
        }
    }

    async componentDidMount() {
        const coinsL = [];
        const coins = await api.get('latest?base=EUR');
        this.setState({ options: coins.data });
        for (var chave in coins.data.rates) {
            let moeda = {
                moeda: chave,
                valor: coins.data.rates[chave],
            }
            coinsL.push(moeda);
        };
        this.setState({ coinsL: coinsL })
    }

    async result(coin, coinX) {
        const coinsL = [];
        const coins = await api.get(`latest?base=${coin}`);
        this.setState({ options: coins.data });
        for (var chave in coins.data.rates) {
            let moeda = {
                moeda: chave,
                valor: coins.data.rates[chave],
            }
            coinsL.push(moeda);
        };

        this.setState({ coinsL: coinsL });
        
        coinsL.map(coinL => {
            if (coinL.moeda === coinX) {
                this.setState({ result: coinL.valor });
            }
        })
    }

    render() {
        const { coinsL } = this.state;
        
        return (
            <Fragment>
                <StatusBar backgroundColor='#008b8b' />
                <SafeAreaView>
                    <ScrollView>
                        <KeyboardAvoidingView
                            style={{flex:1}}
                            behavior='position'
                            enabled
                        >
                            <View style={styles.header}>
                                <Text style={styles.title}>
                                    Quanto vale?
                                </Text>
                            </View>

                            <View style={styles.coin1}>
                                <Text style={styles.text}>Selecione as moedas: </Text>
                                <Picker
                                    selectedValue={this.state.coin1}
                                    style={{height: 50, width: 300, backgroundColor: "rgba(0, 138, 138, 0.20)"}}
                                    onValueChange={(item) => {
                                            this.setState({coin1: item})
                                        }
                                    }
                                    
                                >
                                    {coinsL.map(item => {
                                        return(<Picker.Item label={item.moeda} value={item.moeda}/>);
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.coin2}>
                                <Picker
                                    selectedValue={this.state.coin2}
                                    style={{height: 50, width: 300, backgroundColor: "rgba(0, 138, 138, 0.35)"}}
                                    onValueChange={(item) => {
                                            this.setState({coin2: item});
                                            this.result(this.state.coin1, item);
                                        }
                                    }
                                >
                                    {coinsL.map(item => {
                                        return(<Picker.Item label={item.moeda} value={item.moeda} key={item.valor}/>);
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.coin1}>
                                <Text style={styles.text}>
                                    {`1 ${this.state.coin1} vale ${this.state.result} ${this.state.coin2}`}
                                </Text>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );        
    }
}
const styles = StyleSheet.create({
    title: {
        padding: 20,
        fontSize: 24,
        color: '#ffffff',
        fontWeight: "bold"
    },
    header: {
        backgroundColor: '#008b8b',
        alignItems: "center"
    },
    coin1: {
        paddingHorizontal: 40,
        paddingVertical: 20
    }, 
    coin2: {
        paddingHorizontal: 40,
    },
    text:{
        fontSize: 20,
        paddingBottom: 30,
    }
});

export default App;