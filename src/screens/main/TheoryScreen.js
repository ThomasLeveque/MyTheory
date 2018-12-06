import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

const TheoryScreen = props => {
  const theory = props.navigation.state.params.theory;
  return (
    <View style={styles.container}>
      <Image
        style={{ width: '100%', height: '50%' }}
        source={{
          uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        }}
      />
      <Text>{theory.name}</Text>
      <Text>{theory.description}</Text>
      <View style={styles.containerInline}>
        <Text style={styles.elementInline}>208 likes</Text>
        <Button
          color="red"
          title="join chat"
          onPress={() => {}}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
        />
      </View>
      <Text>Comments</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerInline: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default TheoryScreen;
