import mongoose from "mongoose";
import CourseDao from "./CourseDao";
import SectionDao from "./SectionDao";
mongoose.connect('mongodb://localhost:27017/cs5500-test-123');

const sectionDao = SectionDao.getInstance();
const courseDao = CourseDao.getInstance();
// courseDao
//     .addSectionToCourse("61ec897218898f8a4c3ff7c8", "61ecd42ad36f1e52c243953d")
//     .then(result => console.log(result));
// courseDao.findAllCoursesDeep()
//     .then(courses => console.log(courses));
// sectionDao.findAllSectionsDeep()
//     .then(sections => console.log(sections));
// courseDao.deleteCourse('61ec835fba16e6188136169b')
//     .then(status => console.log(status));
// courseDao.updateCourse(
//     '61ec835fba16e6188136169b',
//     {title: 'new title'}
// ).then(status => console.log(status));
// courseDao.findCourseById('61ec835fba16e6188136169b')
//     .then(course => console.log(course));
courseDao.findAllCourses()
    .then(courses => console.log(courses));
// courseDao.createCourse({
//     title: 'CS1234'
// })
// .then(course => console.log(course));