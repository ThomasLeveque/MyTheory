import { Container } from 'unstated';
import firebase from 'firebase';

import m from 'moment';
import db from '../config/Database';

class Store extends Container {
  state = {
    loading: false,
    theories: [],
    userTheories: [],
    user: null,
    users: null,
    updateUserError: null,
  };

  // USER //
  getUser = async () => {
    const { currentUser } = firebase.auth();

    const user = await db.ref(`/users/${currentUser.uid}`).once('value');

    this.setState({ user: user.val() });
  };

  getUsers = async () => {
    const users = await db.ref(`/users`).once('value');
    this.setState({ users: users.val() });
  };

  updateUser = async ({ newName, newEmail, currentPassword }) => {
    const { currentUser } = firebase.auth();
    try {
      if (newEmail !== currentUser.email) {
        await this.reauthenticateUser(currentPassword);
        await currentUser.updateEmail(newEmail);
      }
      await db.ref(`/users/${currentUser.uid}`).update({
        name: newName,
        email: newEmail,
      });

      this.getUser();
      await this.getUsers();
      this.getTheories();
    } catch (error) {
      this.setState({ updateUserError: { message: error.message, code: error.code } });
    }
  };

  ResetUserError = () => {
    this.setState({ updateUserError: null });
  };

  reauthenticateUser = currentPassword => {
    const { currentUser } = firebase.auth();
    const cred = firebase.auth.EmailAuthProvider.credential(currentUser.email, currentPassword);
    return currentUser.reauthenticateAndRetrieveDataWithCredential(cred);
  };

  // THEORY //
  getTheories = async () => {
    const { currentUser } = firebase.auth();
    this.setState({ loading: true });
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
  };

  addCommentTheory = async ({ idTheory, idUser, comment }) => {
    await db.ref('/comments').push({
      userId: idUser,
      idTheory,
      comment,
      date: Date.now(),
    });
    return true;
  };

  getCommentsTheory = async () => {
    const allComments = await db.ref(`/comments/`).once('value');
    let comments = Object.values(allComments.val());
    comments = comments.map(comment => ({
      ...comment,
      user: this.state.users[comment.userId],
      dateFormat: m(comment.date).fromNow(),
    }));
    return comments;
  };
}

export default Store;
