const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dqmkovsdy",
  api_key: "672391431318973",
  api_secret: "w8ohhHTJpJQm1DJLQAH4vq1p6Do"
})

module.exports = { cloudinary }