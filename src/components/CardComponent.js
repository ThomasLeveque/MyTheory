import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CardComponent = ({ image, title, category, user, description, likes, comments, peoples }) => {
  return (
    <View>
      <Text style={{ color: 'black' }}>{title}</Text>;
    </View>
  );
};

export default CardComponent;
