module.exports = (server) => {
    const Schema = server.mongoose.Schema;
    const ProjectSchema = new Schema({
        name: {
            type: String,
            required: true
        }
    });

    return server.mongoose.model('Project', ProjectSchema);
}