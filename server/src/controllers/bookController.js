import cloudinary from "../config/cloudinary.js";
import Book from "../models/book.js";
export const createBook = async (req, res) => {
  try {
    const { title, description, rating, image } = req.body;

    if (!title || !description || !rating || !image)
      return res.status(400).json({ message: "All fields are required" });

    if (rating < 1 || rating > 5)
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });

    // upload image to cloudinary
    const uploadRes = await cloudinary.uploader.upload(image);
    const imageUrl = uploadRes.secure_url;

    // save to database
    const newBook = new Book({
      title,
      description,
      rating,
      image: imageUrl,
      user: req.user._id,
    });
    await newBook.save();

    res.status(201).json({ message: "Book created successfully", newBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
