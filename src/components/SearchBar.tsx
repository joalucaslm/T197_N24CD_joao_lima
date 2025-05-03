import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SearchBarType } from "@/interface/SearchBar";

const colors = {
  black: "#000",
  white: "#FFF",
  yellow: "#EEAD2D",
  gray: "#F2F2F2",
  lightGray: "#E0E0E0",
  darkGray: "#707070",
};

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: SearchBarType) {
  return (
    <View style={styles.searchContainer}>
      <Feather
        name="search"
        size={20}
        color={colors.darkGray}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar processo, cliente ou assunto..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 45,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: "100%",
  },
});
