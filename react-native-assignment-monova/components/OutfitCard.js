import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, Animated, Pressable } from "react-native";

const { width } = Dimensions.get("window");
const CARD_W = width - 28;

export default function OutfitCard({ outfit, compact }) {
  const slide = useRef(new Animated.Value(24)).current;
  const opa = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slide, { toValue: 0, useNativeDriver: true, friction: 9 }).start();
    Animated.timing(opa, { toValue: 1, duration: 260, useNativeDriver: true }).start();
  }, [slide, opa]);

  // Helper to handle local or remote images
  const getImageSource = (img) => (typeof img === "string" ? { uri: img } : img);

  return (
    <Animated.View
      style={[
        styles.card,
        compact && styles.compact,
        { transform: [{ translateY: slide }], opacity: opa },
      ]}
    >
      <Pressable style={styles.inner} accessibilityRole="button">
        <View style={styles.grid}>
          <View style={styles.bigImage}>
            <Image source={getImageSource(outfit.images[0])} style={styles.img} />
          </View>
          <View style={styles.rightCol}>
            <Image source={getImageSource(outfit.images[1])} style={styles.smallImg} />
            <Image source={getImageSource(outfit.images[2])} style={styles.smallImg} />
          </View>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.title}>{outfit.title}</Text>
          <View style={styles.tagRow}>
            {outfit.tags.map((t) => (
              <View key={t} style={styles.tag}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    width: CARD_W,
    alignSelf: "center",
  },
  compact: { width: (width - 28) / 1.02 },
  inner: {},
  grid: { flexDirection: "row", gap: 15 },
  bigImage: { flex: 1, borderRadius: 12, overflow: "hidden" },
  rightCol: { width: 150, justifyContent: "space-between" },
  img: { width: "100%", height: 250 },
  smallImg: { width: "95%", height: 120, borderRadius: 8, overflow: "hidden" },
  bottom: { marginTop: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontWeight: "700", fontSize: 16 },
  tagRow: { flexDirection: "row", gap: 6 },
  tag: {
    backgroundColor: "#F8F7F6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  tagText: { fontWeight: "600", color: "#7A6A63" },
});
