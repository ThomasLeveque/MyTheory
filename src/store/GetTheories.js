import { Container } from 'unstated';

import db from '../config/Database';

class GetTheories extends Container {
  state = {
    loading: false,
    theories: [],
  };

  fetchData = async () => {
    this.setState({ loading: true });
    const allTheories = await db.ref('/theory').once('value');
    const theories = Object.values(allTheories.val());
    this.setState({
      theories,
      loading: false,
    });
  };
}

export default GetTheories;
