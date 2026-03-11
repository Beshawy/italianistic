const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }

}, { timestamps: true });

const bcrypt = require("bcryptjs");

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.models.Admin || mongoose.model("Admin", adminSchema);