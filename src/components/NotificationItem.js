import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../screens/styles';
const NotificationItem = (props) => {
    const   _onPress = (id) => {
        props.onPress(id)
    };
    return (
        <View style={styles.listItem}>
            <Text style={styles.title}>You got a new Pickup Request</Text>
            <Text style={styles.username}>{props.item.fullname}</Text>
            <View style={styles.lastRowView}>
                <Text style={styles.address}>East 46th Street, New York Pizza, Italian</Text>
                <TouchableOpacity onPress={() => _onPress(props.item._id)} style={styles.approveButton}>
                    <Text style={styles.approveText}>Approve</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

export default NotificationItem;