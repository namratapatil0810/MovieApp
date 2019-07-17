import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, Button } from 'react-native';

class About extends React.Component {
    static navigationOptions = {
        headerTitle: "About"
    };
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("Movies"),
        };
    };

    state = {
        MovieData: [],
        isLoading: true,
        error: ""
    }

    componentDidMount() {
        const { navigation } = this.props;
        const MovieData = navigation.getParam('Movies');

        return fetch("http://www.omdbapi.com/?apikey=eb340c9e&s=" + MovieData)
            .then((response) => response.json())
            .then((responseJson) => {
                console.warn(responseJson);
                if(responseJson.Response == "False"){
                    this.setState({
                        error: "No data Found For your Search"
                    });
                }
                this.setState({
                    isLoading: false,
                    MovieData: responseJson.Search,
                });

            })
            .catch((error) => {
                console.warn(error);
            });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
        if (this.state.error == "") {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <FlatList
                        data={this.state.MovieData}
                        renderItem={({ item }) =>
                            <View style={{ padding: 10, margin: 10, backgroundColor: '#f5f5dc' }}>
                                <View style={{ flex: 2, flexDirection: 'row' }}>
                                    <View style={{ width: '50%', padding: 10 }}>
                                        <Image source={{ uri: item.Poster }}
                                            style={{ width: 150, height: 250, borderWidth: 2, borderColor: 'black', borderRadius: 5 }} />
                                    </View>
                                    <View style={{ width: '50%', height: 50, padding: 0 }}>
                                        <Text style={styles.head}>{item.Title}</Text>
                                        <Text style={styles.text}>Realese In: {item.Year}</Text>
                                        <Text style={styles.text}>Type: {item.Type}</Text>
                                        <Button color="gold" style={{ margin: 2, }}
                                            title="Go to Details"
                                            onPress={() => {
                                                /* 1. Navigate to the Details route with params */
                                                this.props.navigation.navigate('Details', {
                                                    detailData: item
                                                });
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>}
                        keyExtractor={({ id }, index) => id}
                    />
                </View>
            );
        }

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{this.state.error}</Text>
            </View>
        )

    }
};

const styles = StyleSheet.create({
    head: {
        color: 'gold',
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        fontSize: 22,
        margin: 5,
    },
    text: {
        fontSize: 15,
        margin: 2,
        textTransform: 'capitalize',
    },
});

export default About;
