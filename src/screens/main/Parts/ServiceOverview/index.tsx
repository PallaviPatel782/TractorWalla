import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  ScreenWrapper,
  GlobalBottomSheet,
  Button,
} from '@components';
import { useTheme } from '@theme';
import { createStyles } from './styles';
import {
  ChevronBackwardIcon,
  CheckIcon,
  ShareIcon,
  CloseIcon,
  CartIcon,
} from '@assets/icons';
import { ServiceModalImageImage } from '@assets/images';
import { PARTS_DATA } from '../dummyData';
import { SW, SH } from '@utils/Dimensions';

const ServiceOverviewScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { kitId } = route.params || {};

  const [modalVisible, setModalVisible] = useState(false);

  // Find the kit details from dummyData
  const kit = PARTS_DATA.flatMap(d => d.kits).find(k => k.id === kitId) || PARTS_DATA[0].kits[0];

  const onPurchasePress = () => {
    // Show the "Book Service Required" popup
    setModalVisible(true);
  };

  const onGoToService = () => {
    setModalVisible(false);
    navigation.navigate('Services');
  };

  const renderKitCard = (kit: any) => (
    <TouchableOpacity
      key={kit.id}
      style={styles.kitCard}
      onPress={() => navigation.navigate('ServiceOverview', { kitId: kit.id })}
    >
      <View style={styles.kitLeft}>
        <Text style={styles.kitTitle}>{kit.title}</Text>
        {kit.bullets.map((bullet: string, idx: number) => (
          <View key={idx} style={styles.recommendationBulletRow}>
            <CheckIcon size={14} color={theme.colors.DeepGreen} />
            <Text style={styles.bulletText}>{bullet}</Text>
          </View>
        ))}
        <View style={styles.kitFooter}>
          <Text style={styles.ratingText}>★ {kit.rating}</Text>
          <Text style={styles.price}>₹{kit.price}</Text>
          <Text style={styles.mrp}>₹{kit.price}</Text>
        </View>
      </View>
      <View style={styles.kitRight}>
        <kit.image width={SW(100)} height={SW(90)} style={styles.kitImage} />
        <TouchableOpacity
          style={styles.purchaseBtn}
          onPress={() => setModalVisible(true)}
        >
          <CartIcon size={SW(14)} color="#1E633F" />
          <Text style={styles.purchaseText}> {t('main.home.buyParts.purchase', 'Purchase')}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: SH(100) }}>
        <View style={styles.heroSection}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.goBack()}>
              <ChevronBackwardIcon size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <ShareIcon size={18} color="#000" />
            </TouchableOpacity>
          </View>
          <kit.image width={SW(240)} height={SH(200)} />
        </View>

        <View style={styles.contentCard}>
          <View style={styles.budgeSection}>
            <View style={styles.badgePill}>
              <Text style={styles.badgeText}>{kit.badge}</Text>
            </View>
            <View style={styles.ratingWrap}>
              <Text style={{ color: theme.colors.GoldenYellow }}>★</Text>
              <Text style={styles.ratingText}>{kit.rating}</Text>
            </View>
          </View>
          <View style={styles.titleRow}>
            <Text style={styles.kitTitle}>{kit.title}</Text>

          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{kit.price}</Text>
            <Text style={styles.mrp}>₹{kit.mrp}</Text>
          </View>

          <Text style={styles.sectionTitle}>{t('main.home.serviceOverview.details', 'Details')}</Text>
          <View style={styles.detailsGrid}>
            {kit.bullets.map((bullet: string, idx: number) => (
              <View key={idx} style={styles.detailBulletRow}>
                <CheckIcon size={16} color="#1E633F" />
                <Text style={styles.detailBulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        </View>

        <View>
          <Text style={[styles.sectionTitle, { marginHorizontal: SW(20), marginVertical: SH(20) }]}>{t('main.home.serviceOverview.otherParts', 'Other Parts')}</Text>
          <View style={styles.otherPartsList}>
            {PARTS_DATA.flatMap(d => d.kits)
              .filter(k => k.id !== kitId)
              .slice(0, 3)
              .map((item) => renderKitCard(item))}
          </View>
        </View>
      </ScrollView>


      <View style={styles.footer}>
        <Button
          title={t('main.home.serviceOverview.purchaseNow', 'Purchase Now')}
          onPress={onPurchasePress}
        />
      </View>

      <GlobalBottomSheet visible={modalVisible} onClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseBtn}
            onPress={() => setModalVisible(false)}
          >
            <CloseIcon size={20} color={theme.colors.black} />
          </TouchableOpacity>

          <Text style={styles.modalHeaderTitle}>
            {t('main.home.serviceOverview.bookingRequired.title', 'Book Service')}
          </Text>

          <Text style={styles.modalMsg}>
            {t('main.home.serviceOverview.bookingRequired.message', 'Please book service to Purchase Parts')}
          </Text>

          <View style={styles.modalImageWrapper}>
            <ServiceModalImageImage width={SW(280)} height={SH(180)} />
          </View>

          <Button
            title={t('main.home.serviceOverview.bookingRequired.button', 'GO TO SERVICE')}
            onPress={onGoToService} />

        </View>
      </GlobalBottomSheet>
    </ScreenWrapper>
  );
};

export default ServiceOverviewScreen;
