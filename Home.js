import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';

class Home extends React.Component {
    static navigationOptions = {
        headerTitle: "Movie App",
    };

    state = {
        name: "",
        disable: true,
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', }}>
                <TextInput
                    style={styles.input} onChangeText={(name) => this.setState({ name: name, disable: false, style: "" })} placeholder="Search"
                    value={this.state.name}
                />
                <TouchableOpacity disabled={this.state.disable}
                    onPress={() => this.props.navigation.navigate("About", { Movies: this.state.name })}
                    style={[styles.btn, { backgroundColor: this.state.disable ? '#cccccc' : '#d14d4d' }]}>
                    <Text style={{ color: "#fff", textTransform: 'uppercase' }}>Details</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 300,
        borderBottomWidth: 2,
        fontSize: 15,
        borderBottomColor: '#d14d4d',
        margin: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    btn: {
        color: "#fff",
        padding: 10,
        margin: 10,
        borderRadius: 2,
    },
    
});

export default Home;
