import React, {Fragment, Component} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, 
    ScrollView, KeyboardAvoidingView } from 'react-native';
import * as _ from 'lodash';

class App extends Component {

    render() {
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
                                    Exchange
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
    textInput: {
        borderStyle: 'solid',
        borderWidth:1,
        borderRadius: 8,
        fontSize:16,
        color:'#008b8b',
        padding:10,
    },
    viewInput: {
        paddingHorizontal: 20
    },
    gasText: {
        paddingVertical: 20,
        fontSize: 20
    },
    containerButton:{
        paddingVertical:50,
        alignItems: 'center'
    },
    button: {
        backgroundColor:'#008b8b',
        width:100,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    textButton: {
        textAlign:'center',
        fontSize:16,
        alignSelf: "center",
        color: '#ffffff'
    }
});

export default App;