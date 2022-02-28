import axios from '../axios';

export const CourseService = {
    //Get Json curses from the server(backend)
    getAllCourses: function() {
        return axios.get('/api/courses');
    },
    getEnrolledCourses: function () {
        return axios.get('/api/student/courses');
    },
    enrollCourse: function (courseName) {
        return axios.post("/api/student/course", {
            courseName
        });
    },
    dropCourse: function (courseName) {
        return axios.delete("/api/student/course", {
            data: {
                courseName
            }
        });
    },
};