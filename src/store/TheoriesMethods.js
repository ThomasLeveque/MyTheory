import { Container } from 'unstated';

import db from '../config/Database';

class TheoriesMethods extends Container {
  state = {
    loading: false,
    theories: [],
  };

  fetchData = async users => {
    this.setState({ loading: true });
    const allTheories = await db.ref('/theory').once('value');
    let theories = Object.values(allTheories.val());
    theories = theories.map(theorie => ({
      ...theorie,
      user: users[theorie.userId],
    }));

    this.setState({
      theories,
      loading: false,
    });
  };
}

export default TheoriesMethods;
