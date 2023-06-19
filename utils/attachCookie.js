const attachCookie = ({ res, token }) => {
  // const oneDay = 1000 * 60 * 60 * 24;
  const oneHour = 1000 * 60 * 60;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneHour),
    secure: process.env.NODE_ENV === 'production',
  });
};

export default attachCookie;
