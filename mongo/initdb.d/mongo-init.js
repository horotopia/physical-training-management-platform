db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

db.createUser({
  user: process.env.MONGO_USER,
  pwd: process.env.MONGO_PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: process.env.MONGO_INITDB_DATABASE,
    },
  ],
});

db.createCollection("trainingRooms");
db.trainingRooms.insertMany([
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b4f"),
    name: "Horotopia",
    capacity: 25,
    specializations: ["web", "mobile", "data"],
    adress: ObjectId("60f4b6e1e9f0f4001f6b3b50"),
    responible: ObjectId("60f4b6e1e9f0f4001f6b3b56"),
    exercises: [
      ObjectId("60f4b6e1e9f0f4001f6b3b60"),
      ObjectId("60f4b6e1e9f0f4001f6b3b61"),
    ],
    description: ObjectId("60f4b6e1e9f0f4001f6b3b67"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b51"),
    name: "LeLion",
    capacity: 25,
    specializations: ["web", "mobile", "data"],
    adress: ObjectId("60f4b6e1e9f0f4001f6b3b52"),
    responible: ObjectId("60f4b6e1e9f0f4001f6b3b58"),
    exercises: [
      ObjectId("60f4b6e1e9f0f4001f6b3b62"),
      ObjectId("60f4b6e1e9f0f4001f6b3b63"),
    ],
    description: ObjectId("60f4b6e1e9f0f4001f6b3b68"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b53"),
    name: "LeTigre",
    capacity: 25,
    specializations: ["web", "mobile", "data"],
    adress: ObjectId("60f4b6e1e9f0f4001f6b3b54"),
    responible: ObjectId("60f4b6e1e9f0f4001f6b3b56"),
    exercises: [
      ObjectId("60f4b6e1e9f0f4001f6b3b64"),
      ObjectId("60f4b6e1e9f0f4001f6b3b65"),
    ],
    description: ObjectId("60f4b6e1e9f0f4001f6b3b69"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

db.createCollection("users");
db.users.insertMany([
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b56"),
    firstName: "John",
    lastName: "Doe",
    email: "jd@gnail.com",
    password: "123456",
    role: "owner",
    phone: "1234567890",
    address: ObjectId("60f4b6e1e9f0f4001f6b3b57"),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b58"),
    firstName: "Jane",
    lastName: "Doe",
    email: "jd@gmail.com",
    password: "123456",
    role: "owner",
    phone: "1234567890",
    address: ObjectId("60f4b6e1e9f0f4001f6b3b59"),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b55"),
    firstName: "John",
    lastName: "Smith",
    email: "js.smile@gmail.com",
    password: "123456",
    role: "superAdmin",
    phone: "$2y$10$s172NWvI.Chk4PWCK8RG/.ovixBALUSXmsORBwWrr7t31jpH7J5/y",
    address: ObjectId("60f4b6e1e9f0f4001f6b3b59"),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b54"),
    firstName: "Jane",
    lastName: "Smith",
    email: "js.best@gmail.com",
    password: "123456",
    role: "customer",
    phone: "1234567890",
    address: ObjectId("60f4b6e1e9f0f4001f6b3b59"),
  },
]);

db.createCollection("addresses");
db.addresses.insertMany([
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b57"),
    street: "123 Main St",
    city: "Springfield",
    state: "IL",
    zip: "62701",
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b59"),
    street: "124 Main St",
    city: "Springfield",
    state: "IL",
    zip: "62701",
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b50"),
    street: "001 Main St",
    city: "Springfield",
    state: "IL",
    zip: "62701",
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b52"),
    street: "002 Main St",
    city: "Springfield",
    state: "IL",
    zip: "62701",
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b54"),
    street: "003 Main St",
    city: "Springfield",
    state: "IL",
    zip: "62701",
  },
]);

db.createCollection("exercises");
db.exercises.insertMany([
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b60"),
    name: "Bench Press",
    description:
      "a bodybuilding and weightlifting exercise in which a lifter lies on a bench with the feet on the floor and raises a weight with both arms.",
    duration: 30,
    repetitions: 5,
    series: 5,
    rest: 60,
    difficulty: "hard",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b61"),
    name: "Squat",
    description:
      "a compound, full body exercise that trains primarily the muscles of the thighs, hips and buttocks, quadriceps femoris muscle, hamstrings, as well as strengthening the bones, ligaments and insertion of the tendons throughout the lower body.",
    duration: 30,
    repetitions: 5,
    series: 5,
    rest: 60,
    difficulty: "hard",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b62"),
    name: "Deadlift",
    description:
      "a weight training exercise in which a loaded barbell or bar is lifted off the ground to the level of the hips, then lowered to the ground.",
    duration: 30,
    repetitions: 5,
    series: 5,
    rest: 60,
    difficulty: "hard",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b63"),
    name: "Pull-up",
    description:
      "an upper-body strength exercise. The pull-up is a closed-chain movement where the body is suspended by the hands and pulls up.",
    duration: 30,
    repetitions: 5,
    series: 5,
    rest: 60,
    difficulty: "hard",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b64"),
    name: "Push-up",
    description:
      "a common calisthenics exercise beginning from the prone position, or the front leaning rest position known in the military.",
    duration: 30,
    repetitions: 5,
    series: 5,
    rest: 60,
    difficulty: "hard",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b65"),
    name: "Lunges",
    description:
      "a bodyweight exercise that works your hips, glutes, quads, hamstrings, and core and the hard-to-reach muscles of your inner thighs.",
    duration: 30,
    repetitions: 5,
    series: 5,
    rest: 60,
    difficulty: "hard",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b66"),
    name: "Plank",
    description:
      "an isometric core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time.",
    duration: 30,
    repetitions: 5,
    series: 5,
    rest: 60,
    difficulty: "hard",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

db.createCollection("descriptions");
db.descriptions.insertMany([
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b67"),
    installations: ["projector", "shower", "wifi"],
    equipments: ["elliptical bike", "dumbbells", "treadmill"],
    activities: ["Bodybuilding", "Body Combat", "Crossfit"],
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b68"),
    installations: ["projector", "shower", "wifi"],
    equipments: ["elliptical bike", "dumbbells", "treadmill"],
    activities: ["Bodybuilding", "Body Combat", "Crossfit"],
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b69"),
    installations: ["projector", "shower", "wifi"],
    equipments: ["elliptical bike", "dumbbells", "treadmill"],
    activities: ["Bodybuilding", "Body Combat", "Crossfit"],
  },
]);
