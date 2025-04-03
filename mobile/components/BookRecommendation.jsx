import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import styles from "../assets/styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { API_URL } from "../constants/api";

export default function BookRecommendation({
  item,
  books,
  setBooks,
  token,
  setDeleteBookId,
  deleteBookId,
}) {
  //   const router = useRouter();
  const renderRatingStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= item.rating ? "star" : "star-outline"}
          size={14}
          color={i <= item.rating ? "#f4b400" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  const deleteBook = async (bookId) => {
    try {
      setDeleteBookId(bookId);
      const res = await fetch(`${API_URL}/book/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setBooks(books.filter((book) => book._id !== bookId));
      Alert.alert("Success", "Recommendation Book deleted");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to delete recommendation");
    } finally {
      setDeleteBookId(null);
    }
  };
  const confirmDelete = (bookId) => {
    Alert.alert(
      "Delete Book",
      "Are you sure you want to delete this recommendation?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => await deleteBook(bookId),
          style: "destructive",
        },
      ]
    );
  };
  return (
    <View style={styles.bookItem}>
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          {renderRatingStars(item.rating)}
        </View>
        <Text style={styles.bookCaption}>{item.description}</Text>
        <Text style={styles.bookDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDelete(item._id)}
      >
        {deleteBookId === item._id ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
        )}
      </TouchableOpacity>
    </View>
  );
}
