import products from "@/assets/data/products";
import Badge from "@/src/components/Badge";
import Button from "@/src/components/Button";
import SelectSize from "@/src/components/SelectSize";
import { Product } from "@/src/type";
import { useAppDispatch, useAppSelector } from "@/src/utils/hooks";
import { priceTag } from "@/src/utils/priceTag";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { toast } from "../../../utils/toast";
import { SafeAreaView } from "react-native-safe-area-context";
import { addToCart, selectSize } from "../../features/slices/cartSlice";
import CartDetails from "@/src/components/CartDetails";
import { sizes } from "@/assets/data/products";

const ProductDetail = () => {
  const { id, update } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    totalAmount,
    totalQuantity,
    sizes: selected,
  } = useAppSelector((state) => state.cart);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const cartItem = cartItems.find((p) => p.id === product?.id);
  const handleSelected = (size: string) => {
    if (!product) return;
    dispatch(selectSize({ size, product }));
    updateSize();
  };
  function updateSize() {
    if (update) {
      router.push("/cart");
    }
  }

  if (!product) return <Text>Oops product does not exists</Text>;
  function addProductToCart(product: Product) {
    if (!product) return;
    dispatch(addToCart({ product, size: selected }));

    toast();

    router.push("/cart");
  }

  return (
    <SafeAreaView className="bg-primary flex-1 px-4 space-y-6">
      <View className="bg-transparent w-full items-center space-y-6">
        <Stack.Screen
          options={{
            title: `${product.name}`,
          }}
        />
        <Image
          source={{ uri: product.image }}
          resizeMode="contain"
          className="w-full aspect-square mb-7"
        />

        <Badge price={product.price} />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
