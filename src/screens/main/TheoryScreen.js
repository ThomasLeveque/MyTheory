import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, View, FlatList } from 'react-native';
import { Subscribe } from 'unstated';
import { Card } from 'react-native-elements';
import firebase from 'firebase';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';

import Store from '../../store';

const TheoryScreen = props => (
  <Subscribe to={[Store]}>
    {store => <Child store={store} navigation={props.navigation} />}
  </Subscribe>
);

class Child extends Component {
  state = {
    comment: '',
    comments: [],
    loading: false,
    errorMessage: '',
  };

  getComments = async () => {
    const theory = this.props.navigation.state.params.theory;
    const comments = await this.props.store.getCommentsTheory(theory.id);
    this.setState({ comments });
  };

  componentWillMount = async () => {
    this.getComments();
  };

  handleSubmit = async () => {
    const { comment } = this.state;
    const { currentUser } = firebase.auth();

    const theory = this.props.navigation.state.params.theory;
    this.setState({ loading: true });
    if (comment.length > 0) {
      const params = {
        idTheory: theory.id,
        idUser: currentUser.uid,
        comment,
      };
      this.props.store.addCommentTheory(params).then(() => {
        this.getComments();
        this.setState({ loading: false });
      });
    }
  };

  render() {
    const theory = this.props.navigation.state.params.theory;
    return (
      <View style={styles.container}>
        <Image
          style={{ width: '100%', height: '50%' }}
          source={{
            uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          }}
        />
        <Text>{theory.name}</Text>
        <Text>{theory.description}</Text>
        <View style={styles.containerInline}>
          <Text style={styles.elementInline}>208 likes</Text>
          <Button
            color="red"
            title="join chat"
            onPress={() => {}}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
          />
        </View>
        <Text>Comments</Text>
        <InputComponent
          value={this.state.comment}
          onChangeValue={comment => this.setState({ comment })}
          placeholderInput="Your comment"
          styleInput={styles.itemInput}
        />
        {this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
        <ButtonComponent
          textButton="Add comment"
          styleButton={styles.button}
          styleText={styles.buttonText}
          onPress={this.handleSubmit}
          loading={this.state.loading}
        />
        <FlatList
          data={this.state.comments}
          keyExtractor={({ date }) => date.toString()}
          renderItem={({ item }) => (
            <Card>
              <Text style={{ marginBottom: 10, color: 'black' }}>{item.comment}</Text>
              <Text>{item.user.name}</Text>
              <Text>{item.dateFormat}</Text>
            </Card>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerInline: {
    flex: 1,
    flexDirection: 'row',
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'black',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

export default TheoryScreen;
