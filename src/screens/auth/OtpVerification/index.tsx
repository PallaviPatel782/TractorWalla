import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
    Text,
    Button,
    Header,
    KeyboardWrapper,
    OTPInput,
    ScreenWrapper,
    View,
    FlatList,
} from '@components';
import {
    ObBoardingSlider1Image,
    ObBoardingSlider2Image,
    ObBoardingSlider3Image
} from '@images';
import { createStyles } from './styles';
import { SW, SH } from '@utils/Dimensions';


const { width } = Dimensions.get('window');

const OtpVerification = ({ navigation }: any) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const styles = createStyles(theme);
    const [timer, setTimer] = useState(30);
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<any>(null);

    const SLIDER_DATA = useMemo(() => [
        {
            id: '1',
            image: ObBoardingSlider1Image,
            title: t('auth.otp.sliders.book'),
        },
        {
            id: '2',
            image: ObBoardingSlider2Image,
            title: t('auth.otp.sliders.track'),
        },
        {
            id: '3',
            image: ObBoardingSlider3Image,
            title: t('auth.otp.sliders.fixed'),
        },
    ], [t]);

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
    }, [activeIndex, SLIDER_DATA.length]);

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

    const renderSlide = ({ item }: { item: any }) => (
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
                                {t('auth.otp.title')}
                            </Text>
                            <Text
                                variant="medium"
                                size={11}
                                color={theme.colors.gray500}
                                align="center"
                                style={styles.subText}
                            >
                                {t('auth.otp.subtitle')}
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
                                        {t('auth.otp.resendText')}{' '}
                                    </Text>
                                    <Text size={12} color={theme.colors.AzureBlue} variant="bold">
                                        00:{timer < 10 ? `0${timer}` : timer}
                                    </Text>
                                </View>
                            </View>

                            <Button
                                title={t('common.continue')}
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