import React from 'react';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import { Subscribe } from 'unstated';
import { MaterialIcons } from '@expo/vector-icons';

import firebase from 'firebase';
import { InputComponent } from '../../components/InputComponent';
import { PrimaryButton } from '../../components/ButtonComponent';
import CommentComponent from '../../components/CommentComponent';

import Store from '../../store';
import colors from '../../assets/colors';
import Layout from '../../components/Layout';

const TheoryScreen = props => (
  <Subscribe to={[Store]}>
    {store => <Child store={store} navigation={props.navigation} />}
  </Subscribe>
);

class Child extends React.Component {
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
      await this.props.store.addCommentTheory(params);
      this.getComments();
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    const theory = this.props.navigation.state.params.theory;
    return (
      <Layout style={styles.container}>
        {theory.img && (
          <Image
            style={{ width: '100%' }}
            source={{
              uri: theory.img,
            }}
          />
        )}
        <View style={{}}>
          <Text
            style={{ fontSize: 25, fontFamily: 'montserratBold', marginTop: 10, marginLeft: 10 }}
          >
            {theory.name}
          </Text>
          <Text style={{ fontSize: 14, fontFamily: 'montserratRegular', marginTop: 15 }}>
            {theory.description}
          </Text>
          <View style={(styles.containerInline, { marginTop: 10, flexDirection: 'row' })}>
            <MaterialIcons name="thumb-up" size={20} color="black" />
            <Text
              style={
                (styles.elementInline,
                { marginLeft: 10, fontFamily: 'montserratLight', fontSize: 15 })
              }
            >
              208 likes
            </Text>
          </View>

          <Text style={{ fontFamily: 'montserratSemiBold', fontSize: 18, marginTop: 15 }}>
            Commentaires
          </Text>

          <InputComponent
            value={this.state.comment}
            onChangeText={comment => this.setState({ comment })}
            placeholder="Your comment"
          />
          {this.state.errorMessage && (
            <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
          )}
          <PrimaryButton
            title="Add comment"
            styleButton={{alignSelf: 'center', marginBottom: 20}}
            onPress={this.handleSubmit}
            loading={this.state.loading}
            pictoName='create'
            startColor={colors.GRADIENT_START}
            endColor={colors.GRADIENT_END}
          />
          <FlatList
            data={this.state.comments}
            keyExtractor={({ date }) => date.toString()}
            renderItem={({ item }) => <CommentComponent commentObject={item} />}
          />
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginLeft: 25,
  },
  containerInline: {
    flex: 1,
    marginRight: 50,
    marginLeft: 10,
  },
  elementInline: {
    flex: 2,
  },
  itemInput: {
    height: 55,
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
