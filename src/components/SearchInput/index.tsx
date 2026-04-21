import React, { memo } from 'react';
import { TextInputProps } from '../TextInput';
import Input from '../TextInput';
import { SearchIcon } from '@assets/icons';
import { useTheme } from '@theme';
import { SW } from '@utils/Dimensions';

const SearchInput: React.FC<TextInputProps> = (props) => {
  const { theme } = useTheme();
  
  return (
    <Input
      leftIcon={<SearchIcon size={SW(18)} color={theme.colors.gray500} />}
      {...props}
    />
  );
};

export default memo(SearchInput);
