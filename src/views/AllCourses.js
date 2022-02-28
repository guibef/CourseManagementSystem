import React from "react";
import CourseTable from "../components/CourseTable";
import { CourseService } from "../services/CourseService";
import MessageDialog from "../components/util/MessageDialog";

export default class AllCourses extends React.Component {
    state = {
        courses: [],
        openDialog: false,
        messageType: '',
        message: ''
    }

    constructor(props) {
        super(props);
        this.handleEnrollCourse = this.handleEnrollCourse.bind(this);
    }

    componentDidMount() {
        CourseService.getAllCourses() //Promise
            .then(response => {
                const courses = response.data; // elephant
                this.setState({
                    courses: courses
                })
            })
            .catch(error => {
                console.error(error);
            });
    }

    componentWillUnmount() {

    }
    
    render() {
        return (
            <div>
                <CourseTable courses={this.state.courses} actionName="Enroll" action={this.handleEnrollCourse}/>
                <MessageDialog open={this.state.openDialog}
                               handleClose={() => this.setState({
                                   openDialog: false
                               })}
                               messageType={this.state.messageType}
                               message={this.state.message}/>
            </div>
        );
    }

    async handleEnrollCourse(courseName) {
        try {
            await CourseService.enrollCourse(courseName);
            this.setState({
                openDialog: true,
                messageType: 'success',
                message: `Course ${courseName} enrolled successfully!`
            })

        } catch (e) {
            this.setState({
                openDialog: true,
                messageType: 'fail',
                message: `Course ${courseName} already enrolled!`
            })
             console.error(e);
        }
    }
}