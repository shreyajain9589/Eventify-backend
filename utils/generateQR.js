import QRCode from 'qrcode';

const generateQR = async (text) => {
  try {
    const qrDataURL = await QRCode.toDataURL(text);
    return qrDataURL;
  } catch (error) {
    throw new Error('Could not generate QR code');
  }
};

export default generateQR; // ✅ default export
