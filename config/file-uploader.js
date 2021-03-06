var fs = require("fs");
var cloudinary = require("cloudinary").v2;

var uploads = {};

cloudinary.config({
  cloud_name: "favlix",
  api_key: "279486836992871",
  api_secret: "g7QsW8utvB2RZu0wSnXtu-UIgM4",
});

console.log("** ** ** ** ** ** ** ** ** Uploads ** ** ** ** ** ** ** ** ** **");

// File upload
cloudinary.uploader.upload(
  "spilled-popcorn-on-a-red-background.jpg",
  { tags: "basic_sample" },
  function (err, image) {
    console.log();
    console.log("** File Upload");
    if (err) {
      console.warn(err);
    }
    console.log(
      "* public_id for the uploaded image is generated by Cloudinary's service."
    );
    console.log("* " + image.public_id);
    console.log("* " + image.url);
    waitForAllUploads("popcorn", err, image);
  }
);

// Stream upload
var upload_stream = cloudinary.uploader.upload_stream(
  { tags: "basic_sample" },
  function (err, image) {
    console.log();
    console.log("** Stream Upload");
    if (err) {
      console.warn(err);
    }
    console.log("* Same image, uploaded via stream");
    console.log("* " + image.public_id);
    console.log("* " + image.url);
    waitForAllUploads("popcorn3", err, image);
  }
);
fs.createReadStream("spilled-popcorn-on-a-red-background.jpg").pipe(
  upload_stream
);

// File upload (example for promise api)
cloudinary.uploader
  .upload("spilled-popcorn-on-a-red-background.jpg", { tags: "basic_sample" })
  .then(function (image) {
    console.log();
    console.log("** File Upload (Promise)");
    console.log(
      "* public_id for the uploaded image is generated by Cloudinary's service."
    );
    console.log("* " + image.public_id);
    console.log("* " + image.url);
  })
  .catch(function (err) {
    console.log();
    console.log("** File Upload (Promise)");
    if (err) {
      console.warn(err);
    }
  });
