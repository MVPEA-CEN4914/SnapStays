const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
    name: {String, required: true},
    email: {String, required: true, unique : true},
    password: {String, required: true},
    },
    {collection : 'users'}
)

const model = mongoose.model ('UserSchema', UserSchema);

module.exporsts = model;