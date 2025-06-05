const jwt = require("jsonwebtoken");
const supabase = require("../supabase");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  // Get token from header "Authorization: Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Query the user in the database
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", decoded.id)
      .single(); // use single() to get one user or null

    if (error) {
      // Some database error happened
      console.error("Database error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    if (!data) {
      // User not found
      return res.status(401).json({ error: "User not found" });
    }

    // Attach user info to req object
    req.user = data;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
