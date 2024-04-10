const mongoose = require('mongoose');

const cities = ["Casablanca", "Rabat", "Marrakech", "Fes", "Tangier"];
const languages = ["English", "French", "Arabic", "Spanish"];

function getRandomLanguage() {
    return languages[Math.floor(Math.random() * languages.length)];
}

function getRandomCity() {
    return cities[Math.floor(Math.random() * cities.length)];
}

function getRandomFollowersCount() {
    return Math.floor(Math.random() * 1000);
}

function getRandomAge() {
    return Math.floor(Math.random() * 60);
}

const profileSchema = mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    followers_count: {type:Number, default: getRandomFollowersCount},
    language: {type: String, default: getRandomLanguage},
    city: {type: String, default: getRandomCity},
    country: {type:String, default: "Morocco"},
    age: {type:Number, default: getRandomAge}
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
