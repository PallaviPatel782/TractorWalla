import React, { useState } from 'react';
import { Modal, View as RNView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  ScreenWrapper,
  Button,
  SecondaryHeader,
} from '@components';
import { useTheme } from '@theme';
import { createStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { SW } from '@utils/Dimensions';
import { CheckIcon, LocationIcon, CloseIcon } from '@assets/icons';

const ServiceAvailabilityScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const [isVoted, setIsVoted] = useState(false);

  const handleVote = () => {
    setIsVoted(true);
  };

  const closePopup = () => {
    setIsVoted(false);
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <SecondaryHeader
          title={t('main.services.serviceAvailability', 'Service Availability')}
          onBack={() => navigation.goBack()}
        />

        <View style={styles.content}>
          <View style={styles.emptyContainer}>
            <View style={styles.iconWrapper}>
              <View style={styles.locationCircle}>
                <LocationIcon size={SW(40)} color={theme.colors.white} />
                <View style={styles.closeBadge}>
                  <CloseIcon size={SW(12)} color={theme.colors.white} />
                </View>
              </View>
            </View>

            <Text style={styles.title}>
              {t('main.services.notAvailableTitle', 'Service Not Available in Your Area')}
            </Text>
            <Text style={styles.description}>
              {t('main.services.notAvailableDesc', "We're currently expanding our service network and haven't reached your location yet.\n\nPlease try another nearby location or allow notifications so we can inform you when TractorWalla launches in your area.")}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title={t('main.services.voteButton', 'Vote to get TractorWalla in your area')}
            onPress={handleVote}
            style={styles.voteButton}
          />
        </View>

        {/* Success Popup */}
        <Modal
          visible={isVoted}
          transparent
          animationType="fade"
          onRequestClose={closePopup}
        >
          <TouchableWithoutFeedback onPress={closePopup}>
            <RNView style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <RNView style={styles.popupCard}>
                  <View style={styles.successIconWrapper}>
                    <CheckIcon size={SW(40)} color={theme.colors.white} />
                  </View>
                  <Text style={styles.popupTitle}>
                    {t('main.services.votedTitle', 'Successfully Voted!')}
                  </Text>
                  <Text style={styles.popupDesc}>
                    {t('main.services.votedDesc', "We're currently not operating in your region.")}
                  </Text>
                  <View style={styles.popupFooter}>
                    <Text style={styles.popupFooterText}>
                      {t('main.services.votedFooter', 'We\'ll notify you once the service becomes available in your area.')}
                    </Text>
                  </View>
                </RNView>
              </TouchableWithoutFeedback>
            </RNView>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </ScreenWrapper>
  );
};

export default ServiceAvailabilityScreen;
