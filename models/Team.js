module.exports = (server) => {
    const Schema = server.mongoose.Schema;
    const TeamSchema = new Schema({
        name: {
            type: String,
            required: true
        }
    });

    return server.mongoose.model('Team', TeamSchema);
}