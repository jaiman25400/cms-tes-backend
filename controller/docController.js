const docsModel = require("../schema/docsSchema").docsModel;
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

module.exports.getDocByModelName = async (req, res) => {
  try {
    const modelName = req.params.modelName;
    const data = await docsModel.find({ modelName: modelName });
    res.send(data);
  } catch {
    res.sendStatus(500);
  }
};

module.exports.getDocByModelNameAndID = async (req, res) => {
  try {
    const modelName = req.params.modelName;
    const id = req.params.id;
    console.log("params", req.params);

    const data = await docsModel.find({ modelName: modelName, _id: id });
    console.log("data to send", data);
    console.log("data to ", data[0].data.PName);
    res.send(data);
  } catch {
    res.sendStatus(500);
  }
};

module.exports.addData = async (req, res) => {
  console.log("eeqda", req);
  const modelName = req.params.modelName;
  const modelId = req.model_id;
  const data = req.body;
  const path = null;

  // file.mv('../public/pimg/' + file,function(err){
  //     console.log('erre',err)
  // })
  // console.log('photos',file)
  // file.mv("./media/"+ file.name,err => {
  if (!req.files) {
    await docsModel.create({ modelName, model: modelId, data, fileName: path });
    res.send("Document Created SuccesFully");
  } else {
    const file = req.files.file;
    const path = file.name;
    // const at = ''
    // for(var attributename in file){
    //     console.log('ggg',attributename.name);
    // }

    console.log('fileeeee',file)
    console.log('pathfff',path)
    file.mv(`public/${file.name}`, (err) => {
      if (err) {
        console.log("erre", err);
        return res.status(500).send(err);
      } else {
        console.log("save");
      }
    });
    await docsModel.create({ modelName, model: modelId, data, fileName: path });
    res.send({ "Document Created SuccesFully": {}, path: `/${file.name}` });
  }
};

module.exports.updateData = async (req, res) => {
  console.log("req up", req);
  const docId = req.params.docId;
  const data = req.body;
  if (!req.files) {
    console.log(docId, data);
    await docsModel.findByIdAndUpdate({ _id: docId }, { $set: { data: data } });
  } else {
    const photo = req.files.Photo.name;
    const file = req.files.Photo;    
    console.log(docId, data);
    file.mv(`public/${file.name}`, (err) => {
        if (err) {
          console.log("erre", err);
          return res.status(500).send(err);
        } else {
          console.log("save");
        }
      });
    await docsModel.findByIdAndUpdate(
      { _id: docId },
      { $set: { data: data, fileName: photo } }
    );
  }

  res.send("Document Updated Successfully");
};

module.exports.deleteData = async (req, res) => {
  const docId = req.params.docId;
  await docsModel.findByIdAndDelete(docId);
  res.send("Document Deleted Sucessfully");
};
