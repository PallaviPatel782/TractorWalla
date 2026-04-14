import React, { useState, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import { useTheme } from '@theme';
import {
    Text,
    Button,
    Header,
    KeyboardWrapper,
    OTPInput,
    ScreenWrapper,
    View,
    TouchableOpacity,
    FlatList,
} from '@components';
import {
    ObBoardingSlider1Image,
    ObBoardingSlider2Image,
    ObBoardingSlider3Image
} from '@images';
import { useAppDispatch } from '@store';
import { createStyles } from './OtpVerification.styles';
import { SW, SH } from '@utils/Dimensions';

const { width } = Dimensions.get('window');

const SLIDER_DATA = [
    {
        id: '1',
        image: ObBoardingSlider1Image,
        title: 'Book Service',
    },
    {
        id: '2',
        image: ObBoardingSlider2Image,
        title: 'Track Service Engineer',
    },
    {
        id: '3',
        image: ObBoardingSlider3Image,
        title: 'Get it Fixed',
    },
];

const OtpVerification = ({ navigation, route }: any) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const mobileNumber = route?.params?.mobileNumber || '9999999999';

    const [timer, setTimer] = useState(30);
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<any>(null);

    useEffect(() => {
        const autoScroll = setInterval(() => {
            const nextIndex = (activeIndex + 1) % SLIDER_DATA.length;
            setActiveIndex(nextIndex);
            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });
        }, 4000);

        return () => clearInterval(autoScroll);
    }, [activeIndex]);

    useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleContinue = () => {
        navigation.navigate('LocationAccess')
    };

    const renderSlide = ({ item }: { item: typeof SLIDER_DATA[0] }) => (
        <View style={styles.slide}>
            <item.image width={SW(170)} height={SH(140)} />
            <Text variant="bold" size={16} style={styles.serviceText}>
                {item.title}
            </Text>
        </View>
    );

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Header onPressLogo={() => navigation.goBack()} />
                <KeyboardWrapper>
                    <View style={styles.content}>

                        <View style={styles.sliderSection}>
                            <FlatList
                                ref={flatListRef}
                                data={SLIDER_DATA}
                                renderItem={renderSlide}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                onMomentumScrollEnd={(e) => {
                                    const index = Math.round(e.nativeEvent.contentOffset.x / (width - SW(40)));
                                    setActiveIndex(index);
                                }}
                            />

                            <View style={styles.paginationDots}>
                                {SLIDER_DATA.map((_, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.dot,
                                            {
                                                backgroundColor: index === activeIndex
                                                    ? theme.colors.brandRed
                                                    : theme.colors.gray300
                                            }
                                        ]}
                                    />
                                ))}
                            </View>
                        </View>

                        <View style={styles.inputCard}>
                            <Text variant="bold" size={16} align="center">
                                Verify Your Mobile Number
                            </Text>
                            <Text
                                variant="medium"
                                size={11}
                                color={theme.colors.gray500}
                                align="center"
                                style={styles.subText}
                            >
                                Enter the 6-digit OTP sent to Your Mobile Number
                            </Text>

                            <View style={styles.otpWrapper}>
                                <OTPInput
                                    length={6}
                                    onComplete={(otp) => console.log('OTP:', otp)}
                                />
                            </View>

                            <View style={styles.timerSection}>
                                <View style={styles.timerRow}>
                                    <Text size={12} color={theme.colors.gray500}>
                                        Resend OTP in{' '}
                                    </Text>
                                    <Text size={12} color={theme.colors.AzureBlue} variant="bold">
                                        00:{timer < 10 ? `0${timer}` : timer}
                                    </Text>
                                </View>
                            </View>

                            <Button
                                title="CONTINUE"
                                onPress={handleContinue}
                                style={styles.button}
                            />
                        </View>
                    </View>
                </KeyboardWrapper>
            </View>
        </ScreenWrapper>
    );
};

export default OtpVerification;