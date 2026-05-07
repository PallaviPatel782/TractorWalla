import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  ViewStyle
} from 'react-native';

interface KeyboardWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  keyboardVerticalOffset?: number;
}

const KeyboardWrapper: React.FC<KeyboardWrapperProps> = ({
  children,
  style,
  keyboardVerticalOffset = 0
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, style]}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default KeyboardWrapper;
