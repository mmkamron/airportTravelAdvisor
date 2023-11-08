import bcrypt from "bcrypt";
import { pool } from "../util/db.js";
import { createJWT, verify, tokenBlacklist } from "../util/jwt.js";

const register = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO users (email, username, password, role) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [email, username, hashedPassword, role];
    const result = await pool.query(query, values);
    const newUser = result.rows[0];
    res.json({
      message: "User successfully registered",
      user: {
        userId: newUser.user_id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);
    const user = result.rows[0];

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const accessToken = createJWT(
          {
            iss: "airportTravelAdvisor",
            sub: String(user.user_id),
            username: user.username,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + 600, // 10 min expiration
          },
          process.env.ACCESS_TOKEN_SECRET,
        );
        const refreshToken = createJWT(
          {
            iss: "airportTravelAdvisor",
            sub: String(user.user_id),
            username: user.username,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + 86400, // 1 day expiration
          },
          process.env.REFRESH_TOKEN_SECRET,
        );
        res.cookie("refreshToken", refreshToken);
        res.json({
          accessToken: accessToken,
          message: "User successfully authorized",
        });
      } else {
        res.status(401).json({ message: "Unauthorized: Invalid credentials" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized: Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  tokenBlacklist.add(req.cookies.refreshToken);
  res.cookie("refreshToken", "", { maxAge: 1 });
  res.json("User logged out");
};

const refresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  verify(refreshToken, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Refresh token is invalid" });
    }

    const accessToken = createJWT(
      {
        iss: "airportTravelAdvisor",
        sub: String(user.user_id),
        username: user.username,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 600, // 10 min expiration
      },
      process.env.ACCESS_TOKEN_SECRET,
    );

    res.json({ accessToken: accessToken });
  });
};

export { refresh, register, login, logout };
