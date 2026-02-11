import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
}

const tokenCreation = (userId: string): string => {
  return jwt.sign(
    { userId } as TokenPayload,
    process.env.JWT_SECRET as string,
    { expiresIn: 60 * 60 },
  );
};

export { tokenCreation };
