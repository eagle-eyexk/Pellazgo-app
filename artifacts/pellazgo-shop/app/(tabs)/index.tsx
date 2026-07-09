import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const CATEGORIES = ["All", "New In", "Apparel", "Footwear", "Accessories"];

const PLACEHOLDER_PRODUCTS = [
  { id: "1", name: "Essential Tee", price: "$28" },
  { id: "2", name: "Everyday Hoodie", price: "$54" },
  { id: "3", name: "Street Sneaker", price: "$89" },
  { id: "4", name: "Canvas Tote", price: "$22" },
];

export default function ShopHomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = React.useState("All");

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + 32 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.brand, { color: colors.foreground }]}>
            Pellazgo
          </Text>
          <Text style={[styles.tagline, { color: colors.mutedForeground }]}>
            Shop is coming soon
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.cartButton, { backgroundColor: colors.secondary }]}
          activeOpacity={0.7}
        >
          <Feather name="shopping-bag" size={20} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.banner,
          { backgroundColor: colors.primary, borderRadius: colors.radius },
        ]}
      >
        <Text style={[styles.bannerTitle, { color: colors.primaryForeground }]}>
          Something new is on the way
        </Text>
        <Text
          style={[styles.bannerSubtitle, { color: colors.primaryForeground }]}
        >
          We're getting the storefront ready. Check back soon for drops and
          exclusive releases.
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryRow}
        contentContainerStyle={styles.categoryRowContent}
      >
        {CATEGORIES.map((category) => {
          const isActive = category === activeCategory;
          return (
            <TouchableOpacity
              key={category}
              onPress={() => setActiveCategory(category)}
              activeOpacity={0.7}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: isActive ? colors.primary : colors.secondary,
                  borderRadius: colors.radius,
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryLabel,
                  {
                    color: isActive
                      ? colors.primaryForeground
                      : colors.secondaryForeground,
                  },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        Preview
      </Text>

      <View style={styles.grid}>
        {PLACEHOLDER_PRODUCTS.map((product) => (
          <View
            key={product.id}
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: colors.radius,
              },
            ]}
          >
            <View
              style={[
                styles.cardImagePlaceholder,
                {
                  backgroundColor: colors.muted,
                  borderRadius: colors.radius - 4,
                },
              ]}
            >
              <Feather name="image" size={22} color={colors.mutedForeground} />
            </View>
            <Text
              style={[styles.cardTitle, { color: colors.cardForeground }]}
              numberOfLines={1}
            >
              {product.name}
            </Text>
            <Text style={[styles.cardPrice, { color: colors.mutedForeground }]}>
              {product.price}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={[
          styles.notifyCard,
          { backgroundColor: colors.secondary, borderRadius: colors.radius },
        ]}
      >
        <Feather name="bell" size={18} color={colors.secondaryForeground} />
        <Text
          style={[styles.notifyText, { color: colors.secondaryForeground }]}
        >
          We'll let you know the moment Pellazgo Shop opens.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    fontSize: 26,
    fontWeight: "700",
  },
  tagline: {
    fontSize: 13,
    marginTop: 2,
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    padding: 20,
    gap: 8,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  bannerSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.92,
  },
  categoryRow: {
    marginHorizontal: -20,
  },
  categoryRowContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    width: "47%",
    borderWidth: 1,
    padding: 12,
    gap: 8,
  },
  cardImagePlaceholder: {
    width: "100%",
    height: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: "500",
  },
  notifyCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 16,
  },
  notifyText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
});
