
const routeController =  require('../controllers/routeController');

const studentController = require("../controllers/studentController");

const Router = (app) =>{
    app.get('/',routeController.homePage);
    app.get('/student',routeController.studentPage);
    app.route('/teacher')
    .get(routeController.teacherPage)
    .post(routeController.newTeacher);


    app.post("/teacherLogin",routeController.teacherLogin);


    //post
    app.post("/student", studentController.newStudent);
}
  
    module.exports = Router;