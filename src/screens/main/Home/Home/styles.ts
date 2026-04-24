import { StyleSheet, Dimensions } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background, // Light gray background like SS
    },

    // ── Header ────────────────────────────────────────────────────────
    header: {
      backgroundColor: theme.colors.DeepGreen,
      paddingTop: SH(12),
      paddingBottom: SH(16),
      paddingHorizontal: SW(16),
      marginBottom: SH(10)
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
      borderRadius: SW(50), // Fully rounded as in SS
      paddingHorizontal: SW(16),
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
      backgroundColor: theme.colors.white + '26', // Glass effect
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
      backgroundColor: theme.colors.primaryRed,
      borderWidth: 1.5,
      borderColor: theme.colors.white,
    },
    addressRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(6),
    },
    addressText: {
      color: theme.colors.white + 'CC',
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
      marginBottom: SH(16),
      // Removed marginHorizontal to allow full-width scroll area
    },
    heroCardContainer: {
      width: SW(343),
      height: SH(154),
      borderRadius: SW(20),
      overflow: 'hidden',
      alignItems: 'center',
    },
    heroCard: {
      height: SH(160),
      width: SW(343),
      borderRadius: SW(20),
      overflow: 'hidden',
      position: 'relative',
      shadowRadius: 8,
    },
    heroGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '100%', // Fade from middle to bottom
      justifyContent: 'flex-end',
      paddingHorizontal: SW(20),
      paddingBottom: SH(20),
    },
    heroOverlay: {
      // Background color fallback if gradient not used
      backgroundColor: theme.colors.black + '4D',
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
    },
    heroTitle: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(15),
      marginBottom: SH(12),
      lineHeight: SF(24),
    },
    heroCta: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.white,
      borderRadius: SW(25), // Pill shape
      paddingHorizontal: SW(24),
      paddingVertical: SH(10),
    },
    heroCtaText: {
      color: theme.colors.black,
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(14),
    },
    // Middle Slider Container
    middleCardContainer: {
      width: SW(343),
      height: SH(154),
      borderRadius: SW(20),
      overflow: 'hidden',
      alignItems: 'center',
    },
    // Network Slider Container
    networkCardContainer: {
      width: SW(343),
      height: SH(154),
      borderRadius: SW(20),
      overflow: 'hidden',
      alignItems: 'center',
    },
    dots: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: SW(8),
      marginTop: SH(12),
    },
    heroDot: {
      width: SW(8),
      height: SW(8),
      borderRadius: SW(4),
      backgroundColor: theme.colors.gray200,
    },
    heroDotActive: {
      backgroundColor: theme.colors.DeepGreen,
      width: SW(24),
    },
    middleDot: {
      width: SW(8),
      height: SW(8),
      borderRadius: SW(4),
      backgroundColor: theme.colors.gray200,
    },
    middleDotActive: {
      backgroundColor: theme.colors.brightRed, // Red as requested
      width: SW(24),
    },
    networkDot: {
      width: SW(8),
      height: SW(8),
      borderRadius: SW(4),
      backgroundColor: theme.colors.gray200,
    },
    networkDotActive: {
      backgroundColor: theme.colors.red,
      width: SW(24),
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
      color: theme.colors.black,
      marginBottom: SH(10)
    },
    seeMore: {
      fontFamily: theme.fontfamily.robotoMedium,
      fontSize: SF(14),
      color: theme.colors.DeepGreen,
      textDecorationLine: 'underline',
    },

    // ── Service Cards 2x2 Grid ────────────────────────────────────────
    serviceGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SW(12),
    },

    serviceCard: {
      width: SW(164),
      borderRadius: SW(20),
      padding: SW(16),
      minHeight: SH(90),
      overflow: 'hidden',
      position: 'relative',
      elevation: 3,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
    },
    serviceCardDecorator: {
      position: 'absolute',
      top: SH(-9), // Exact from SS layout
      left: SW(-18), // Exact from SS layout
      width: SW(94), // Exact from SS layout
      height: SW(94), // Exact from SS layout
      borderRadius: SW(47), // Half of width for perfect circle
    },
    serviceTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(8),
      marginBottom: SH(12),
      zIndex: 1,
    },
    serviceIconWrap: {
      paddingHorizontal: SW(6),
      paddingVertical: SH(6),
      borderRadius: SW(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    serviceLabel: {
      flex: 1,
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(12),
    },
    serviceSub: {
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(9),
      color: theme.colors.textSecondary,
    },

    // ── Parts Card ────────────────────────────────────────────────────
    partCard: {
      width: SW(180),
      backgroundColor: theme.colors.white,
      borderRadius: SW(16),
      padding: SW(12),
      borderWidth: 1,
      borderColor: theme.colors.faintGray,
    },
    partImageWrap: {
      alignItems: 'center',
      marginBottom: SH(10),
    },
    partName: {
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(13),
      color: theme.colors.gray800,
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
      color: theme.colors.black,
    },
    partMrp: {
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
      color: theme.colors.gray400,
      textDecorationLine: 'line-through',
    },
    partDiscount: {
      fontFamily: theme.fontfamily.robotoMedium,
      fontSize: SF(12),
      color: theme.colors.greenSuccess,
    },

    // ── Categories ────────────────────────────────────────────────────
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      rowGap: SH(20),
      columnGap: SW(10),
    },
    categoryItem: {
      width: (SCREEN_WIDTH - SW(32) - SW(20)) / 3, // 3 columns, 2 gaps of SW(10)
      alignItems: 'center',
    },
    categoryImageWrap: {
      width: SW(72),
      height: SW(72),
      borderRadius: SW(14),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: SH(6),
      overflow: 'hidden',
    },
    categoryLabel: {
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(11),
      color: theme.colors.gray700,
      textAlign: 'center',
      lineHeight: SF(15),
    },

    // ── Ad Banner ─────────────────────────────────────────────────────
    adBannerWrap: {
      marginHorizontal: SW(16),
      marginBottom: SH(24),
      borderRadius: SW(16),
      overflow: 'hidden',
    },

    // ── Pro Banner Card (TOP ASSIST / BEST DEALS style) ───────────────
    proBannerCard: {
      borderRadius: SW(16),
      overflow: 'hidden',
      minHeight: SH(154),
    },
    proBannerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      paddingLeft: SW(16),
    },
    proBannerLeft: {
      flex: 1,
      paddingRight: SW(8),
      marginRight: SW(15)
    },
    proBannerBadge: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.white + '38',
      borderRadius: SW(6),
      paddingHorizontal: SW(8),
      paddingVertical: SH(3),
      marginBottom: SH(8),
    },
    proBannerBadgeText: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(11),
      letterSpacing: 1,
    },
    proBannerTitle: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(12),
      lineHeight: SF(22),
      marginBottom: SH(8),
    },
    proBannerTitleDark: {
      color: theme.colors.navyBlue,
    },
    proBannerBullets: {
      marginBottom: SH(12),
      gap: SH(4),
    },
    proBannerBullet: {
      color: theme.colors.white + 'E6',
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
      lineHeight: SF(15),
    },
    proBannerBulletDark: {
      color: theme.colors.gray600,
    },
    proBannerBtn: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.white,
      borderRadius: SW(6),
      paddingHorizontal: SW(14),
      paddingVertical: SH(6),
    },
    proBannerBtnText: {
      color: theme.colors.darkRed,
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(12),
    },
    proBannerImageWrap: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: SW(4),
    },

    // ── Middle Banner Styles ──────────────────────────────────────────
    middleBannerCard: {
      width: SW(343), // Fixed width to prevent collapse
      borderRadius: SW(16),
      overflow: 'hidden',
      minHeight: SH(154),
    },
    middleBannerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      paddingLeft: SW(16),
    },
    middleBannerLeft: {
      flex: 1,
      paddingRight: SW(8),
      marginRight: SW(15),
    },
    middleBannerBadge: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.white + '38',
      borderRadius: SW(6),
      paddingHorizontal: SW(8),
      paddingVertical: SH(3),
      marginBottom: SH(8),
    },
    middleBannerBadgeText: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(11),
      letterSpacing: 1,
    },
    middleBannerTitle: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(12),
      lineHeight: SF(22),
      marginBottom: SH(8),
    },
    middleBannerTitleDark: {
      color: theme.colors.navyBlue,
    },
    middleBannerBullets: {
      marginBottom: SH(12),
      gap: SH(4),
    },
    middleBannerBullet: {
      color: theme.colors.white + 'E6',
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
      lineHeight: SF(15),
    },
    middleBannerBulletDark: {
      color: theme.colors.gray600,
    },
    middleBannerBtn: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.white,
      borderRadius: SW(6),
      paddingHorizontal: SW(14),
      paddingVertical: SH(6),
    },
    middleBannerBtnText: {
      color: theme.colors.darkRed,
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(12),
    },
    middleBannerImageWrap: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: SW(4),
    },

    // ── Network Banner Styles ─────────────────────────────────────────
    networkBannerCard: {
      width: SW(343), // Fixed width to prevent collapse
      borderRadius: SW(16),
      overflow: 'hidden',
      minHeight: SH(154),
    },
    networkBannerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      paddingLeft: SW(16),
    },
    networkBannerLeft: {
      flex: 1,
      paddingRight: SW(8),
      marginRight: SW(15),
    },
    networkBannerBadge: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.white + '38',
      borderRadius: SW(6),
      paddingHorizontal: SW(8),
      paddingVertical: SH(3),
      marginBottom: SH(8),
    },
    networkBannerBadgeText: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(11),
      letterSpacing: 1,
    },
    networkBannerTitle: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(12),
      lineHeight: SF(22),
      marginBottom: SH(8),
    },
    networkBannerTitleDark: {
      color: theme.colors.navyBlue,
    },
    networkBannerBullets: {
      marginBottom: SH(12),
      gap: SH(4),
    },
    networkBannerBullet: {
      color: theme.colors.white + 'E6',
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
      lineHeight: SF(15),
    },
    networkBannerBulletDark: {
      color: theme.colors.gray600,
    },
    networkBannerBtn: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.white,
      borderRadius: SW(6),
      paddingHorizontal: SW(14),
      paddingVertical: SH(6),
    },
    networkBannerBtnText: {
      color: theme.colors.darkRed,
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(12),
    },
    networkBannerImageWrap: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: SW(4),
    },

    // ── How It Works ──────────────────────────────────────────────────
    videoThumb: {
      width: SW(200),
      height: SH(120),
      backgroundColor: theme.colors.grayLight,
      borderRadius: SW(16),
      alignItems: 'center',
      justifyContent: 'center',
    },
    playButton: {
      width: SW(48),
      height: SW(48),
      borderRadius: SW(24),
      backgroundColor: theme.colors.white + 'E6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    playIcon: {
      fontSize: SF(18),
      color: theme.colors.black,
      marginLeft: SW(4),
    },
    stepsCard: {
      backgroundColor: theme.colors.white,
      borderRadius: SW(20),
      padding: SW(24),
      borderWidth: 1,
      borderColor: theme.colors.borderFaint,
    },
    stepsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(12),
      marginBottom: SH(24),
    },
    stepsBorderLeft: {
      width: SW(3),
      height: SH(28),
      backgroundColor: theme.colors.primaryRed,
      borderRadius: SW(2),
    },
    stepsTitle: {
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(16),
      color: theme.colors.black,
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
      backgroundColor: theme.colors.darkSlaty, // Dark gray/black badge
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
      color: theme.colors.black,
      marginBottom: SH(6),
    },
    stepDesc: {
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
      color: theme.colors.textSecondary,
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
      color: theme.colors.gray600,
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
      shadowColor: theme.colors.black,
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
      backgroundColor: theme.colors.faintGray,
    },
    mechanicName: {
      fontFamily: theme.fontfamily.robotoBold,
      fontSize: SF(14),
      color: theme.colors.black,
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
      color: theme.colors.gray500,
    },
    mechanicPrice: {
      backgroundColor: theme.colors.black,
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
      backgroundColor: theme.colors.darkGray,
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
      color: theme.colors.GoldenYellow,
      fontSize: SF(14),
    },
    ratingText: {
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
      color: theme.colors.textSecondary,
    },
  });
