import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
}

// Generate a JWT token for the user with 1 hour expiration
const tokenCreation = (userId: string): string => {
  return jwt.sign(
    { userId } as TokenPayload,
    process.env.JWT_SECRET as string,
    { expiresIn: 60 * 60 },
  );
};

export { tokenCreation };
