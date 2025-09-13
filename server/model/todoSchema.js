const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

let todoSchema = new Schema({
  name: {
    type: String,
    require: true,
    minLength: 3,
  },
  age: {
    type: Number,
  },
});

module.exports = mongoose.model("TodoList", todoSchema);
