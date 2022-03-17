const formModel = require("../schema/formSchema").formModel;
const formPageModel = require("../schema/formPageSchema").formPageModel;
const validateModel = require("../schema/validationSchema").validationModel;

module.exports.getAllForms = async (req, res) => {
  const Forms = await formModel.find({});
  console.log("Forms :", Forms);
  res.send(Forms);
};

module.exports.getFormByKey = async (req, res) => {
  const Key = req.params.Key;
  console.log("form name key:", Key);
  const data = await formModel.find({ Key: Key });
  if (!data) {
    res.sendStatus(404);
  }
  res.send(data);
};
module.exports.getformByName = async (req, res) => {
  try {
    const Name = req.params.Name;
    console.log("form namee :", Name);
    const data = await formModel.find({ name: Name });
    if (!data) {
      res.sendStatus(404);
    }
    res.send(data);
  } catch {
    res.sendStatus(500);
  }
};

module.exports.createPageForm = async (req, res) => {
  try {
    const name = req.body.title.formTitle;
    const description = req.body.description.formDescription;
    const formSchema = req.body.data;
    const Key = req.params.Key;

    console.log("form :", req.body, Key, name);
    const data = await formModel.create({
      name: name,
      formSchema,
      Key,
      description,
    });
    if (!data) {
      res.sendStatus(404);
    }
    await data.save();
    console.log("Data :;", data);
    res.send(data);
  } catch {
    res.sendStatus(500);
  }
};

module.exports.createForm = async (req, res) => {
  const Key = req.params.Key;

  console.log("parse body :", req.body, Key);
  const name = req.body.title.formTitle;
  const formSchema = req.body.data;

  const doc = await formModel.create({ name, formSchema: formSchema, Key });
  await doc.save();
  res.send("Created form Successfully");
};

module.exports.updateForm = async (req, res) => {
  console.log("req up", req.body);
  const formId = req.params.formId;
  const data = req.body;
  console.log("req up", req.body, formId);

  await formModel.findByIdAndUpdate(
    { _id: formId },
    { $set: { formSchema: data } }
  );

  const valiData = await validateModel.findOne({ form: formId });

  console.log("daldw ::", valiData, valiData.validationSchema.includes(data));

  // if (valiData[0].validationSchema.includes(data)) {
  //   console.log('ll ::',valiData[0].validationSchema.filter(item => item !== data))
  //   await validateModel.findByIdAndUpdate(
  //     { _id: valiData[0]._id },
  //     { $set: { validationSchema: valiData[0].validationSchema.filter(item => item !== data) } }
  //   )
  // } else {
  //   console.log('ll cc::',valiData[0].validationSchema.filter(item => item !== data))

  //   await validateModel.findByIdAndUpdate(
  //     { _id: valiData[0]._id },
  //     { $set: { validationSchema: data } }
  //   )
  // }

  for (let i = 0; i < data.length; i++) {
    console.log(
      "data Name: ",
      data[i].name,
      " Vali NamE: ",
      valiData?.validationSchema[i]?.name
    );
    if (valiData?.validationSchema[i]?.name === undefined) {
      console.log("ll ndewc ::", valiData?.validationSchema[i]?.name, data[i]);
      await validateModel.updateOne(
        { form: formId },
        { $push: { validationSchema: data[i] } }
      );
    }
    // await validateModel.findByIdAndUpdate(
    //   { _id: id },
    //   { $set: { validationSchema: data} }
    // )
  }

  // const vali = await validateModel.updateMany(
  //   { form: formId },
  //   { $set: {validationSchema : data}}
  //   )
  // console.log("vali",vali, vali[0].validationSchema);
  //{ $set: {validationSchema : data}
  res.send("Document Updated Successfully");
};

module.exports.deleteForm = async (req, res) => {
  const formId = req.params.formId;
  await formModel.findByIdAndDelete(formId);
  res.send("Form Deleted Sucessfully");
};
