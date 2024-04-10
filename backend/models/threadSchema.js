const mongoose = require('mongoose')

function getRandomLikesCount() {
    return Math.floor(Math.random() * 1000);
}

const threadSchema = mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: String,
    content: String,
    likes_count: {type:Number, default: getRandomLikesCount},
    profile_id: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
},{
    timestamps: true
})

const Thread = mongoose.model("Thread", threadSchema)
module.exports = Thread