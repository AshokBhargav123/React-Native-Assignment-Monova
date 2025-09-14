import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  Pressable,
  ScrollView,
} from "react-native";

import { ITEMS, OUTFITS } from "./data";
import ItemCard from "./components/ItemCard";
import OutfitCard from "./components/OutfitCard";
import FilterBar from "./components/FilterBar";

const { width } = Dimensions.get("window");

// Collections data
const COLLECTIONS = [
  { id: "add-new", name: "Add new", icon: "➕" },
  { id: "work", name: "Work", icon: "💼" },
  { id: "leisure", name: "Leisure", icon: "🎮" },
  { id: "des", name: "Des", icon: "🖥️" },
];

export default function App() {
  const [tab, setTab] = useState("Items");
  const [activeFilters, setActiveFilters] = useState([]);
  const [loading, setLoading] = useState(false);

  // entrance animation
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(fade, { toValue: 1, useNativeDriver: true, friction: 9 }).start();
  }, [fade]);

  const toggleFilter = (f) => {
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((p) => p !== f) : [...prev, f]
    );
  };

  const handleCollectionPress = (col) => {
    if (col.id === "add-new") {
      console.log("Add new collection clicked!");
      // you can open a modal or navigate here
      return;
    }
    toggleFilter(col.name); // use collection name as filter
  };

  const filteredItems = useMemo(() => {
    if (activeFilters.length === 0) return ITEMS;
    return ITEMS.filter((it) =>
      activeFilters.every(
        (f) => it.tags.includes(f) || it.color === f || it.style === f
      )
    );
  }, [activeFilters]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Saved</Text>
      </View>

      <View style={styles.tabRow}>
        {["Collections", "Outfits", "Items"].map((t) => (
          <Pressable
            key={t}
            accessibilityRole="button"
            accessibilityLabel={`Open ${t}`}
            onPress={() => setTab(t)}
            style={[styles.tabButton, tab === t && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      {/* Only show FilterBar for Items tab */}
      {tab === "Items" && (
        <FilterBar active={activeFilters} onToggle={toggleFilter} />
      )}

      <Animated.View style={{ flex: 1, opacity: fade }}>
        {tab === "Items" && (
          <>
            {loading ? (
              <View style={styles.placeholderContainer}>
                <Text style={{ color: "#999" }}>Loading items...</Text>
              </View>
            ) : (
              <FlatList
                data={filteredItems}
                keyExtractor={(i) => i.id}
                contentContainerStyle={styles.itemsGrid}
                numColumns={2}
                renderItem={({ item, index }) => (
                  <ItemCard item={item} index={index} />
                )}
                showsVerticalScrollIndicator={false}
              />
            )}
          </>
        )}

        {tab === "Outfits" && (
          <FlatList
            data={OUTFITS}
            keyExtractor={(o) => o.id}
            contentContainerStyle={styles.outfitsList}
            renderItem={({ item }) => <OutfitCard outfit={item} />}
            showsVerticalScrollIndicator={false}
          />
        )}

        {tab === "Collections" && (
          <ScrollView
            style={styles.collectionsContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.collectionsContent}
          >
            {/* Collection Categories */}
            <View style={styles.collectionsRow}>
              {COLLECTIONS.map((collection) => (
                <Pressable
                  key={collection.id}
                  style={[
                    styles.collectionItem,
                    activeFilters.includes(collection.name) &&
                      collection.id !== "add-new" && {
                        backgroundColor: "#F4D9D0",
                        borderColor: "#E0B7A4",
                      },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={collection.name}
                  onPress={() => handleCollectionPress(collection)}
                >
                  <Text style={styles.collectionName}>
                    {collection.icon} {collection.name}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Outfit Images */}
            <View style={styles.collectionSection}>
              
              <View style={styles.collectionOutfitsList}>
                {OUTFITS.map((outfit) => (
                  <OutfitCard
                    key={`col-outfit-${outfit.id}`}
                    outfit={outfit}
                    compact
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </Animated.View>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navBtn}
          accessible
          accessibilityRole="button"
        >
          <Text>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBtn}
          accessible
          accessibilityRole="button"
        >
          <Text>⬛</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBtn}
          accessible
          accessibilityRole="button"
        >
          <Text>🔖</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF7F6", paddingHorizontal: 14 },
  headerRow: { marginTop: 8 },
  title: { fontSize: 28, fontWeight: "800", color: "#111" },
  tabRow: { flexDirection: "row", marginTop: 12, gap: 8 },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#F0E8E6",
  },
  tabActive: { backgroundColor: "#fff", borderColor: "#F4D9D0" },
  tabText: { color: "#8C7770", fontWeight: "600" },
  tabTextActive: { color: "#111" },
  itemsGrid: { paddingTop: 12, paddingBottom: 20, gap: 12 },
  outfitsList: { paddingTop: 12, paddingBottom: 80, gap: 18 },
  collectionsContainer: {
    flex: 1,
    paddingTop: 12,
  },
  collectionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  collectionItem: {
    backgroundColor: "#fff",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F0E8E6",
  },
  collectionName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7A6A63",
  },
  placeholderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomNav: {
    position: "absolute",
    bottom: 14,
    left: 14,
    right: 14,
    height: 56,
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    paddingHorizontal: 8,
  },
  navBtn: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});
