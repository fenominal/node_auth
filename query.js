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

  { $match: { _id: ObjectId("") } },
  {
    $project: {
      password: 0,
      cpassword: 0,
    },
  },
]);

db.users.aggregate([
  {
    $lookup: {
      from: "prodcuts",
      localField: "_id",
      foreignField: "userId",
      pipeline: [
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "productId",
            as: "Orders",
          },
        },
      ],
      as: "Prodcut",
    },
  },
  {
    $lookup: {
      from: "orders",
      pipeline: [
        {
          $lookup: {
            from: "prodcuts",
            localField: "productId",
            foreignField: "_id",
            as: "Prodcut",
          },
        },
      ],
      as: "Orders",
    },
  },
]);

db.users.aggregate([
  {
    $lookup: {
      from: "prodcuts",
      localField: "_id",
      foreignField: "userId",
      let: { productId: "$id" },
      pipeline: [
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "productId",
            as: "Orders",
          },
        },
      ],
      as: "Prodcut",
    },
  },
]);
