import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Pressable,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_W = (width - 28 - 12) / 2; // Account for padding and gap

export default function ItemCard({ item, index }) {
  const slide = useRef(new Animated.Value(30)).current;
  const opa = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slide, {
      toValue: 0,
      useNativeDriver: true,
      friction: 9,
    }).start();
    Animated.timing(opa, {
      toValue: 1,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [slide, opa]);

  return (
    <Animated.View
      style={[
        styles.card,
        { transform: [{ translateY: slide }], opacity: opa },
      ]}
    >
      <Pressable accessibilityRole="imagebutton" style={styles.inner}>
        {/* Bookmark icon */}
        <View style={styles.bookmarkContainer}>
          <View style={styles.bookmark}>
            <Text style={styles.bookmarkIcon}>🔖</Text>
          </View>
        </View>
        
        <View style={styles.imageWrap}>
          <Image
            source={
              typeof item.image === "string"
                ? { uri: item.image }
                : item.image
            }
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel={item.title}
          />
        </View>
        
        <View style={styles.meta}>
          <View style={styles.tagRow}>
            {item.tags?.[0] && (
              <View style={styles.colorIndicator}>
                <View style={[styles.colorDot, { backgroundColor: getColorFromTag(item.tags[0]) }]} />
                <Text style={styles.tagText}>{item.tags[0]}</Text>
              </View>
            )}
          </View>
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

// Helper function to get color based on tag
function getColorFromTag(tag) {
  const colorMap = {
    'Crop': '#FF69B4',
    'Knit': '#8B4513',
    'Printed': '#4169E1', 
    'Striped': '#D2691E',
    'Denim': '#1E90FF',
    'Wide Leg': '#8B4513',
    'Golden': '#FFD700',
    'Dress': '#32CD32',
    'Top': '#708090',
    'Bag': '#8B4513',
  };
  return colorMap[tag] || '#999';
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    width: CARD_W,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  inner: { 
    position: "relative",
  },
  bookmarkContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
  },
  bookmark: {
    width: 24,
    height: 24,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  bookmarkIcon: {
    fontSize: 12,
  },
  imageWrap: {
    backgroundColor: "#f5f5f5",
    height: 140,
    overflow: "hidden",
  },
  image: { 
    width: "100%", 
    height: "100%" 
  },
  meta: { 
    padding: 12,
    paddingTop: 8,
  },
  tagRow: { 
    marginBottom: 6,
  },
  colorIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tagText: { 
    fontSize: 12, 
    color: "#7A6A63", 
    fontWeight: "600" 
  },
  title: { 
    fontWeight: "600", 
    color: "#333", 
    fontSize: 14,
    lineHeight: 18,
  },
});