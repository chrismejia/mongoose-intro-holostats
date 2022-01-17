const mongoose = require("mongoose");

main().catch((err) => console.error(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");

  /**
   * 1. Defining the schema
   */
  const kittySchema = new mongoose.Schema({
    name: String,
  });

  /**
   * 4. Now that the `okayu` Kitten model-based document has been created,
   * we can go back and add methods to the schema.
   * Schema methods must be added BEFORE compiling it with `mongoose.model()`!
   *
   * Since schema are simply JS objects, we can assign a `methods` key-value pair that'll contain that schema's objects. We can then assign a key within `methods` to represent the method name and assign its value to a named function expression.
   */

  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? `NYAN, my name is ${this.name}, nyan!`
      : `I don't have a name, nyan.`;
    console.log(greeting);
  };

  /**
   * 2. Compiling the `kittySchema` into a Model.
   * Accepts a string to serve as model name and the schema used for compilation.
   */
  const Kitten = mongoose.model("Kitten", kittySchema);

  /**
   * 3. Create a kitten document using the model class defined above.
   * This document will have the properties and behaviors as defined by our schema.
   */
  const okayu = new Kitten({ name: "Okayu" });
  console.log(okayu.name); // Okayu

  /**
   * 5. Schema functions get compiled into that Model prototype and exposed on each document instance. These schema functions can then be invoked just like any other dot-method would in JS.
   */

  const fuzzy = new Kitten({ name: "Fuzzy" });
  fuzzy.speak(); // NYAN, my name is Fuzzy, nyan!

  /**
   * 6. We've created two documents based off of the Kitten model, and even invoked a schema method, but neither has been saved to the database yet. We can do so using the `.save()` async method.
   */
  await fuzzy.save();

  /**
   * 7. We can also display ALL the kitten documents we've seen using the async `.find()` method, which we call off the Model we want to search through.
   */
  const allKittens = await Kitten.find();
  console.log(allKittens);
}
