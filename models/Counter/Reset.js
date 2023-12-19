async function reset() {
    const sequence = await this.find();
    const result = await this.findOneAndUpdate(
      { _id: sequence._id },
      { $set: { sequence_value: 0 } },
      { upsert: true, new: true }
    );
    return result.sequence_value;
};

export default reset;