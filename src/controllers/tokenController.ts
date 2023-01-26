import asyncHandler from 'express-async-handler';

export const getJWT = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  res.send({ token });
});

export const getCSRFToken = asyncHandler(async (req, res) => {
  res.send({ csrfToken: req.csrfToken() });
});
