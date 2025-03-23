import cloudinary from "../config/cloudinary.js";
import Book from "../models/book.js";
export const createBook = async (req, res) => {
  try {
    const { title, description, rating, image } = req.body;
    console.log(req.body);

    if (!title || !description || !rating || !image)
      return res.status(400).json({ message: "All fields are required" });

    if (rating < 1 || rating > 5)
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });

    // upload image to cloudinary
    const uploadRes = await cloudinary.uploader.upload(image, {
      resource_type: "auto",
    });
    const imageUrl = uploadRes.secure_url;

    // save to database
    const newBook = new Book({
      title,
      description,
      rating,
      image: imageUrl,
      author: req.user._id,
    });
    await newBook.save();

    res.status(201).json({ message: "Book created successfully", newBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 }) // descending order
      .skip(skip)
      .limit(limit)
      .populate("author", "username profileImage");

    const totalBooks = await Book.countDocuments();
    res.status(200).json({
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const userBooks = async (req, res) => {
  try {
    const books = await Book.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    if (!books.length) {
      return res.status(404).json({ message: "No books found for this user" });
    }

    res.json(books);
  } catch (error) {
    console.error("Error fetching user books:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // check if user is the owner of the book
    if (book.author.toString() !== req.user._id.toString())
      return res
        .status(401)
        .json({ message: "Unauthorized to delete this book" });

    // delete image from cloudinary
    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log("error deleting image from cloudinary", error);
      }
    }
    // delete book from database
    await Book.findByIdAndDelete(bookId);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
