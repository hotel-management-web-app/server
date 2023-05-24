import asyncHandler from 'express-async-handler';

export const authorizeSuperAdmin = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  if (req?.user?.role === 'SUPERADMIN') next();
  else throw new Error('Not authorized to do this action!');
});
