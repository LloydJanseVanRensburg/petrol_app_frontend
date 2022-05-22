import {StyleSheet, View, Dimensions, FlatList} from 'react-native';
import React, {useMemo} from 'react';
import {Typography} from 'channels-components/components';
import MenuCard from '../components/MenuCard';
import {useThemeProvider} from '../channels-components/apis';
import HeaderStatsInfo from '../components/HeaderStatsInfo';

const HomeScreen = ({navigation}) => {
  const MENU_ITEMS = [
    {
      id: 'm1',
      title: 'Add Entry',
      cb: () => {
        navigation.navigate('AddEntryScreen');
      },
    },
    {
      id: 'm2',
      title: 'All Entries',
      cb: () => {
        navigation.navigate('AllEntriesScreen');
      },
    },
  ];

  const theme = useThemeProvider();

  const handleRenderMenuItem = itemData => {
    return <MenuCard data={itemData.item} />;
  };

  const styles = useMemo(() => {
    const windowWidth = Dimensions.get('window').height;

    return StyleSheet.create({
      screen: {
        flex: 1,
      },
      headerOuter: {
        width: '100%',
        height: windowWidth * 0.35,
        backgroundColor: theme.colors.primary,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        padding: 16,
      },
      headerText: {
        color: theme.text.light,
        marginBottom: 8,
      },
      headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
      },
      headerLoader: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerInfoItem: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.3)',
      },
      headerInfoItemLeft: {
        marginRight: 8,
      },
      headerInfoItemRight: {
        marginLeft: 8,
      },
      headerInfoText: {
        color: theme.text.light,
        textAlign: 'center',
      },
      root: {
        flex: 1,
        padding: 16,
      },
    });
  }, [theme]);

  return (
    <View style={styles.screen}>
      <View style={styles.headerOuter}>
        <View style={styles.headerInner}>
          <Typography variant="h3" style={styles.headerText}>
            Welcome Back
          </Typography>
          <Typography variant="h2" style={styles.headerText}>
            Lloyd Janse van Rensburg
          </Typography>

          <HeaderStatsInfo />
        </View>
      </View>

      <View style={styles.root}>
        <FlatList
          data={MENU_ITEMS}
          renderItem={handleRenderMenuItem}
          keyExtractor={(item, index) => item.id}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
