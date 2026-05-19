import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Dimensions, TouchableOpacity, Platform, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
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
import { useSendOtp, useVerifyOtp } from '@screens/auth/hooks/useAuth';
import { useSnackbarStore } from '@store/useSnackbarStore';
import { useAuthStore } from '@store/useAuthStore';
import { createStyles } from './styles';

const { width } = Dimensions.get('window');

const OtpVerification = ({ navigation, route }: any) => {
    const { mobileNumber } = route.params || {};
    const { theme } = useTheme();
    const { t } = useTranslation();
    const styles = createStyles(theme);
    const [timer, setTimer] = useState(30);
    const [activeIndex, setActiveIndex] = useState(0);
    const [otp, setOtp] = useState('');
    const [hasError, setHasError] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const flatListRef = useRef<any>(null);

    const showSnackbar = useSnackbarStore(state => state.showSnackbar);

    const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
    const { mutate: sendOtp } = useSendOtp();

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true),
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false),
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

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
        if (isKeyboardVisible) return;
        const autoScroll = setInterval(() => {
            const nextIndex = (activeIndex + 1) % SLIDER_DATA.length;
            setActiveIndex(nextIndex);
            if (flatListRef.current) {
                try {
                    flatListRef.current.scrollToIndex({
                        index: nextIndex,
                        animated: true,
                    });
                } catch {
                    // Ignore layout errors if FlatList is unmounting
                }
            }
        }, 4000);

        return () => clearInterval(autoScroll);
    }, [activeIndex, SLIDER_DATA.length, isKeyboardVisible]);

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
        if (otp.length === 6) {
            setHasError(false);
            verifyOtp({
                phone: mobileNumber,
                countryCode: '91',
                role: 'customer',
                otp: otp
            }, {
                onSuccess: (response: any) => {
                    const { setTokens, setUser } = useAuthStore.getState();
                    setTokens(response.accessToken, response.refreshToken);
                    const user = response.user || response.customer || response.data?.user || response.data?.customer;
                    if (user) {
                        setUser({ ...user, _id: user.id || user._id });
                    }
                    showSnackbar({
                        type: 'success',
                        title: 'Welcome',
                        description: response.message || response.data?.message || 'Login successful'
                    });
                    navigation.navigate('LocationAccess');
                },
                onError: (error: any) => {
                    setHasError(true);
                    showSnackbar({
                        type: 'error',
                        title: 'Error',
                        description: error.error || error.message || 'Invalid OTP'
                    });
                }
            });
        }
    };

    const handleResendOTP = () => {
        setTimer(30);
        sendOtp({ phone: mobileNumber, countryCode: '91', role: 'customer' }, {
            onSuccess: (response: any) => {
                showSnackbar({
                    type: 'success',
                    title: 'Success',
                    description: response.message || response.data?.message || 'OTP resent successfully'
                });
            },
            onError: (error: any) => {
                showSnackbar({
                    type: 'error',
                    title: 'Error',
                    description: error.error || error.message || 'Failed to resend OTP'
                });
            }
        });
    };

    const renderSlide = ({ item }: { item: any }) => (
        <View style={styles.slide}>
            <item.image width={170} height={110} />
            <Text variant="regular" size={16} style={styles.serviceText}>
                {item.title}
            </Text>
        </View>
    );

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <LinearGradient
                    colors={[theme.colors.authGradientStart, theme.colors.authGradientEnd]}
                    style={styles.gradientHeader}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                />
                <Header onPressLogo={() => navigation.goBack()} />
                <KeyboardWrapper keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
                    <View style={styles.content}>

                        <View style={[
                            styles.sliderSection,
                            isKeyboardVisible && { height: 100, marginTop: 10 }
                        ]}>
                            {!isKeyboardVisible ? (
                                <FlatList
                                    ref={flatListRef}
                                    data={SLIDER_DATA}
                                    renderItem={renderSlide}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item) => item.id}
                                    onMomentumScrollEnd={(e) => {
                                        const index = Math.round(e.nativeEvent.contentOffset.x / (width - 48));
                                        setActiveIndex(index);
                                    }}
                                />
                            ) : (
                                <View style={styles.slide}>
                                    <Text variant="regular" size={16} style={[styles.serviceText]}>
                                        {SLIDER_DATA[activeIndex].title}
                                    </Text>
                                </View>
                            )}

                            {!isKeyboardVisible && (
                                <View style={styles.paginationDots}>
                                    {SLIDER_DATA.map((_, index) => (
                                        <View
                                            key={index}
                                            style={[
                                                styles.dot,
                                                {
                                                    width: index === activeIndex ? 18 : 6,
                                                    backgroundColor: index === activeIndex
                                                        ? theme.colors.brandRed
                                                        : theme.colors.gray300
                                                }
                                            ]}
                                        />
                                    ))}
                                </View>
                            )}
                        </View>



                        <View style={[styles.inputCard, { marginTop: 20 }]}>
                            <View style={[styles.textSection, isKeyboardVisible && { marginTop: 10 }]}>
                                <Text variant="bold" size={isKeyboardVisible ? 18 : 24} align="center" style={styles.title}>
                                    {t('auth.otp.title')}
                                </Text>
                                {!isKeyboardVisible && (
                                    <Text
                                        variant="medium"
                                        size={14}
                                        align="center"
                                        style={styles.subText}
                                    >
                                        {t('auth.otp.subtitle')}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.otpWrapper}>
                                <OTPInput
                                    length={6}
                                    onComplete={(value) => {
                                        setOtp(value);
                                        setHasError(false);
                                    }}
                                    onChange={(value) => {
                                        setOtp(value);
                                        setHasError(false);
                                    }}
                                    error={hasError}
                                />
                            </View>

                            <View style={styles.timerSection}>
                                {timer > 0 ? (
                                    <View style={styles.timerRow}>
                                        <Text size={12} color={theme.colors.gray600}>
                                            {t('auth.otp.resendText')}{' '}
                                        </Text>
                                        <Text size={12} color={theme.colors.brandRed} variant="bold">
                                            00:{timer < 10 ? `0${timer}` : timer}
                                        </Text>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        onPress={handleResendOTP}
                                        style={styles.resendBtn}
                                    >
                                        <Text size={14} color={theme.colors.brandRed} variant="semiBold">
                                            {t('auth.otp.resendBtn')}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            <Button
                                title={t('common.continue')}
                                onPress={handleContinue}
                                loading={isVerifying}
                                disabled={otp.length !== 6}

                            />

                        </View>

                    </View>
                </KeyboardWrapper>
            </View>
        </ScreenWrapper>
    );
};

export default OtpVerification;