const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: "AKIA4SOKQ6ZXCQVGIOPW",
  secretAccessKey: "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",
});

const uploadAudio = (filename, bucketname, file) => {
  return new Promise((resolve, reject) => {

    const params = {
      Key: filename,
      Bucket: bucketname,
      Body: file,
      ContentType: "audio/mpeg",
      ACL: "public-read",
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log("data: ", data);
        resolve(data.Location);
      }
    });
    
    // const params = {
    //   Key: filename,
    //   Bucket: bucketname,
    //   Body: file,
    //   ContentType: "audio/mpeg",
    //   ACL: "public-read",
    // };

    // var Idcredentials = {
    //   accessKeyId: "AKIA4SOKQ6ZXCQVGIOPW",
    //   secretAccessKey: "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",
    // };

    // var Etrans = new AWS.ElasticTranscoder({
    //   apiVersion: "2016-11-15", //Different API versions are provided by s3
    //   region: "us-east-1", //Bucket Region
    //   credentials: Idcredentials,
    //   Bucket: 'jaimanaudio',
    // });

    // var params = {
    //   PipelineId: "1644556950278-0tszme", //PipelineId of Elastic transcoder
    //   OutputKeyPrefix: "transcoded/",
    //   Input: {
    //     Key: filename, //Source path of video
    //     Container: "auto",
    //   },
    //   Outputs: [
    //     {
    //       Key: ".mp4",
    //       PresetId: "1351620000000-000010",
    //       // SegmentDuration: "3", //Duration in segment on which transcoding is done as we chose HLS streaming
    //       // ThumbnailPattern: "poster-{count}", //It is used to create snapshot of Video
    //     },
    //   ],
    // };

    //To create a new Job

    // Etrans.createJob(params, function (err, data) {
    //   if (err) {
    //     console.log("error is :", err);
    //   } else {
    //     console.log("Job data is", data);
    //   }
    // });

    // Etrans.readJob({ Id: data.transcodeId }, (err, data) => {
    //   if (err) {
    //     console.log(err);
    //     reject(err);
    //   } else {
    //     console.log(data);
    //   }
    // });

    // s3.upload(params, (err, data) => {
    //   if (err) {
    //     reject(err);
    //   } else {
    //       console.log('data: ',data)
    //     resolve(data.Location);
    //   }
    // });
  });
};

module.exports = uploadAudio;
