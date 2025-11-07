const { ObjectId } = require("mongodb");

class ContactService {
  constructor(db) {
    this.Contact = db.collection("contacts");
  }

  async create(payload) {
    const contact = {
      name: payload.name,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      favorite: payload.favorite === true,
    };
    const result = await this.Contact.insertOne(contact);
    return result;
  }

  async findAll() {
    return await this.Contact.find({}).toArray();
  }

  async findById(id) {
    return await this.Contact.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
    const update = { $set: payload };
    const result = await this.Contact.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async delete(id) {
    const result = await this.Contact.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }
}

module.exports = ContactService;
