const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const dateNightSchema = new mongoose.Schema({
  nameOfDate: { type: String },
  when: { type: Date },
  image: { type: String },
  rating: { type: Number },
  comments: { type: String },
  complete: { type: Boolean },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  dateAddress: { type: String },
  geometry: {
    lat: { type: Number },
    lng: { type: Number }
  },
  cinema: {
    name: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    id: { type: Number },
    film: { type: String},
    showTime: { type: String }
  },
  restaurant: {
    name: { type: String },
    lat: { type: Number},
    lng: { type: Number }
  }
});

dateNightSchema
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

dateNightSchema //delete image if it is replaced
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    return `https://s3-eu-west-1.amazonaws.com/wdi-london-25/${this.image}`;
  });

dateNightSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

dateNightSchema.pre('remove', function deleteImage(next) {
  if(this.image)return s3.deleteObject({ Key: this.image }, next);
  next();
});

module.exports = mongoose.model('DateNight', dateNightSchema);
