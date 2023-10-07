import mongoose from "mongoose"; 


const ifExists = async function(email) {
    const user = await this.constructor.findOne({ email });
    if(user) {
      if(this.id === user.id) {
        return true;
        }
      return false;
    }
    return true;
  }

  const isEmailCorrect = async function(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

  const emailValidators = [
    { validator: ifExists, msg: 'Email is already in use' },
    { validator: isEmailCorrect, msg: 'Wrong email format' }
    ];


const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    first_name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true

    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: emailValidators
    }
});


const Student = mongoose.model('Student', StudentSchema);

export default Student;