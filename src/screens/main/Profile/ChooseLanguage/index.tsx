import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  Text,
  Button,
  SecondaryHeader,
  ScreenWrapper,
  View,
  ScrollView,
  TouchableOpacity
} from '@components';
import { createStyles } from './styles';

const ChooseLanguage = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const styles = createStyles(theme);

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const languages = [
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'हिंदी' },
  ];

  const handleApply = () => {
    i18n.changeLanguage(selectedLanguage);
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.language.title')}
          onBack={() => navigation.goBack()}
        />


        <ScrollView contentContainerStyle={styles.content}>
          {languages.map((lang) => {
            const isSelected = selectedLanguage === lang.id;
            return (
              <TouchableOpacity
                key={lang.id}
                style={styles.optionContainer}
                onPress={() => setSelectedLanguage(lang.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.languageText}>{lang.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.bottomContainer}>
          <Button
            title={t('common.apply')}
            onPress={handleApply}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ChooseLanguage;
