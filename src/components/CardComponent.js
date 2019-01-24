import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CardComponent = ({ image, title, category, user, description, likes, comments, peoples }) => {
    return (
        <Text style={{ color: 'black', backgroundColor: 'white' }}>{user.name}</Text>
    );
}

export default CardComponent;