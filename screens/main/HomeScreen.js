import React from 'react'
import firebase from 'firebase'
import { List, ListItem, Card, Icon, Button} from "react-native-elements";
import { ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, Platform, Image, ImageBackground, Text, View, ScrollView } from 'react-native'
export default class Main extends React.Component {
    state = {
        currentUser: null,
        data: [],
        page: 0,
        loading: false,
        theories: [],
    }

    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    componentWillMount(){
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    fetchData = async () => {
        /*
        this.setState({ loading: true });
        const response = await fetch(`https://randomuser.me/api?results=18&seed=hi&page=${this.state.page}`);
        const json = await response.json();
        this.setState(state => ({ data: [...state.data, ...json.results], loading: false})) ;
        */
        this.setState({ loading: true });
        const database = firebase.database();
        const allTheories = await database.ref("/theory").once("value");
        const theories = Object.values(allTheories.val());
        this.setState({ 
            theories,
            loading: false
         });

    };

    handleEnd = () => {
        //console.log('handleEnd called');
        this.setState(state => ({ page: this.state.page+1 }), () => this.fetchData());
        this.fetchData();
    }

    componentDidMount() {

        this.fetchData()
    }

    render() {
        const { theories, loading } = this.state

        if(loading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Loading</Text>
                    <ActivityIndicator size="large"/>
                </View> 
            )
        }

        return (
            <View style={styles.container}>

                <FlatList
                    data={theories}
                    onEndReached={() => this.handleEnd()}
                    onEndReachedThreshold={0}
                    ListFooterComponent ={() => this.state.loading ? null : <ActivityIndicator size='large' animating /> }
                    keyExtractor={item => item.date.toString()}
                    renderItem={({ item }) =>
                            <Card
                            title={item.name}
                            image={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'}}>
                            <Text style={{marginBottom: 10}}>
                                {item.description}
                            </Text>
                            <Button
                                backgroundColor='#03A9F4'
                                onPress={() =>{}}
                                icon={<Icon name='code' color='#ffffff' />}
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                title='VIEW NOW' 
                            />
                        </Card>}
                    />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop:  50,
        backgroundColor: 'white',
        height:'110%'
    },

})