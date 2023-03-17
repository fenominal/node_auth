db.college.aggregate([
  {
    $lookup: {
      localField: "_id",
      from: "departments",
      foreignField: "college_id",
      as: "departments",
    },
  },
  {
    $unwind: {
      path: "$departments",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      localField: "departments._id",
      from: "sections",
      foreignField: "department_id",
      as: "departments.sections",
    },
  },
  {
    $group: {
      _id: "$_id",
      name: {
        $first: "$name",
      },
      university_id: {
        $first: "$university_id",
      },
      departments: {
        $push: "$departments",
      },
    },
  },
]);

db.users.aggregate([
  {
    $lookup: {
      from: "prodcuts",
      localField: "_id",
      foreignField: "userId",
      as: "Prodcut",
    },
  },
  {
    $lookup: {
      from: "platforms",
      localField: "_id",
      foreignField: "userId",
      as: "Platform",
    },
  },
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "Orders",
    },
  },
  { $match: { _id: ObjectId("641305f30278e1a553adf6b0") } },
  {
    $project: {
      _id: 0,
      password: 0,
      cpassword: 0,
      __v: 0,
      "Prodcut._id": 0,
      "Prodcut.userId": 0,
      "Prodcut.__v": 0,
      "Platform._id": 0,
      "Platform.userId": 0,
      "Platform.__v": 0,
    },
  },
]);

db.platforms.find({
  _id: ObjectId("6411528c0a5cffbeff9d62d8"),
  userId: ObjectId("640ee8d58db9ec705b57bfc6"),
});

db.platforms.find({
  $and: [
    { _id: "6411528c0a5cffbeff9d62d8" },
    { userId: "640ee8d58db9ec705b57bfc6" },
  ],
});
