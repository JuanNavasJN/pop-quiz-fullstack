import { UserDocument } from './schema/users.schema';

// return user object without sensitive data
export const sanitizeUser = (user: UserDocument) => {
  const sanitized = user.toObject();

  return {
    _id: sanitized._id,
    email: sanitized.email,
    name: sanitized.name,
    role: sanitized.role,
  };
};
