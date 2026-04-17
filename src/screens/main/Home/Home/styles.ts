import { StyleSheet, Dimensions } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#F8F9FB', // Light gray background like SS
    },

    // ── Header ────────────────────────────────────────────────────────
    header: {
      backgroundColor: theme.colors.DeepGreen || '#105D38',
      paddingTop: SH(12),
      paddingBottom: SH(16),
      paddingHorizontal: SW(16),
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(10),
      marginBottom: SH(12),
    },
    searchBox: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderRadius: SW(30),
      paddingHorizontal: SW(16),
      paddingVertical: SH(8),
      gap: SW(10),
    },
    searchInput: {
      flex: 1,
      fontSize: SF(14),
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.robotoRegular,
      padding: 0,
    },
    headerActions: {
      flexDirection: 'row',
      gap: SW(10),
    },
    iconCircle: {
      width: SW(40),
      height: SW(40),
      borderRadius: SW(20),
      backgroundColor: 'rgba(255,255,255,0.15)', // Glass effect
      alignItems: 'center',
      justifyContent: 'center',
    },
    notifDot: {
      position: 'absolute',
      top: SW(8),
      right: SW(8),
      width: SW(8),
      height: SW(8),
      borderRadius: SW(4),
      backgroundColor: '#CF2C3E',
      borderWidth: 1.5,
      borderColor: theme.colors.white,
    },
    addressRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(6),
    },
    addressText: {
      color: 'rgba(255,255,255,0.8)',
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
    },
    addressBold: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.robotoMedium,
    },

    // ── Scroll Content ────────────────────────────────────────────────
    scrollContent: {
      paddingBottom: SH(40),
    },

    // ── Slider Sections ───────────────────────────────────────────────
    sliderSection: {
      marginVertical: SH(16),
    },
    heroCardContainer: {
      width: SCREEN_WIDTH,
      paddingHorizontal: SW(16),
    },
    heroCard: {
      width: SCREEN_WIDTH - SW(32),
      borderRadius: SW(20),
      overflow: 'hidden',
      backgroundColor: theme.colors.gray200,
    },
    heroOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: SW(60),
      paddingBottom: SH(24),
      backgroundColor: 'rgba(0,0,0,0.3)', // Subtle dark overlay for text readability
    },
    heroTitle: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(18),
      marginBottom: SH(16),
      lineHeight: SF(24),
    },
    heroCta: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.white,
      borderRadius: SW(25),
      paddingHorizontal: SW(20),
      paddingVertical: SH(8),
    },
    heroCtaText: {
      color: '#000',
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(14),
    },
    dots: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: SW(8),
      marginTop: SH(12),
    },
    dot: {
      width: SW(8),
      height: SW(8),
      borderRadius: SW(4),
      backgroundColor: '#EBEBEB',
    },
    dotActive: {
      backgroundColor: theme.colors.DeepGreen || '#105D38',
      width: SW(24), // Active indicator is longer like in SS
    },

    // ── Generic Section ───────────────────────────────────────────────
    section: {
      paddingHorizontal: SW(16),
      marginBottom: SH(24),
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SH(14),
    },
    sectionTitle: {
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(17),
      color: '#000',
    },
    seeMore: {
      fontFamily: theme.fontfamily.robotoMedium,
      fontSize: SF(14),
      color: theme.colors.DeepGreen || '#105D38',
      textDecorationLine: 'underline',
    },

    // ── Service Cards 2x2 Grid ────────────────────────────────────────
    serviceGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SW(12),
    },
    serviceCard: {
      width: (SCREEN_WIDTH - SW(32) - SW(12)) / 2,
      borderRadius: SW(20),
      padding: SW(16),
      minHeight: SH(140),
    },
    serviceIconWrap: {
      width: SW(44),
      height: SW(44),
      borderRadius: SW(12),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: SH(12),
    },
    serviceLabel: {
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(15),
      marginBottom: SH(6),
    },
    serviceSub: {
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
      color: '#666',
      lineHeight: SF(16),
    },

    // ── Parts Card ────────────────────────────────────────────────────
    partCard: {
      width: SW(180),
      backgroundColor: theme.colors.white,
      borderRadius: SW(16),
      padding: SW(12),
      borderWidth: 1,
      borderColor: '#F0F0F0',
    },
    partImageWrap: {
      alignItems: 'center',
      marginBottom: SH(10),
    },
    partName: {
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(13),
      color: '#333',
      marginBottom: SH(8),
      lineHeight: SF(18),
    },
    partPriceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(8),
      marginBottom: SH(6),
    },
    partPrice: {
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(15),
      color: '#000',
    },
    partMrp: {
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
      color: '#999',
      textDecorationLine: 'line-through',
    },
    partDiscount: {
      fontFamily: theme.fontfamily.robotoMedium,
      fontSize: SF(12),
      color: '#28A745',
    },

    // ── Categories ────────────────────────────────────────────────────
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      rowGap: SH(20),
    },
    categoryItem: {
      width: (SCREEN_WIDTH - SW(32)) / 3.2,
      alignItems: 'center',
    },
    categoryImageWrap: {
      width: SW(76),
      height: SW(76),
      backgroundColor: '#F5F5F5',
      borderRadius: SW(12),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: SH(8),
    },
    categoryLabel: {
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
      color: '#444',
      textAlign: 'center',
      lineHeight: SF(16),
    },

    // ── Ad Banner ─────────────────────────────────────────────────────
    adBannerWrap: {
      marginHorizontal: SW(16),
      marginBottom: SH(24),
      borderRadius: SW(16),
      overflow: 'hidden',
    },

    // ── How It Works ──────────────────────────────────────────────────
    videoThumb: {
      width: SW(200),
      height: SH(120),
      backgroundColor: '#E0E0E0',
      borderRadius: SW(16),
      alignItems: 'center',
      justifyContent: 'center',
    },
    playButton: {
      width: SW(48),
      height: SW(48),
      borderRadius: SW(24),
      backgroundColor: 'rgba(255,255,255,0.9)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    playIcon: {
      fontSize: SF(18),
      color: '#000',
      marginLeft: SW(4),
    },
    stepsCard: {
      backgroundColor: theme.colors.white,
      borderRadius: SW(20),
      padding: SW(20),
      borderWidth: 1,
      borderColor: '#F0F0F0',
    },
    stepsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(12),
      marginBottom: SH(20),
    },
    stepsBorderLeft: {
      width: SW(4),
      height: SH(24),
      backgroundColor: '#CF2C3E', // Vertical red line from SS
      borderRadius: SW(2),
    },
    stepsTitle: {
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(16),
      color: '#000',
    },
    stepRow: {
      flexDirection: 'row',
      gap: SW(16),
      marginBottom: SH(20),
      alignItems: 'flex-start',
    },
    stepBadge: {
      width: SW(34),
      height: SW(34),
      borderRadius: SW(17),
      backgroundColor: '#36404F', // Dark gray/black badge
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    stepNum: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(14),
    },
    stepContent: {
      flex: 1,
    },
    stepTitle: {
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(14),
      color: '#000',
      marginBottom: SH(6),
    },
    stepDesc: {
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
      color: '#666',
      lineHeight: SF(18),
    },

    // ── Brands ────────────────────────────────────────────────────────
    brandItem: {
      alignItems: 'center',
      gap: SH(8),
    },
    brandLabel: {
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
      color: '#555',
    },

    // ── Mechanic Bar ──────────────────────────────────────────────────
    mechanicBar: {
      marginHorizontal: SW(16),
      backgroundColor: theme.colors.white,
      borderRadius: SW(18),
      padding: SW(16),
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    mechanicLeft: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(14),
    },
    mechanicAvatar: {
      width: SW(52),
      height: SW(52),
      borderRadius: SW(26),
      backgroundColor: '#F0F0F0',
    },
    mechanicName: {
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(14),
      color: '#000',
      marginBottom: SH(4),
    },
    mechanicMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(6),
      marginBottom: SH(4),
    },
    mechanicJobs: {
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
      color: '#777',
    },
    mechanicPrice: {
      backgroundColor: '#000',
      borderRadius: SW(20),
      paddingHorizontal: SW(16),
      paddingVertical: SH(8),
      marginRight: SW(12),
    },
    mechanicPriceText: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(14),
    },
    mechanicArrow: {
      width: SW(40),
      height: SW(40),
      borderRadius: SW(20),
      backgroundColor: '#212529',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mechanicArrowText: {
      color: theme.colors.white,
      fontSize: SF(18),
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(4),
    },
    starIcon: {
      color: '#FFB800',
      fontSize: SF(14),
    },
    ratingText: {
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
      color: '#666',
    },
  });
