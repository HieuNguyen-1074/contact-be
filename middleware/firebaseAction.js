const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} = require('firebase/storage');

const randomUniqueId = require('random-unique-id');

const firebase = require('../firebase');

const uploadInageToFirebase = async (file) => {
  var uniqueId = randomUniqueId();

  const storage = getStorage(firebase);
  const fileRead = file.buffer.toString('base64');

  const storageRef = ref(storage, `images/${uniqueId.id}`);

  const url = await new Promise((resovle, reject) => {
    uploadBytes(storageRef, file.buffer, {
      contentType:file.mimetype, // Set the desired content type
    }).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        resovle(downloadURL);
      });
    });
  });

  return url;
};

module.exports = { uploadInageToFirebase };
