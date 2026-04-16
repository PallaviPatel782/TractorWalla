import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { Text, SecondaryHeader, ScreenWrapper, View, ScrollView, TouchableOpacity } from '@components';
import { createStyles } from './styles';

const FaqScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  
  const FAQ_DATA = useMemo(() => t('main.profile.faq_data', { returnObjects: true }) as any[], [t]);

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.profile.faq')}
          onBack={() => navigation.goBack()}
        />


        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {FAQ_DATA.map((item, index) => {
            const isExpanded = expandedId === index;
            return (
              <View key={index} style={styles.faqItem}>
                <TouchableOpacity
                   style={styles.questionRow}
                   onPress={() => toggleExpand(index)}
                   activeOpacity={0.7}
                >
                  <Text style={styles.questionText}>{item.question}</Text>
                  <Text style={[styles.arrowIcon, { transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }]}>
                    ▾
                  </Text>
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default FaqScreen;
