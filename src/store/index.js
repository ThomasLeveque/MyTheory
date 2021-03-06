import { Container } from 'unstated';
import firebase from 'firebase';

import m from 'moment';
import db from '../config/Database';

class Store extends Container {
  state = {
    loading: false,
    theories: [],
    userTheories: [],
    categories: [],
    user: null,
    users: null,
    error: null,
  };

  // CATEGORY //
  getCategories = async () => {
    try {
      const allCategories = await db.ref(`/categories`).once('value');
      const categoriesValues = Object.values(allCategories.val());
      const categoriesKeys = Object.keys(allCategories.val());
      const categoriesArray = categoriesValues.map((category, index) => ({
        ...category,
        id: categoriesKeys[index],
      }));
      this.setState({ categories: categoriesArray });
    } catch (error) {
      this.setState({ error });
    }
  };

  // USER //
  getUser = async () => {
    try {
      const { currentUser } = firebase.auth();
      const user = await db.ref(`/users/${currentUser.uid}`).once('value');
      this.setState({ user: user.val() });
    } catch (error) {
      this.setState({ error });
    }
  };

  getUsers = async () => {
    try {
      const users = await db.ref(`/users`).once('value');
      this.setState({ users: users.val() });
    } catch (error) {
      this.setState({ error });
    }
  };

  storeUser = (userId, email, name, img) => {
    db.ref(`users/${userId}`).set({
      id: userId,
      email,
      name,
      img,
    });
  };

  handleSignUp = async ({ email, name, password }) => {
    try {
      const formatedEmail = email.replace(/\s/g, '');
      this.setState({ loading: true });
      await firebase.auth().createUserWithEmailAndPassword(formatedEmail, password);

      const { currentUser } = firebase.auth();
      await this.storeUser(currentUser.uid, formatedEmail, name, '');
    } catch (error) {
      this.setState({
        error,
        loading: false,
      });
    }
  };

  handleLogin = async ({ email, password }) => {
    try {
      this.setState({ loading: true });
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  // THEORY //
  getTheories = async () => {
    try {
      const { currentUser } = firebase.auth();
      const allTheories = await db.ref('/theory').once('value');

      let theories = Object.values(allTheories.val());
      const theoriesKey = Object.keys(allTheories.val());

      theories = theories.map((theorie, index) => ({
        ...theorie,
        user: this.state.users[theorie.userId],
        id: theoriesKey[index],
      }));
      this.setState(
        {
          theories,
          loading: false,
        },
        () => {
          const userTheories = this.state.theories.filter(
            theory => theory.userId === currentUser.uid,
          );

          this.setState({
            userTheories,
          });
        },
      );
    } catch (error) {
      this.setState({ error });
    }
  };

  addCommentTheory = async ({ idTheory, idUser, comment }) => {
    try {
      await db.ref('/comments').push({
        userId: idUser,
        idTheory,
        comment,
        date: Date.now(),
      });
    } catch (error) {
      this.setState({ error });
    }
  };

  getCommentsTheory = async theoryId => {
    const allComments = await db
      .ref(`/comments/`)
      .orderByChild('idTheory')
      .equalTo(theoryId)
      .once('value');
    m.locale('fr');
    if (allComments.val()) {
      let comments = Object.values(allComments.val());
      comments.reverse();
      comments = comments.map(comment => ({
        ...comment,
        user: this.state.users[comment.userId],
        dateFormat: m(comment.date).fromNow(),
      }));
      return comments;
    }
    return null;
  };

  addTheoryLike = async theory => {
    const { currentUser } = firebase.auth();
    await db.ref(`/theory/${theory.id}`).update({
      likes: theory.likes ? [...theory.likes, currentUser.uid] : [currentUser.uid],
    });
    await this.getTheories();
  };
}

export default Store;
