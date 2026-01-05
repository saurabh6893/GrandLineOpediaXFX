import { User } from "../model/user.model.js";

const registerUser = async (req, res) => {
  try {
    console.log("\n📝 Register Request:", req.body);
    
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      console.log("❌ Validation failed: Missing fields");
      return res.status(400).json({ message: "all fields are important" });
    }

    console.log("✅ Validation passed");

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: "user already exists" });
    }

    console.log("🔄 Creating user in database...");
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
    });

    console.log("✅ User created successfully:", user._id);
    res.status(201).json({
      message: `User Registered `,
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error("❌ Register Error:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).json({
      message: `Internal Server Error`,
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log("\n🔐 Login Request:", req.body);
    
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      console.log("❌ Validation failed: Missing credentials");
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    console.log("✅ Validation passed");
    
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({
        message: "User not found",
      });
    }

    console.log("✅ User found, comparing passwords...");
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("❌ Password mismatch for user:", email);
      return res.status(400).json({ 
        message: "Passwords dont match" 
      });
    }

    console.log("✅ Login successful for user:", email);
    res.status(200).json({
      message: "Successfully logged in",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { registerUser, loginUser };
