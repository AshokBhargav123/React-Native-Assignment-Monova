
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const FILTERS = [
  { key: "Type", label: "Type" },
  { key: "Style", label: "Style" },
  { key: "Mood", label: "Mood" },
  { key: "Color", label: "Color" },
];

export default function FilterBar({ active, onToggle }) {
  return (
    <View style={styles.wrap} accessible accessibilityRole="toolbar">
      <View style={styles.row}>
        {FILTERS.map((f) => {
          const isActive = active.includes(f.key);
          return (
            <Pressable
              key={f.key}
              onPress={() => onToggle(f.key)}
              style={[styles.chip, isActive && styles.chipActive]}
              accessibilityRole="button"
              accessibilityLabel={`Filter ${f.label}`}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {f.label}
              </Text>
              <Text style={[styles.dropdownIcon, isActive && styles.dropdownIconActive]}>
                ▾
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 16 },
  row: { flexDirection: "row", gap: 12, flexWrap: "wrap" },
  chip: {
    backgroundColor: "#F8F7F6",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 36,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  chipActive: {
    backgroundColor: "#F4D9D0",
  },
  chipText: { 
    fontWeight: "600", 
    color: "#7A6A63",
    marginRight: 6,
  },
  chipTextActive: { 
    color: "#333" 
  },
  dropdownIcon: {
    fontSize: 12,
    color: "#7A6A63",
  },
  dropdownIconActive: {
    color: "#333",
  },
});