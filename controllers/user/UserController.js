const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get all users
exports.getAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// Get a specific user by ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// Update a user by ID (and check if he is an administrator)
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((user) => {
      if (user && user.role === "admin") {
        res.send(user);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// Delete a user by ID
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
exports.authenticateUserViaAPI = (username, password) => {
  return fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        // Authentication successful
        console.log("Authentication successful");
        return res.json();
      } else {
        // Authentication failed
        throw new Error(`Authentication failed. Status: ${res.status}`);
      }
    })
    .then((json) => {
      console.log(json); // You can customize the logic here based on the response
      // Allow the user to login or perform further actions
      return json;
    })
    .catch((error) => {
      console.error(error); // Handle any errors that occurred during authentication
      // Return an appropriate response, such as 404 or 500
      return error;
    });
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    console.log("Creating user");
    // Get specific data to create a new user
    const { username, password, name, address, phone, email, isAdmin } =
      req.query;
    if (!username || !password || !email || !address || !phone || !name) {
      // Verify the user
      console.log("all input is required");
      response.status(404).send("All input is required");
    }

    const toggleAdmin = !isAdmin ? "user" : "admin";

    // Check if user is already existing
    // Validate if the user is already in our database
    const oldUser = await User.findOneAndDelete({ email });
    if (oldUser) {
      response.status(409).send("User already exists");
    }
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      username,
      name,
      phone,
      addresses: {
        city: address,
      },
      email,
      role: toggleAdmin,
      password: encryptedPassword,
    });

    // Get a token from jwt
    const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    // Assignt the token to the user
    user.token = token;
    // return the user
    res.status(200).json(user);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

//  Handle login
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        // User not found
        res.status(404).send("User not found");
      } else {
        // Compare passwords
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.status(500).send(err);
          } else if (result) {
            // Passwords match, authentication successful
            res.status(200).send("Authentication successful");
          } else {
            // Passwords do not match
            res.status(401).send("Authentication failed");
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.logout = (req, res) => {
  // Perform any logout actions (e.g., clear session, token, etc.)
  res.status(200).send("Logged out successfully");
};

exports.authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).send("No token provided");
  } else {
    jwt.verify(token, "secretKey", (err, decoded) => {
      if (err) {
        res.status(401).send("Invalid token");
      } else {
        // Add the decoded user data to the request object
        req.user = decoded;
        next();
      }
    });
  }
};

exports.adminAction = (req, res) => {
  // Perform admin-specific actions
  res.status(200).send("Admin action performed");
};

exports.userAction = (req, res) => {
  // Perform user-specific actions
  res.status(200).send("User action performed");
};
