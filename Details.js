import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';

class Details extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const title = navigation.getParam("detailData");
        return {
            title: title.Title
        };
    };

    state = {
        MovieDetails: [],
        isLoading: true
    }
    componentDidMount() {
        const { navigation } = this.props;
        const detailData = navigation.getParam('detailData', '');

        return fetch("http://www.omdbapi.com/?apikey=eb340c9e&i=" + detailData.imdbID)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    MovieDetails: responseJson,
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 5,
                }}>
                <View style={{ padding: 10, margin: 10, backgroundColor: '#f5f5dc' }}>
                    <ScrollView>
                        <View style={{ width: '100%', height: '100%', padding: 10 }}>
                            <Image
                                source={{ uri: this.state.MovieDetails.Poster }}
                                style={{
                                    width: "100%",
                                    height: 450,
                                    borderWidth: 2,
                                    borderColor: 'black',
                                    borderRadius: 5,
                                }}
                            />
                            <Text style={styles.head}>{this.state.MovieDetails.Title}</Text>
                            <Text style={styles.text}>Year: {this.state.MovieDetails.Year}</Text>
                            <Text style={styles.text}>Released Date: {this.state.MovieDetails.Released}</Text>
                            <Text style={styles.text}>Production: {this.state.MovieDetails.Production}</Text>
                            <Text style={styles.text}>Director: {this.state.MovieDetails.Director}</Text>
                            <Text style={styles.text}>Writer: {this.state.MovieDetails.Writer}</Text>
                            <Text style={styles.text}>Actors: {this.state.MovieDetails.Actors}</Text>
                            <Text style={styles.text}>Description: {this.state.MovieDetails.Plot}</Text>
                            <Text style={styles.text}>Language: {this.state.MovieDetails.Language}</Text>
                            <Text style={styles.text}>Country: {this.state.MovieDetails.Country}</Text>
                            <Text style={styles.text}>Awards: {this.state.MovieDetails.Awards}</Text>
                            <Text style={styles.text}>BoxOffice Collection: {this.state.MovieDetails.BoxOffice}</Text>
                            <Text style={styles.text}>Website: {this.state.MovieDetails.Website}</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    head: {
        color: 'gold',
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 5
    },
    text: {
        fontSize: 15,
        margin: 5,
        textTransform: 'capitalize',
    },
    capitlize: {
        textTransform: 'capitalize',
    },
    uppercase:{
        textTransform: 'uppercase',
    }
});

export default Details;
