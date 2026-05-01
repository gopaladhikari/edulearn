export const getSafeUser = (user: Express.User) => {
  return {
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    role: user.role,
    avatar: user.profile.avatar,
    gender: user.profile.gender,
    isEmailVerified: user.isEmailVerified,
  };
};
