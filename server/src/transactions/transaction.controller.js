const transactionRepository = require("./transaction.repository");

const getAllTransaction = async (req, res) => {
  try {
    const data = await transactionRepository.findAll();
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Oops something went wrong!",
    });
  }
};

const getTransactionById = async (req, res) => {
  const idTransaction = parseInt(req.params.id);
  try {
    const data = await transactionRepository.findById(idTransaction);
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Oops something went wrong!",
    });
  }
};

const markTransactionAsPaidOff = async (req, res) => {
  const transactionId = parseInt(req.params.id);
  const { paidoff } = req.body;
  try {
    const updatedTransaction = await transactionRepository.updateByid(
      transactionId,
      paidoff
    );
    res.send({
      data: updatedTransaction,
      message: "update transaction success",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      message: "Oops something went wrong!",
    });
  }
};

const addTransaction = async (req, res) => {
  const { username, noTable, items } = req.body; // items should be an array of { menuId, amount }

  try {
    const newTransaction = await transactionRepository.createTransaction(
      username,
      noTable,
      items
    );
    res.status(201).json({
      status: "success",
      data: newTransaction,
      message: "Transaction created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      message: "Oops something went wrong!",
    });
  }
};

module.exports = {
  getAllTransaction,
  getTransactionById,
  markTransactionAsPaidOff,
  addTransaction,
};
