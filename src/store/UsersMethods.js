import { Container } from 'unstated';
import firebase from 'firebase';

import db from '../config/Database';

class UsersMethods extends Container {
  state = {
    user: null,
  };

  fetchUser = async () => {
    const { currentUser } = firebase.auth();

    const user = await db.ref(`/users/${currentUser.uid}`).once('value');

    this.setState({ user: user.val() });
  };
}

export default UsersMethods;
