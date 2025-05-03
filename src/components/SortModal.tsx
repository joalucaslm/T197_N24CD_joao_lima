import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SortModalType } from "@/interface/SortModal";

const colors = {
  black: "#000",
  white: "#FFF",
  yellow: "#EEAD2D",
  lightGray: "#E0E0E0",
  darkGray: "#707070",
};

export default function SortModal({
  visible,
  orderBy,
  sortOptions,
  setOrderBy,
  closeModal,
}: SortModalType) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Ordenar por</Text>
            <TouchableOpacity onPress={closeModal}>
              <AntDesign name="close" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.filterOption,
                  orderBy === option.value && styles.filterOptionSelected,
                ]}
                onPress={() => {
                  setOrderBy(option.value);
                  closeModal();
                }}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    orderBy === option.value && styles.filterOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
                {orderBy === option.value && (
                  <AntDesign name="check" size={16} color={colors.yellow} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalBody: {
    padding: 20,
  },
  filterOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  filterOptionSelected: {
    backgroundColor: "rgba(238, 173, 45, 0.1)",
  },
  filterOptionText: {
    fontSize: 14,
    color: colors.darkGray,
  },
  filterOptionTextSelected: {
    color: colors.black,
    fontWeight: "500",
  },
});
