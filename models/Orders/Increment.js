async function increment() {
    const sequence = await this.find();
    const result = await this.findOneAndUpdate(
      { _id: sequence._id },
      { $inc: { sequence_value: 1 } },
      { upsert: true, new: true }
    );
    return result.sequence_value;
};

export default increment;