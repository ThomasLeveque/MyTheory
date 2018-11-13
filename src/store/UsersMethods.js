import { Container } from 'unstated';
import firebase from 'firebase';

import db from '../config/Database';

class UsersMethods extends Container {
  state = {
    user: null,
    updateUserError: null,
  };

  fetchUser = async () => {
    const { currentUser } = firebase.auth();

    const user = await db.ref(`/users/${currentUser.uid}`).once('value');

    this.setState({ user: user.val() });
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

      this.fetchUser();
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
}

export default UsersMethods;
