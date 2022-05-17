import {StyleSheet, View} from 'react-native';
import React, {forwardRef, useMemo} from 'react';
import {Input, Typography} from 'channels-components/components';
import {useThemeProvider} from 'channels-components/apis';

const FormInputGroup = forwardRef(({label, isTouched, error, ...rest}, ref) => {
  const theme = useThemeProvider();

  const styles = useMemo(() => {
    return StyleSheet.create({
      error_message: {
        color: theme.colors.error,
      },
      error_borders: {
        borderColor: theme.colors.error,
      },
    });
  }, [theme]);

  return (
    <View style={styles.spacing}>
      <Typography variant="body1">{label}</Typography>

      <Input
        ref={ref}
        {...rest}
        style={isTouched && error ? styles.error_borders : null}
      />

      {isTouched && error && (
        <Typography variant="body2" style={styles.error_message}>
          {error}
        </Typography>
      )}
    </View>
  );
});

export default FormInputGroup;
