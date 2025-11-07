const ContactService = require("../services/contact.service");
const { connectToDatabase } = require("../utils/mongodb.util");

exports.create = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const service = new ContactService(db);
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("❌ Error creating contact:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const service = new ContactService(db);
    const contacts = await service.findAll();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.findOne = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const service = new ContactService(db);
    const contact = await service.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Not found" });
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const service = new ContactService(db);
    const updated = await service.update(req.params.id, req.body);
    if (!updated.value) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updated.value);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const service = new ContactService(db);
    const deleted = await service.delete(req.params.id);
    if (!deleted.value) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
