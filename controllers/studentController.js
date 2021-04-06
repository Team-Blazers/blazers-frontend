//reuse the teacher's api..
const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const validataForm = (formInput,state) =>{
    const errors = {
        err_No:0
    }
    formInput.forEach(input =>{
        if(input.fieldVal ==""){
            state.error.push({
                fieldName:input.fieldName,
                err:`${input.fieldName} is required`
            })
            state.success = [];
        }else{
            state.error.push({
                fieldName:input.fieldName,
                err:``
            })
        }
    });
    if(formInput[4].fieldVal !== formInput[5].fieldVal){
        state.error.push({
            fieldName:'Password',
            err:`Password mismatched`
        });
    }else{
        state.error.push({
            fieldName:'Password',
            err:``
    })
};

    state.error.forEach(inputErr =>{
        if(inputErr.err !==""){
            errors.err_No += 1;
        }
    })
    if(errors.err_No == 0){
        state.error == [];
        state.success.push({
            message:'User Successfully created'
        });
    }
    const err_No = errors.err_No;
    return {state,err_No};
    
}


const studentController = {
	
	newStudent:(req,res,next)=>{
		const FormState = {
            error:[],
            success:[]
        };   
    var firstName,lastName,MobileNumber, Email, Password, conf_Pwd;
        firstName = req.body.FirstName;
        lastName = req.body.LastName;
        MobileNumber = req.body.MobileNo,
        Email = req.body.Email,
        Password = req.body.passWord;
        conf_Pwd = req.body.confPwd;

      
const FormData = [
    {fieldVal:firstName,fieldName:'First Name'},
    {fieldVal:lastName,fieldName:"Last Name"},
    {fieldVal:MobileNumber,fieldName:'Mobile Number'},
    {fieldVal:Email,fieldName:'Email'},
    {fieldVal:Password,fieldName:"Password"},
    {fieldVal:conf_Pwd,fieldName:'Comfirm Password'}
]
//hash password
   
const formVal = validataForm(FormData,FormState);
    if (formVal.err_No !== 0) {
        res.send(formVal.state);
    } else {
        let AnewTeacher;
        bcrypt.hash(Password,10,(err,Password)=>{
            const teacher = {firstName,lastName,MobileNumber,Email,Password};
            Student.create(teacher)
            .then((newTeacher)=>{
                AnewTeacher = {firstName:newTeacher.firstName,
                    lastName:newTeacher.lastName
                 }
                 res.send(AnewTeacher);
            }).catch(err=>{
                if(err) throw err;
            })

        });
      
    }
    next();
		
		
		
		
		
	},
	studentLogin:(req,res,next)=>{
		
		var  loginState  = {
            emailErr:"",
            success:""
        }
        Student.findOne({Email:req.body.email})
        .then(user =>{
            if(user !== null){
                bcrypt.compare(req.body.password,user.Password,(err,result)=>{
                    if(result){
                        loginState.success = user.firstName+' successfully';
                    }else{
                        loginState.emailErr = "Wrong Email/Password Combination";
                }
            })

            }else{
                loginState.emailErr = "Wrong Email/Password Combination";
            }
        }).catch((err)=>{
            if(err){
                console.log(err);
            
            }
        })
        res.send(loginState);

        next();
    }

		
		
		
	}
	
	
	
	
	

module.exports = studentController;



