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

    const notifications = [
        {
            id: '1',
            title: 'Booking Confirmed',
            desc: 'Your service appointment for Porsche 911 is confirmed for tomorrow at 9:00 AM.',
            time: 'JUST NOW',
            color: theme.colors.errorRed,
            Icon: CheckIcon,
        },
        {
            id: '2',
            title: 'Technician Arrived',
            desc: 'Your technician is on-site and starting diagnostics.',
            time: '10 MIN AGO',
            color: theme.colors.infoBlue,
            Icon: ServiceIcon,
        },
        {
            id: '3',
            title: 'Parts Added',
            desc: 'New parts have been added to your service cart.',
            time: '10 MIN AGO',
            color: theme.colors.warningYellow,
            Icon: BuyIcon,
        },
        {
            id: '4',
            title: 'Job Completed',
            desc: 'Your vehicle service is completed. Ready for pickup.',
            time: '10 MIN AGO',
            color: theme.colors.successGreen,
            Icon: BookingIcon,
        },
        {
            id: '5',
            title: 'Payment Successful',
            desc: 'Payment received. Thank you!',
            time: '10 MIN AGO',
            color: theme.colors.pinkAccent,
            Icon: BillIcon,
        },
    ];

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