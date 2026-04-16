import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { Text, SecondaryHeader, ScreenWrapper, Input, Button, View, ScrollView, TouchableOpacity } from '@components';
import { createStyles } from './styles';
import { EditIcon } from '@assets/icons'; // Assuming an edit pencil icon exists
import { SW } from '@utils/Dimensions';

const UpdateProfileScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);


  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.profile.updateProfile.title')}
          onBack={() => navigation.goBack()}
        />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=11' }} // Placeholder face
                style={styles.avatarImage}
              />
              <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
                <EditIcon size={SW(14)} color={theme.colors.white} />
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <View>
                <View style={styles.inputLabelRow}>
                  <Text style={styles.inputLabel}>{t('main.profile.updateProfile.fullName')}</Text>
                  <Text style={styles.asterisk}>*</Text>
                </View>
                <Input
                  placeholder={t('main.profile.updateProfile.placeholderName')}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <View>
                <View style={styles.inputLabelRow}>
                  <Text style={styles.inputLabel}>{t('main.profile.updateProfile.email')}</Text>
                </View>
                <Input
                  placeholder={t('main.profile.updateProfile.placeholderEmail')}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Button
              title={t('main.profile.updateProfile.button')}
              onPress={() => navigation.goBack()}
              style={styles.updateButton}
              disabled={!fullName.trim()}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScreenWrapper>
  );
};

export default UpdateProfileScreen;
