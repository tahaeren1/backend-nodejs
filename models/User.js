const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const UserSchema = new Schema({

    name: {
        type: String,
        required: [true, "Please provide a name"], // modeli true yapmazsak mongo db kaydedilmez
    },
    email: {
        type: String,
        required: [true, "Please prvide a email"],
        unique: [true], // bir tane olabilir sadece o yüzden unique kullanırız
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ] // email eşleşmesi için reg ex validation
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        minlength: [6, "Please provide a password  with  min length 6"],
        required: [true, "Please provide a password"],
        select: false // password gözükmemesi için
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    place: {
        type: String
    },
    website: {
        type: String
    },
    profile_image: {
        type: String,
        default: "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false
    }


});

//UserSchema Methods
UserSchema.methods.generateJwtFromUser = function() {
    const {JWT_SECRET_KEY,JWT_EXPIRE} = process.env;
    const payload = {
        id : this._id,
        name : this.name
    };
        const token = jwt.sign(payload, JWT_SECRET_KEY,{
            expiresIn : JWT_EXPIRE
        });
      
        return token;
};


UserSchema.pre("save", function(next){

    // eğer password içine girince değişmise true değişmemişse false döndürür
    if(!this.isModified("password")) {
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            console.log(hash)
            this.password = hash;
            next();
        });
    });

    // this burada kaydedilecek olan kulanıcının bilgilerini gösteriyo
})

module.exports = mongoose.model("User", UserSchema);