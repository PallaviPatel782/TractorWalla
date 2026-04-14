import React from 'react';
import { 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard, 
  StyleSheet, 
  ViewStyle 
} from 'react-native';

interface KeyboardWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const KeyboardWrapper: React.FC<KeyboardWrapperProps> = ({ children, style }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, style]}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        bounces={false} 
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
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
