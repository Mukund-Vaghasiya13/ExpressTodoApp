import mongoose, { Schema, SchemaTypes } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const TodoSchema = new mongoose.Schema({

    refId:{
        type:Schema.Types.ObjectId,
        ref: "User"
    },
    todos:{
        type:String
    }

},{
    timestamps:true
})

TodoSchema.plugin(mongooseAggregatePaginate)

export const Todo = new mongoose.model("Todo",TodoSchema)
