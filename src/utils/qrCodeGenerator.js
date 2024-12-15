import QRCode from "qrcode";

export const createQrCode = (path, menuURL) => {
  const opts = {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    quality: 0.3,
    margin: 1,
    color: {
      dark: "#010599FF",  // QR code color
      light: "#ffffff",   // Solid white background
    },
  };

  QRCode.toFile(path, menuURL, opts, (error) => {
    if (error) throw new Error(error);
  });

  return null;
};
