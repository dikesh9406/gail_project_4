import mongoose, { Mongoose } from 'mongoose'

const Motor = new mongoose.Schema({
    motorName : {
        type : String,
        required : true,
        maxlength : 30,
    },
    motorBrand : {
        type : String,
        required : true,
        maxlength : 20,
    },
    motorLocation : {
        type : String,
        required : true,
        maxlength : 100,
    },
    motorStatus : {
        type : String,
        required : true,
    },
    motorType : {
        type : String,
        required : true,
    },
    createdAt : {
        type : String,
        required : true,
    }
})

export default mongoose.model('motor', Motor)