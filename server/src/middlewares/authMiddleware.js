import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    // get the token
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ message: "Unauthorized to access" });

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find the user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user)
      return res.status(401).json({ message: "Unauthorized to access" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token is not valid" });
  }
};
