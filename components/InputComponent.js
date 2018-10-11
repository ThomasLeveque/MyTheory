import React from 'react'
import {TextInput, View} from 'react-native'

const InputComponent = ({placeholderInput, styleInput, onChangeValue}) => {
    return(
        <View>
            <TextInput style={styleInput} placeholder={placeholderInput} onChangeText={onChangeValue}/>
        </View>
    )
}

export default InputComponent