import React from 'react';
import { FlatList, Text } from 'react-native';

import CardComponent from '../../components/CardComponent';
import Layout from '../../components/Layout';
import { categoryTrads } from '../../utils/Utils';
import { commonStyle } from '../../utils/commonStyles';

const CategoryTheory = ({ navigation }) => {
  return (
    <Layout>
      <Text style={[commonStyle.titleStyle, { marginBottom: 10 }]}>
        {categoryTrads[navigation.state.params.category]}
      </Text>
      <FlatList
        data={navigation.state.params.theories}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CardComponent theory={item} />}
      />
    </Layout>
  );
};

export default CategoryTheory;
