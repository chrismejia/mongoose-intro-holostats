const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema({
  streamTags: [String],
  fanArt: [String],
});

const idolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  height: Number,
  debut: Date,
  subCount: Number,
  fanName: {
    type: String,
    required: true,
  },
  unit: String,
  unitMembers: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Idol",
  },
  hashtags: hashtagSchema,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

idolSchema.methods.sayHi = function () {
  console.log(`Hello, my name is ${this.name}!`);
};

idolSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

idolSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

idolSchema.virtual("namedSubCount").get(function () {
  return `Hi, I'm ${this.name}, and I currently have ${this.subCount} subs on YouTube!`;
});

// idolSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

idolSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  throw new Error("Failed save");
});

idolSchema.post("save", function (doc, next) {
  doc.sayHi();
  next();
});

module.exports = mongoose.model("Idol", idolSchema);
