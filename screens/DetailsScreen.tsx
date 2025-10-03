import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;

export default function DetailsScreen({ route }: { route: DetailsScreenRouteProp }) {
  const { coin } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {coin.name} ({coin.symbol.toUpperCase()})
      </Text>
      <Text>Current Price: ${coin.current_price}</Text>
      <Text>24h High: ${coin.high_24h}</Text>
      <Text>24h Low: ${coin.low_24h}</Text>
      <Text>Market Cap: ${coin.market_cap}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});
