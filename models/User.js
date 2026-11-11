const mongoose = require('mongoose');

// Schéma d'un utilisateur
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Le nom est obligatoire'], trim: true },
    email: {
      type: String,
      required: [true, "L'e-mail est obligatoire"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    age: { type: Number, min: 0 },
  },
  { timestamps: true } // ajoute createdAt et updatedAt
);

// Export du modèle User (collection "users")
module.exports = mongoose.model('User', userSchema);
