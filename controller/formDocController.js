const formDocModel = require("../schema/formDocSchema").formDocModel
const formModel = require("../schema/formSchema").formModel;

module.exports.deleteFormDocData = async (req, res) => {
  const formDocName = req.params.formDocName
  console.log('formDocName',formDocName)
  await formDocModel.deleteOne({ formContentName: formDocName })
  res.send( "Document Deleted SuccesFully");
}

module.exports.showFormByItsName = async (req,res) => {
  const formName = req.params.formName
  console.log('form Name :',formName)
  var data = await formDocModel.find({
    formName: formName
  })
  console.log('data is ::',data)
  res.send(data)
}

module.exports.showFormDocById = async (req,res) => {
  console.log('id',req.body)
  var data = await formDocModel.find({ _id: req.body.id})
  res.send(data)
}

module.exports.updateFormData = async (req, res) => {
    const formContentName = req.params.formName
    const data = req.body
    console.log('BOdy L:',req.body)
    // const form = await formModel.findOne({ name: formName });
    // const media = req.body?.MediaName[0]
    // console.log('media',media)
    if (!req.files) {
      await formDocModel.updateOne({ formContentName },{  data, });
      res.send("Document Updated SuccesFully no Pic");
    } else {
      const file = req.files.file;
      const path = file.name;
      console.log('Pathh ::',path)
      // file.mv(`public/formDoc/${file.name}`, (err) => {
      //   if (err) {
      //     console.log("erre", err);
      //     return res.status(500).send(err);
      //   } else {
      //     console.log("save");
      //   }
      // });
      await formDocModel.updateOne({ formContentName },{ data, fileName: path });
      res.send( "Document Updated SuccesFully");
    }
  }

module.exports.addFormData = async (req, res) => {
    const formName = req.params.formName    
    const formContentName = req.body.contentName
    const data = req.body;
    console.log("Form Doc req :", req.body,formName);
    const form = await formModel.findOne({ name: formName });
    const formId = form._id
    console.log('iddddd ',form._id,formContentName)
    // const modelId = req.model_id;
    const path = null;
    const media = req.body.MediaName
    console.log('media',req.files)
    if (!req.files) {   
      await formDocModel.create({ formName,formContentName, form: formId, data});
      res.send("Document Created SuccesFully with no File");
    } else {
      const file = req.files.file;
      const path = file.name;
    console.log('dilee: ',file)
      // file.mv(`public/formDoc/${file.name}`, (err) => {
      //   if (err) {
      //     console.log("erre", err);
      //     return res.status(500).send(err);
      //   } else {
      //     console.log("save");
      //   }
      // });
      await formDocModel.create({ formName,formContentName, form: formId, data, fileName: path });
      res.send( "Document Created SuccesFully");
    }
  };