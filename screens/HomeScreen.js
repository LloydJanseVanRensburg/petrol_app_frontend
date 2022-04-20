import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useMemo, useState, useContext} from 'react';
import {Typography} from '../channels-components/components';
import MenuCard from '../components/MenuCard';
import {useThemeProvider} from '../channels-components/apis';
import qs from 'qs';
import {API_URL} from '../config/config';
import {EntriesContext} from '../context/entries/EntriesProvider';

const HomeScreen = ({navigation}) => {
  const {entries} = useContext(EntriesContext);

  const [total, setTotal] = useState(0);
  const [liters, setLiters] = useState(0);
  const [loading, setLoading] = useState(false);

  const theme = useThemeProvider();

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
    {
      id: 'm3',
      title: 'Logout',
      cb: () => {
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      },
    },
  ];

  const handleRenderMenuItem = itemData => {
    return <MenuCard data={itemData.item} />;
  };

  useEffect(() => {
    const query = qs.stringify({
      fields: ['amount', 'liters', 'kilos_per_liter'],
    });

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/entries?${query}`);
        const data = await res.json();

        if (!res.ok) {
          console.log('Something went wrong');
          setLoading(false);
          return;
        }

        if (data.data.length > 0) {
          const totalAmount = data.data.reduce(
            (acc, entry) => entry.attributes.amount + acc,
            0,
          );

          const litersAmount = data.data.reduce(
            (acc, entry) => entry.attributes.kilos_per_liter + acc,
            0,
          );
          const kilos_per_liter = litersAmount / data.data.length;

          setTotal(totalAmount);
          setLiters(Math.ceil(kilos_per_liter));
        }

        setLoading(false);
      } catch (err) {
        setLoading(true);
        console.log(err);
      }
    };

    fetchData();
  }, [entries]);

  const styles = useMemo(() => {
    const windowWidth = Dimensions.get('window').height;

    return StyleSheet.create({
      screen: {
        flex: 1,
      },
      headerOuter: {
        width: '100%',
        height: windowWidth * 0.35,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.primary,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
      },
      headerInner: {
        paddingHorizontal: 16,
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
        padding: 16,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerInfoItem: {
        flex: 1,
        padding: 16,
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

          <View>
            {loading ? (
              <View style={styles.headerLoader}>
                <ActivityIndicator size="large" color={theme.text.light} />
              </View>
            ) : (
              <View style={styles.headerInfo}>
                <View
                  style={[styles.headerInfoItem, styles.headerInfoItemLeft]}>
                  <Typography style={styles.headerInfoText}>
                    Total Cost
                  </Typography>
                  <Typography style={styles.headerInfoText}>
                    R {total}
                  </Typography>
                </View>

                <View
                  style={[styles.headerInfoItem, styles.headerInfoItemRight]}>
                  <Typography style={styles.headerInfoText}>
                    Km per Liter
                  </Typography>
                  <Typography style={styles.headerInfoText}>
                    {liters} km/l
                  </Typography>
                </View>
              </View>
            )}
          </View>
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
