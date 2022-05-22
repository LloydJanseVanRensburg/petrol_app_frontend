import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import useEntries from '../../hooks/useEntries';
import {useThemeProvider} from 'channels-components/apis';
import {Typography} from 'channels-components/components';

const HeaderStatsInfo = () => {
  const theme = useThemeProvider();

  const {isLoading, data} = useEntries();

  const calculateTotalCost = () => {
    const {data: entriesData} = data;
    if (entriesData) {
      return entriesData.reduce((acc, cur) => acc + cur.attributes.amount, 0);
    }
    return 0;
  };

  const calculateTotalKmPerLiter = () => {
    console.log(data);
    const {data: entriesData} = data;
    if (entriesData) {
      return Math.round(
        entriesData.reduce(
          (acc, cur) => acc + cur.attributes.kilos_per_liter,
          0,
        ) / entriesData.length,
      );
    }
    return 0;
  };

  return (
    <View>
      {isLoading ? (
        <View style={styles.headerLoader}>
          <ActivityIndicator size="large" color={theme.text.light} />
        </View>
      ) : (
        <View style={styles.headerInfo}>
          <View style={[styles.headerInfoItem, styles.headerInfoItemLeft]}>
            <Typography style={styles.headerInfoText}>Total Cost</Typography>
            <Typography style={styles.headerInfoText}>
              R {calculateTotalCost()}
            </Typography>
          </View>

          <View style={[styles.headerInfoItem, styles.headerInfoItemRight]}>
            <Typography style={styles.headerInfoText}>Km per Liter</Typography>
            <Typography style={styles.headerInfoText}>
              {calculateTotalKmPerLiter()} km/l
            </Typography>
          </View>
        </View>
      )}
    </View>
  );
};

export default HeaderStatsInfo;

const styles = StyleSheet.create({});
