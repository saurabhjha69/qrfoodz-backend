import QRCode from "qrcode";
export const createQrCode = (path,menuURL) => {
  const opts = {
    errorCorrectionLevel: "H",
    type: "image/png",
    quality: 0.1,
    margin: 1,
    color: {
      dark: "#010599FF",
      light: "#FFBF60FF",
    },
  };

  QRCode.toFile(path, menuURL, opts, (error) => {
    if (error) throw new Error(error);
  });

  return null
};
