const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require('firebase/storage');
const firebase = require('../firebase');

const uploadInageToFirebase = async (file) => {
  const storage = getStorage(firebase);
  const fileRead = file.buffer.toString('base64');
  console.log(fileRead);

  const storageRef = ref(storage, `images/${file.originalname}`);

  const snapshot = await new Promise((resovle, reject) => {
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        resovle(downloadURL);
      });
    });
  });
  console.log(snapshot);
  const url = await fileRef.getDownloadURL();
  return url;
};

module.exports = { uploadInageToFirebase };
