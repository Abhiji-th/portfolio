import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    res
      .status(401)
      .json({ success: false, error: "Not authorized to access this route" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = User.findById(decoded.id);

    if (!req.user)
      res.status(401).json({ sucess: false, error: "User not found" });

    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, error: "Not authorized to access this route" });
  }
};

export default protect;
