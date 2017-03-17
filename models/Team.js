const timestamps = require('mongoose-timestamps');

module.exports = (server) => {

    const Schema = server.mongoose.Schema;

    const TeamSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        project: {
          type: Schema.Types.ObjectId,
          ref: 'Project',
          required: true
        },
        members: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                role: {
                    type: Schema.Types.ObjectId,
                    ref: 'Role'
                }
            }
        ],
    });

    TeamSchema.plugin(timestamps);
    return server.mongoose.model('Team', TeamSchema);
}
