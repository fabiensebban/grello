const timestamps = require('mongoose-timestamps');

module.exports = (server) => {
    const Schema = server.mongoose.Schema;
    const ProjectSchema = new Schema({
        name: {
            type: String,
            required: true
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        team: {
          type: Schema.Types.ObjectId,
          ref: 'Team'
        },

        todos: [{
          type: Schema.Types.ObjectId,
          ref: 'Todo'
        }]
    });

    ProjectSchema.plugin(timestamps);

    return server.mongoose.model('Project', ProjectSchema);
}
