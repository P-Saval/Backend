const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema; 

const userSchema = new Schema(
    {
     username: {type: String, required: true, trim: true},
     email: {type: String, required: true, trim: true},
     password: {
        type: String, 
        required: true,
        trim: true,
        minlength: [6, "Password 8 characters minimum"],
     },
     image: {type: String, trim: true, required: true},
     post: [{ type: mongoose.Types.ObjectId, ref: "posts"}],
     role: {type: String, required: true, enum: [ "User", "Admin" ], default: "User"}
    
}, {
    timestamps: true,
})
userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

const User = mongoose.model("users", userSchema, "users");
module.exports = User;