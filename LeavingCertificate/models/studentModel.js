var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    _id:Number
    ,name:String
    ,caste:String
    ,birthPlace:String
    ,motherTongue:String
    ,dob:Date
    ,lastSchool:String
    ,doa:Date
    ,freeSeat:String
    ,classAdmitted:String
    ,progress:String
    ,conduct:String
    ,dol:Date
    ,classLeft:String
    ,remark:String
}) 

module.exports = mongoose.model('StudentModel',StudentSchema)