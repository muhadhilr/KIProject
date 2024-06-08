const profileRepository = require("./profile.repository");

const addUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await profileRepository.createUser(email, password, role);
    res.status(201).json({
      data: user,
      message: "Register Sukses",
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Gagal Bos",
    });
  }
};

const loginUser =  async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await profileRepository.loginUser(email, password);
    res.status(200).json({
      data: user,
      message: "Login Sukses",
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Gagal Bos",
    });
  }
}

module.exports = {
  addUser, loginUser
};
