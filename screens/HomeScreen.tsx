import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
};

export default function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto Tracker</Text>
      <FlatList
        data={coins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Details", { coin: item })}
          >
            <Text style={styles.coinName}>
              {item.name} ({item.symbol.toUpperCase()})
            </Text>
            <Text>${item.current_price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  coinName: { fontWeight: "bold" },
});
