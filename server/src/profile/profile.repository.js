const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../db/prisma.db");

const createUser = async (email, password, role) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    const profile = await db.prisma.profile.create({
      data: {
        email,
        password: hash,
        role,
      },
    });
    return profile;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const loginUser = async (email, password) => {
  try {
    const profile = await db.prisma.profile.findUnique({
      where: { email },
    });
    if (profile && (await bcrypt.compare(password, profile.password))) {
      const token = jwt.sign(
        { id: profile.id, email: profile.email, role: profile.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return { token };
    }
    return null;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  createUser, loginUser
};
