const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  { 
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      required:[true, "User Not Found  try using login"],
      ref:"User"
    },
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: [true, "Please enter a email address"],
    },
    num:{
        type: Number,
        required: [true, "Please enter a number"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact",contactSchema);