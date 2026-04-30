export const getSafeUser = (user: Express.User) => {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    avatar: user.avatar,
    isEmailVerified: user.isEmailVerified,
  };
};
