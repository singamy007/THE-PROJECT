import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  // Log the full request headers
  //const header = req.headers('Authorization');  
  console.log("Request Headers: ", req.headers);

  // Extract the Authorization header
  const authHeader = req.headers['authorization'];
  console.log("Authorization Header: ", authHeader);

  // Check if the Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).send({ error: 'Token is required or malformed' });
  }

  // Extract the token by removing the 'Bearer ' prefix
  const token = authHeader.replace('Bearer ',''); // 'Bearer ' has 7 characters
  console.log("Extracted Token: ", token);

  // Verify the JWT token
 /* const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedUser;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Handle invalid or expired token
      console.log("JWT Verification Error: ", err);
      return res.status(403).send({ error: 'Invalid or expired token' });
    }

    // Log the decoded token
    console.log("Decoded Token: ", decoded);

    // Attach user ID from decoded token to the request object
    req.userId = decoded.id; // Assuming the token contains a user `id`*/
    
    // Move to the next middleware or route handler
    next();
  };


export default verifyToken;
