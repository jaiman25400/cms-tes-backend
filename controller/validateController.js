const validateModel = require("../schema/validationSchema").validationModel;
const formModel = require("../schema/formSchema").formModel;

module.exports.addvalidateData = async (req, res) => {
  const formName = req.body.formSelected;
  const Key = req.params.Key;
  console.log('Add Vali kEy :',Key)
  const form = await formModel.findOne({ name: formName });
  const formId = form._id;
  const validationSchema = req.body.data;
  const name = req.body.title.formTitle;
  console.log("Form Doc req :", req.body);
  console.log('idccc',formId)
  
  await validateModel.create({
    formName,
    form: formId,
    validationSchema,
    name,
    Key
  });
  res.send("Document Created SuccesFully");
};

module.exports.readValidateByFormName = async (req, res) => {
  try {
    const Name = req.params.Name;
    console.log("nAme :", Name);
    const data = await validateModel.find({ formName: Name });
    if (!data) {
      res.sendStatus(404);
    }
    res.send(data);
  } catch {
    res.sendStatus(500);
  }
};

module.exports.readValidateByValidationName = async (req, res) => {
  try {
    const Name = req.params.Name;
    console.log("Vali nAme :", Name);
    const data = await validateModel.find({ name: Name });
    if (!data) {
      res.sendStatus(404);
    }
    res.send(data);
  } catch {
    res.sendStatus(500);
  }
};

module.exports.readAllValidation = async (req, res) => {
  const Key = req.params.Key;
  console.log("Key :", Key);
  const Forms = await validateModel.find({
    Key: Key
  });
  res.send(Forms);
};

module.exports.updateValidationForm = async (req, res) => {
  console.log("req up", req.body);
  const formId = req.params.ValiId;
  const data = req.body;
  // console.log("req up", req,req.body,formId);

    await validateModel.findByIdAndUpdate(
      { _id: formId },
      { $set: { validationSchema: data} }
    )

  res.send("Document Updated Successfully");
};

module.exports.deleteValidateForm = async (req, res) => {
  const modelId = req.params.id
  await validateModel.findByIdAndDelete(modelId);
  res.send("Document Deleted Sucessfully")
}
