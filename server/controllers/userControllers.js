const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");
const { PhoneNumber } = require("twilio").twiml;
const { User, Basket } = require("../models/model");
require("dotenv").config();

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(twilioAccountSid, twilioAuthToken);

exports.registrations = async (req, res, next) => {
  const { phone_number, username, role, verification_code } = req.body;

  try {
    // Check if the user already exists with the provided phone number
    const existingUser = await User.findOne({ where: { phone_number } });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this phone number already exists" });
    }

    // Generate a verification code
    const generatedVerificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Save the generated verification code to the database for comparison
    await User.create({
      phone_number,
      username,
      role,
      verification_code: generatedVerificationCode,
    });

    // Send the verification code via Twilio
    sendVerificationCodeViaTwilio(phone_number, generatedVerificationCode);

    return res
      .status(201)
      .json({ message: "Verification code sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Function to send verification code via Twilio
async function sendVerificationCodeViaTwilio(phoneNumber, verificationCode) {
  try {
    await client.messages.create({
      to: phoneNumber,
      from: twilioPhoneNumber,
      body: `Your verification code is: ${verificationCode}`,
    });
    console.log("Verification code sent successfully");
  } catch (error) {
    console.error("Error sending verification code:", error);
  }
}
exports.login = async (req, res, next) => {
  const { phone_number, verification_code } = req.body;

  try {
    const user = await User.findOne({ where: { phone_number } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided verification code matches the one stored in the database
    if (user.verification_code !== verification_code) {
      return res.status(401).json({ message: "Invalid verification code" });
    }

    // Mark the user as verified
    user.is_verified = true;
    await user.save();

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.adminLogin = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Retrieve the admin username and password from .env
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Compare the provided username and password with the values from .env
    const isUsernameValid = username === adminUsername;
    const isPasswordValid = bcrypt.compare(password, adminPassword);

    if (!isUsernameValid || !isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Admin user authenticated successfully
    return res.status(200).json({ message: "Admin login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};