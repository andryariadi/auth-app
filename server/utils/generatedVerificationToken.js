export const generatedVerificationToken = () => {
  const verificationTode = Math.floor(100000 + Math.random() * 900000).toString();
  return verificationTode;
};
