export const typography = {
  fonts: {
    // Poppins Font Family
    poppinsThin:           'Poppins-Light', // Fallback as Thin not provided
    poppinsExtraLight:     'Poppins-Light',
    poppinsLight:          'Poppins-Light',
    poppinsRegular:        'Poppins-Regular',
    poppinsMedium:         'Poppins-Medium',
    poppinsSemiBold:       'Poppins-SemiBold',
    poppinsBold:           'Poppins-Bold',
    poppinsExtraBold:      'Poppins-Bold',
    poppinsBlack:          'Poppins-Bold',
    poppinsItalic:         'Poppins-Italic',

    // Roboto Font Family
    robotoThin:     'Roboto-Thin',
    robotoLight:    'Roboto-Light',
    robotoRegular:  'Roboto-Regular',
    robotoMedium:   'Roboto-Medium',
    robotoSemiBold: 'Roboto-SemiBold',
    robotoBold:     'Roboto-Bold',
  },
  sizes: {
    xxs: 8,
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 22,
    displaySm: 24,
    displayMd: 28,
    displayLg: 32,
  },
};

export type FontWeightType =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type FontStyleType = 'normal' | 'italic';

export const fontMap: Record<
  FontWeightType,
  { normal: string; italic: string }
> = {
  '100': {
    normal: typography.fonts.robotoThin,
    italic: typography.fonts.poppinsItalic,
  },
  '200': {
    normal: typography.fonts.poppinsLight,
    italic: typography.fonts.poppinsItalic,
  },
  '300': {
    normal: typography.fonts.poppinsLight,
    italic: typography.fonts.poppinsItalic,
  },
  '400': {
    normal: typography.fonts.poppinsRegular,
    italic: typography.fonts.poppinsItalic,
  },
  '500': {
    normal: typography.fonts.poppinsMedium,
    italic: typography.fonts.poppinsItalic,
  },
  '600': {
    normal: typography.fonts.poppinsSemiBold,
    italic: typography.fonts.poppinsItalic,
  },
  '700': {
    normal: typography.fonts.poppinsBold,
    italic: typography.fonts.poppinsItalic,
  },
  '800': {
    normal: typography.fonts.poppinsBold,
    italic: typography.fonts.poppinsItalic,
  },
  '900': {
    normal: typography.fonts.poppinsBold,
    italic: typography.fonts.poppinsItalic,
  },
};

export const defaultTextStyle = {
  fontFamily: typography.fonts.poppinsRegular,
  fontSize: typography.sizes.md,
};