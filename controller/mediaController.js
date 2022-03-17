const mediaModel = require("../schema/mediaSchema").mediaModel;
const fs = require("fs");
const AWS = require("aws-sdk");
const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const upload = multer({ storage });

module.exports.getAllMedia = async (req, res) => {
  const Forms = await mediaModel.find({});
  res.send(Forms);
};

module.exports.archiveMedia = async (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  const data = await mediaModel.findOne({ _id: id });
  console.log("data", data);
  if (data.archive === true) {
    await mediaModel.updateOne({ _id: id }, { archive: false });
    res.send("Document UnArchived SuccesFully");
  } else {
    await mediaModel.updateOne({ _id: id }, { archive: true });
    res.send("Document Archived SuccesFully");
  }
};

module.exports.updateMedia = async (req, res) => {
  console.log("Media Body :", req.body);
  const id = req.params.id;
  const name = req.body.Name;
  const keyId = req.body.Key;
  const data = req.body;
  console.log("files oo :", req.files);
  if (req.files) {
    const file = req.files.file;
    var fileName = file.name;

    console.log("file", file);
    console.log("file Name for update", fileName);

    // file.mv(`public/Media/${file.name}`, (err) => {
    //   if (err) {
    //     console.log("erre", err);
    //     return res.status(500).send(err);
    //   } else {
    //     console.log("save");
    //   }
    // });
    for (var i = 0; i < fileName.length; i++) {
      if (fileName[i] === " ") {
        fileName = fileName.replace(" ", "_");
      }
    }
    console.log("Updated New file Name", fileName);

    const s3 = new AWS.S3({
      accessKeyId: "AKIAXOLZPFZRSRI4R2BR",
      // process.env.AWS_ID process.env.AWS_SECRET
      secretAccessKey: "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",
      region: "us-east-1", //Region
    });

    const uploadImagescms = (fileName, bucketname, file) => {
      return new Promise((resolve, reject) => {
        const params = {
          Key: fileName,
          Bucket: bucketname,
          Body: file,
          ContentType: file.mimetype,
          ACL: "public-read",
        };

        s3.upload(params, (err, data) => {
          if (err) {
            console.log(" ERR ::", err);
            reject(err);
          } else {
            console.log("data: ", data);
            resolve(data.Location);
          }
        });
      });
    };
    const link = await uploadImagescms(
      fileName,
      "bucket-test-node",
      req.files.file.data
    );
    console.log("link", link);

    await mediaModel.updateOne(
      { _id: id },
      { mediaSchema: data, fileName: fileName, name: name, key: keyId }
    );
  } else {
    await mediaModel.updateOne({ _id: id }, { mediaSchema: data, name: name });
  }

  res.send("Document Updated SuccesFully");
};

module.exports.deleteSelectedMedia = async (req, res) => {
  console.log("Body All media :", req.body.checkBox);
  const allMedia = req.body.checkBox;
  for (var i = 0; i < allMedia.length; i++) {
    console.log("Id ::", allMedia[i], i);
    const data = await mediaModel.findByIdAndDelete({ _id: allMedia[i] });
    console.log("data", data);
  }
  res.send("Deleted Successfully"); 
};

module.exports.archiveSelectedMedia = async (req, res) => {
  console.log("Body All media :", req.body.checkBox);
  const allMedia = req.body.checkBox;
  for (var i = 0; i < allMedia.length; i++) {
    console.log("Id ::", allMedia[i], i);
    const data = await mediaModel.findByIdAndUpdate({ _id: allMedia[i] }, { archive: true });
    console.log("data", data);
  }
  res.send("Archived Successfully"); 
};

