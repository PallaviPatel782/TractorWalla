import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { Text, SecondaryHeader, ScreenWrapper, View, Button, ScrollView } from '@components';
import { createStyles } from './styles';

const JoinTeam = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.about_menu.join_team')}
          onBack={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.textContent}>
            <Text variant="semiBold" size={18} color={theme.colors.gray900} style={{ marginBottom: 12 }}>
              {t('main.join_team.title')}
            </Text>
            <Text variant="regular" size={14} color={theme.colors.gray600} style={{ lineHeight: 22 }}>
              {t('main.join_team.description')}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={t('main.join_team.button')}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default JoinTeam;
