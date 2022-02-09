const mongoose = require("mongoose");
const Idol = require("./schema/Idol");

// const idol1 = new Idol({ name: "Ina", height: 157 });

run();

async function run() {
  try {
    const idol = await Idol.find();
    console.log(idol);
  } catch (err) {
    console.error(err.message);
  }
}

mongoose.connect("mongodb://localhost/crashCourse", () => {
  console.log("Connected to crashCourse DB!"),
    (err) => {
      console.error(err);
    };
});
