const jwt = require("jsonwebtoken"),
  User = require("./models/User.js"),
  { JWT_SECRET } = process.env;

// function for creating tokens
function signToken(user) {
  // toObject() returns a basic js object with only the info from the db
  const userData = user.toObject();
  delete userData.password;
  return jwt.sign(userData, "secret");
}

// function for verifying tokens
function verifyToken(req, res, next) {
  var id = "null";
  // grab token from either headers, req.body, or query string
  const token =
    req.get("token") || req.body.token || req.query.token || req.params.id;
  // if no token present, deny access
  if (!token) return { success: false, message: "No token provided" };
  // otherwise, try to verify token
  jwt.verify(token, "secret", (err, decodedData) => {
    // if problem with token verification, deny access
    console.log("checking");

    if (err) return { success: false, message: "Invalid token." };
    // console.log("id:", decodedData._id);
    // otherwise, search for user by id that was embedded in token
    id = decodedData._id;
  });
  return { success: true, data: id };
}

module.exports = {
  signToken,
  verifyToken,
};
