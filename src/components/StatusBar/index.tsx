import React from 'react';
import { StatusBar, StatusBarStyle, Platform, View } from 'react-native';

interface CommonStatusBarProps {
  backgroundColor?: string;
  barStyle?: StatusBarStyle;
  translucent?: boolean;
}

const CommonStatusBar: React.FC<CommonStatusBarProps> = ({
  backgroundColor = '#ffffff',
  barStyle = 'dark-content',
  translucent = false,
}) => {
  if (Platform.OS === 'android') {
    return (
      <View>
        <StatusBar
          translucent={translucent}
          backgroundColor={backgroundColor}
          barStyle={barStyle}
        />
      </View>
    );
  }

  return <StatusBar barStyle={barStyle} />;
};

export default CommonStatusBar;
