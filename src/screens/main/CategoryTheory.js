import React from 'react';
import { FlatList, Text } from 'react-native';

import CardComponnent from '../../components/CardComponent';
import Layout from '../../components/Layout';
import { categoryTrads } from '../../utils/Utils';
import { commonStyle } from '../../utils/commonStyles';

class CategoryTheory extends React.Component {
  render() {
    return (
      <Layout>
        <Text style={[commonStyle.titleStyle, { marginBottom: 10 }]}>
          {categoryTrads[this.props.navigation.state.params.category]}
        </Text>
        <FlatList
          data={this.props.navigation.state.params.theories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CardComponnent theory={item} />}
        />
      </Layout>
    );
  }
}

export default CategoryTheory;
