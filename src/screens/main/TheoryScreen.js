import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

const TheoryScreen = props => {
  const theory = props.navigation.state.params.theory;
  return (
    <View style={styles.container}>
      <Image
        style={{ width: '100%', height: '50%'}}
        source={{
          uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        }}
      />
      <Text>{theory.name}</Text>
      <Text>{theory.description}</Text>
      <Text>208 likes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default TheoryScreen;
