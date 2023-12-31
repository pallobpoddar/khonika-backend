/*
 * Filename: auth.js
 * Author: Pallob Poddar
 * Date: September 19, 2023
 * Description: This module defines the auths collection schema
 */

// Imports necessary modules
const mongoose = require("mongoose");

// Creates a auth schema with necessary fields
const authSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: false,
		},
		failedAttempts: {
			type: Number,
			required: false,
			default: 0,
		},
		blockedUntil: {
			type: Date,
			required: false,
		},
		resetPassword: {
			type: Boolean || null,
			required: false,
			default: false,
		},
		resetPasswordToken: {
			type: String || null,
			required: false,
			default: null,
		},
		resetPasswordExpire: {
			type: Date || null,
			required: false,
			default: null,
		},
	},
	{ timestamps: true }
);

// Creates a model with the auth schema and exports it
const auth = mongoose.model("Auth", authSchema);
module.exports = auth;
