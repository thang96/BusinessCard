
import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    FlatList,
    Dimensions
} from 'react-native';
const CustomPicker = (props) => {
    const { data, onPress, open = false } = props

    if(!open) return null;

    return (
        <View style={{ position: 'absolute', width: '100%', height: '100%',zIndex:9999 , backgroundColor:'white'}}>
            <FlatList
                keyExtractor={data.label}
                data={data}
                renderItem={({item,index}) => (
                    <TouchableOpacity onPress={onPress(item.value)} key={index} style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>{item.label}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}
export default CustomPicker