import React, {Fragment, Component} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, 
    ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import * as _ from 'lodash';
import api from '../api';
import Dictionary from '../lib/utils/Dictionary';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [],
            coin1: '',
            coin2: '',
            coinsL: [],
            result: 1,
        }
    }

    async componentDidMount() {
        const coinsL = [];
        const coins = await api.get('latest?base=USD');
        this.setState({ options: coins.data });
        for (var chave in coins.data.rates) {
            let moeda = {
                moeda: chave,
                valor: coins.data.rates[chave],
            }
            moeda.moeda = Dictionary.get(chave);
            coinsL.push(moeda);
        };

        this.setState({ coinsL: coinsL });

        coinsL.map(coinL => {
            if (coinL.moeda === 'BRL') {
                this.setState({ result: coinL.valor });
            }
        });
    }

    async result(coin, coinX) {
        const coinsL = [];
        let aux;
        let aux2;
        let coinR;
        let aux3;
        [aux, aux2] = coin.split('(');
        [coinR, aux3] = aux2.split(')');
        const coins = await api.get(`latest?base=${coinR}`);
        this.setState({ options: coins.data });
        for (var chave in coins.data.rates) {
            let moeda = {
                moeda: chave,
                valor: coins.data.rates[chave],
            }
            moeda.moeda = Dictionary.get(chave);
            coinsL.push(moeda);
        };

        this.setState({ coinsL: coinsL });
        
        coinsL.map(coinL => {
            if (coinL.moeda === coinX) {
                this.setState({ result: coinL.valor });
            }
        });
    }

    render() {
        const { coinsL } = this.state;
        
        return (
            <Fragment>
                <StatusBar backgroundColor='#008b8b' />
                <SafeAreaView
                    style={{alignItems: "center", justifyContent: "center"}}
                    >
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
                                        return(<Picker.Item label={`${item.moeda}`} value={item.moeda} key={item.valor}/>);
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.coin2}>
                                <Picker
                                    selectedValue={this.state.coin2}
                                    style={{height: 50, width: 300, backgroundColor: "rgba(0, 138, 138, 0.35)"}}
                                    onValueChange={(item) => {
                                            this.setState({coin2: item});
                                        }
                                    }
                                >
                                    {coinsL.map(item => {
                                        return(<Picker.Item label={`${item.moeda}`} value={item.moeda} key={item.valor}/>);
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.coin1}>
                                <Text style={styles.text}>
                                    {`1 ${this.state.coin1} vale ${this.state.result} ${this.state.coin2}`}
                                </Text>
                            </View>
                            <View
                            style={{alignItems: "center", justifyContent: "center"}}
                            >
                                <TouchableOpacity
                                    onPress={() => this.result(this.state.coin1, this.state.coin2)}
                                    style={{backgroundColor: 'rgba(0, 138, 138, 0.70)', width: 100, height: 40}}
                                    >
                                    <Text
                                    style={{alignItems: "center", justifyContent: "center", paddingTop: 8, paddingLeft: 20, fontSize: 20}}
                                        >
                                        Calcular
                                    </Text>
                                </TouchableOpacity>
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