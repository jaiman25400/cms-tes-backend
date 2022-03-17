const express = require("express");
const router = express.Router();
const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const upload = multer({ storage });
const uploadAudio = require("./aws");
const AWS = require("aws-sdk");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/upload", upload.single("audiofile"), async (req, res) => {
  console.log('BOdyy: ',req.body);
  const filename = req.body.filename;
  const bucketname = "jaimanaudio";

  const file = req.file.buffer;
  console.log("File :", file);
  // link is the returned object URL from S3
  const link = await uploadAudio(filename, bucketname, file);
  res.send(link);
  // res.send('Upload Successfully')
});

router.get("/fileData", async (req, res) => {
  const bucketname = "jaimanaudio";
  const AWS = require("aws-sdk");
  const s3 = new AWS.S3({
    accessKeyId: "AKIA4SOKQ6ZXCQVGIOPW",
    secretAccessKey: "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",
  });
  const response = await s3
    .listObjectsV2({
      MaxKeys: 1000,
      Bucket: "jaimanaudio",
    })
    .promise();
  console.log("All Data:", response);
  res.send(response.Contents);

  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3({
      accessKeyId: "AKIA4SOKQ6ZXCQVGIOPW",
      secretAccessKey: "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",
    });

    const params = {
      Bucket: "jaimanaudio" /* required */,
      Key: "jaiman" /* required */,
    };

    s3.createBucket(
      {
        Bucket: "jaimanaudio" /* Put your bucket name */,
      },
      function () {
        s3.getObject(params, function (err, data) {
          if (err) {
            reject(err);
          } else {
            console.log("Successfully dowloaded data from  bucket", data);
            const heh = resolve(data.Body);
            console.log("hehe", heh);
          }
        });
      }
    );
  });
});

router.get("/getaudiosfortranscode", async (req, res) => {
    const AWS = require("aws-sdk");
  
    const s3 = new AWS.S3({
      accessKeyId: "AKIA4SOKQ6ZXCQVGIOPW",
      secretAccessKey: "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",
    });
    const response = await s3
      .listObjectsV2({
        MaxKeys: 1000,
        Bucket: "jaimanaudio",
      })
      .promise();
    transcodeAudio(response.Contents);
  });
  
  const transcodeAudio = (audios) => {
    console.log("transcodede ;", audios);
    var Idcredentials = {
      accessKeyId: "AKIA4SOKQ6ZXCQVGIOPW",
      secretAccessKey: "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",
    };
  
    var Etrans = new AWS.ElasticTranscoder({
      apiVersion: "2016-11-15", //Different API versions are provided by s3
      region: "us-east-1", //Bucket Region
      credentials: Idcredentials,
      Bucket: "jaimanaudio",
      ACL: "public-read",
    });
  
    for (const audio of audios) {
      var params = {
        PipelineId: "1644556950278-0tszme", //PipelineId of Elastic transcoder
        OutputKeyPrefix: "transcoded/",
        Input: {
          Key: audio.Key, //Source path of video
          Container: "auto",
        },
        Outputs: [
          {
            Key: audio.Key + ".mp4",
            PresetId: "1351620000000-000010",
          },
        ],
      };
  
      //To create a new Job
      Etrans.createJob(params, function (err, data) {
        if (err) {
          console.log("error is :", err);
        } else {
          console.log("Job data is", data);
          res.send(200)
        }
      });
    }
  };
  
  router.get("/getEc2Instance", async (req, res) => {
    console.log("getEc2Instance");
    const AWS = require("aws-sdk");
    AWS.config.getCredentials(function (err) {
      if (err) console.log("Stack shown", err.stack);
      // credentials not loaded
      else {
        console.log("Access key:", AWS.config.credentials.accessKeyId);
      }
    });
    AWS.config.update({ region: "ap-south-1" });
    var ec2 = new AWS.EC2({ apiVersion: "2016-11-15" });
    var params = {
      DryRun: false,
    };
  
    // Call EC2 to retrieve policy for selected bucket
    ec2.describeInstances(params, function (err, data) {
      if (err) {
        console.log("Error", err.stack);
      } else {
        console.log("Success", JSON.stringify(data));
      }
    });
  });

module.exports = router;
