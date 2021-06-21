import * as React from "react";
import { View, Text, Image } from "react-native";
import styles from "./Card.styles";

const Card = ({ card, style }: any) => (
  <View style={[style, styles.card]}>
    <Image style={styles.image} source={card.photo} resizeMode="cover" />
    <View style={styles.photoDescriptionContainer}>
      <Text style={styles.text}>{`${card.name}`}</Text>
    </View>
  </View>
);

export default Card;
