import * as mongoose from 'mongoose';

export const AthleteSchema = new mongoose.Schema({
    name: {type: String, required: true},
    sport: {type: String, required: true}
});

export interface Athlete extends mongoose.Document {
    id: string,
    name: string,
    sport: string
}
