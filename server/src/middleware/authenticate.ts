import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Authentication required. Please log in to your account.",
    });
    return; // Explicit return to stop execution
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    if (!decoded.id || !decoded.email) {
      throw new Error("Invalid token structure");
    }

    req.user = decoded;

    next(); // Proceed to next middleware
  } catch (error) {
    let errorMessage = "Invalid or expired token";
    if (error instanceof jwt.TokenExpiredError) {
      errorMessage = "Session expired. Please login again.";
    } else if (error instanceof jwt.JsonWebTokenError) {
      errorMessage = "Invalid authentication token";
    }

    res.status(401).json({
      success: false,
      message: errorMessage,
    });
  }
};

export default authenticate;
