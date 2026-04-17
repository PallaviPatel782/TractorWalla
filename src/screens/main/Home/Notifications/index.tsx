import React from 'react';
import { FlatList } from 'react-native';
import { View, Text, ScreenWrapper, SecondaryHeader } from '@components';
import { createStyles } from './styles';
import { useTheme } from '@theme';
import {
    CheckIcon,
    ServiceIcon,
    BuyIcon,
    BookingIcon,
    BillIcon,
} from '@assets/icons';
import { SW } from '@utils/Dimensions';

const notifications = [
    {
        id: '1',
        title: 'Booking Confirmed',
        desc: 'Your service appointment for Porsche 911 is confirmed for tomorrow at 9:00 AM.',
        time: 'JUST NOW',
        color: '#E53935',
        Icon: CheckIcon,
    },
    {
        id: '2',
        title: 'Technician Arrived',
        desc: 'Your technician is on-site and starting diagnostics.',
        time: '10 MIN AGO',
        color: '#2E7D32',
        Icon: ServiceIcon,
    },
    {
        id: '3',
        title: 'Parts Added',
        desc: 'New parts have been added to your service cart.',
        time: '10 MIN AGO',
        color: '#F9A825',
        Icon: BuyIcon,
    },
    {
        id: '4',
        title: 'Job Completed',
        desc: 'Your vehicle service is completed. Ready for pickup.',
        time: '10 MIN AGO',
        color: '#43A047',
        Icon: BookingIcon,
    },
    {
        id: '5',
        title: 'Payment Successful',
        desc: 'Payment received. Thank you!',
        time: '10 MIN AGO',
        color: '#D81B60',
        Icon: BillIcon,
    },
];

const NotificationItem = ({ item }: any) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    return (
        <View style={styles.card}>
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                <item.Icon size={SW(20)} color={theme.colors.white} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
        </View>
    );
};

const NotificationScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <ScreenWrapper>
            <SecondaryHeader title="Notification"
                onBack={() => navigation.goBack()} />
            <View style={styles.container}>
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <NotificationItem item={item} />}
                    contentContainerStyle={{ padding: 16 }}
                />
            </View>
        </ScreenWrapper>
    );
};

export default NotificationScreen;