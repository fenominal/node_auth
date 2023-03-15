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
  { $match: { _id: ObjectId("6401962b3d3ac9e81b439eb3") } },
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
