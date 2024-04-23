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

  const url = await new Promise((resovle, reject) => {
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        resovle(downloadURL);
      });
    });
  });

  return url;
};

module.exports = { uploadInageToFirebase };
