import React, {useEffect, useState} from 'react';
import CourseTable from "../components/CourseTable";
import {CourseService} from "../services/CourseService";
import MessageDialog from "../components/util/MessageDialog";

export default function EnrolledCourses() {

    const [courses, setCourses] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return (
        <div>
            <CourseTable courses = {courses} actionName="Drop" action={handleDropCourse}/>
            <MessageDialog open={openDialog}
                handleClose={() => setOpenDialog(false)}
                messageType={messageType}
                message={message}/>
        </div>
    );

    async function handleDropCourse(courseName) {
        try {
            await CourseService.dropCourse(courseName);
            setOpenDialog(true);
            setMessageType('success');
            setMessage(`Course ${courseName} dropped successfully!`);
            //alert(`Course ${courseName} dropped successfully!`);
            getEnrolledCourses();
        } catch (e) {
            setOpenDialog(true);
            setMessageType('fail');
            setMessage(`Course ${courseName} dropped failed!`);
            console.error(e);
            //alert(`Course ${courseName} dropped failed!`);
        }

    }

    async function getEnrolledCourses() {
        try {
            const response = await CourseService.getEnrolledCourses();
            setCourses((response.data));
        } catch (e) {
            console.error(e);
        }
    }
}