module.exports.deleteMedia = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await mediaModel.deleteOne({ _id: id });
    if (data) {
      res.send("Deleted Successfully");
    } else {
      res.send("Not Found");
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports.getMediaByKeyId = async (req, res) => {
  const key = req.params.KeyId;
  console.log("Key:", key);
  const data = await mediaModel.find({ key: key });
  console.log("dataaa :", data);
  res.send(data);
};

module.exports.getMediaByNameAndId = async (req, res) => {
  const name = req.params.name;
  console.log("Name:", name);
  const data = await mediaModel.findOne({ name: name });
  console.log("dataaa :", data);
  res.send(data);
};

module.exports.addMediaData = async (req, res) => {
  console.log("Media", req.body);
  const data = req.body;
  const keyId = req.body.Key;

  if (!req.files) {
    res.send("Enter File Name");
    res.status(500);
  } else {
    const file = req.files.file;
    var fileName = file.name;
    const key = req.body.key;
    console.log("file", file);
    //   console.log("file bbbb Name", fileName, req.files);

    //   const fileContents3 = fs.readFileSync(fileName);

    for (var i = 0; i < fileName.length; i++) {
      if (fileName[i] === " ") {
        fileName = fileName.replace(" ", "_");
      }
    }
    //   console.log("file fefoe Name", fileName);
    if (file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        console.log("File Name is :", file[i].name, i, file[i]);
        var newfileName = file[i].name;

        for (var j = 0; j < newfileName.length; j++) {
          if (newfileName[j] === " ") {
            newfileName = newfileName.replace(" ", "_");
          }
        }
        console.log("File Name is :", newfileName, j, file[i]);

        // const uploadImagescms = (fileName, bucketname, file) => {
        //   return new Promise((resolve, reject) => {
        //     const params = {
        //       Key: fileName,
        //       Bucket: bucketname,
        //       Body: file,
        //       ContentType: file.mimetype,
        //       ACL: "public-read",
        //     };

        //     s3.upload(params, (err, data) => {
        //       if (err) {
        //         console.log(" ERR ::", err);
        //         reject(err);
        //       } else {
        //         console.log("data: ", data);
        //         resolve(data.Location);
        //       }
        //     });
        //   });
        // };
        // const link = await uploadImagescms(
        //   fileName,
        //   "bucket-test-node",
        //   req.files.file.data
        // );
        // console.log("link", link);

        //       file[i].mv(`public/Media/${newfileName}`, (err) => {
        //         if (err) {
        //           console.log("erre", err);
        //           return res.status(500).send(err);
        //         } else {
        //           console.log("save");
        //         }
        //       });
        // await mediaModel.create({
        //   mediaSchema: data,
        //   fileName: newfileName,
        //   name: newfileName,
        //   key: keyId,
        // });
      }

      res.send("Document Created SuccesFully");
    } else {
      console.log("S3 .. ::", req.files.file);
      // const uploadFile = () => {
      //   fs.readFile(fileName, (err, data) => {
      //     console.log("data of  s3 ::",data,fileName);
      //      if (err) throw err;
      //      const params = {
      //          Bucket: 'bucket-test-node', //process.env.AWS_BUCKET_NAME  pass your bucket name
      //          Key: fileName, // file will be saved as testBucket/contacts.csv
      //          Body: file.data, // JSON.stringify(data, null, 2)
      //          ACL: "public-read",
      //          ContentType: file.mimetype,
      //         };
      //      console.log("params S3", params);
      //      s3.upload(params, function(s3Err, data) {
      //          if (s3Err) throw s3Err
      //          console.log(`File uploaded successfully at AWS s3 ${data.Location}`)
      //      });
      //   });
      // };

      // uploadFile();

      const s3 = new AWS.S3({
        accessKeyId: "AKIA4SOKQ6ZXCQVGIOPW",
        //AKIAXOLZPFZRSRI4R2BR process.env.AWS_ID process.env.AWS_SECRET AKIA4SOKQ6ZXCQVGIOPW
        secretAccessKey: "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",
        region: "us-east-1", //yZax/pE8jQstZq0mUCuBDcVyhn9LKSCUlCCaT8mw Region /lty3y5nXtmybIwwYhmsZnRGzTFBEDncM2pZZ/GA
      });

      const fileName = req.files.file.name;

      const uploadImagescms = (fileName, bucketname, file) => {
        return new Promise((resolve, reject) => {
          const params = {
            Key: fileName,
            Bucket: bucketname,
            Body: file,
            ContentType: file.mimetype,
            ACL: "public-read",
          };

          s3.upload(params, (err, data) => {
            if (err) {
              console.log(" ERR ::", err);
              reject(err);
            } else {
              console.log("data: ", data);
              resolve(data.Location);
            }
          });
        });
      };
      const link = await uploadImagescms(
        fileName,
        "jaimancmsimages",
        req.files.file.data
      );
      console.log("link", link);

      // file.mv(`public/Media/${fileName}`, (err) => {  jaimancmsimages bucket-test-node
      //   if (err) {
      //     console.log("erre", err);
      //     return res.status(500).send(err);
      //   } else {
      //     console.log("save");
      //   }
      // });
      await mediaModel.create({
        mediaSchema: data,
        fileName: fileName,
        name: fileName,
        key: keyId,
      });
      res.send("Document Created SuccesFully");
    }
  }
};
