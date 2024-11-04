const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A Restaurant name is required!"],
      unique: true,
      trim: true,
    },
    neighborhood: {
      type: String,
      trim: true,
    },
    photograph: {
      type: String,
      default: "https://unsplash.com/es/fotos/foto-del-pub-ambientado-en-la-habitacion-durante-el-dia-poI7DelFiVA",
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    latlng: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    image: {
      type: String,
      default:
        "https://unsplash.com/es/fotos/render-3d-del-vestibulo-y-la-recepcion-del-hotel-de-lujo-TkYAy9_PR_E",
    },
    cuisine_type: {
      type: String,
      required: true,
      trim: true,
    },
    operating_hours: {
      Monday: { type: String },
      Tuesday: { type: String },
      Wednesday: { type: String },
      Thursday: { type: String },
      Friday: { type: String },
      Saturday: { type: String },
      Sunday: { type: String },
    },
    reviews: [
      {
        _id: false,
        name: { type: String, required: true, trim: true },
        date: { type: Date, required: true },
        rating: { type: Number, required: true },
        comments: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

restaurantSchema.index({ latlng: "2dsphere" });

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
