const timestamps = require('mongoose-timestamps');

module.exports = (server) => {
    const Schema = server.mongoose.Schema;
    const UserSchema = new Schema({
        name: {
            type: String,
            default: 'unknown'
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Todo'
            }
        ],
        teams: [
          {
            team :{
                type: Schema.Types.ObjectId,
                ref: 'Team'
            },
            role : {
                type: Schema.Types.ObjectId,
                ref: 'Role'
            }
          }
        ],
    });

    UserSchema.plugin(timestamps);
    return server.mongoose.model('User', UserSchema);
};
