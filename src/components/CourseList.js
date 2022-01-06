import React, {useState} from 'react';
import Course, {getCourseTerm} from './Course';
import TermSelector from './TermSelector';

const CourseList = ({ courses }) => {
    const [term, setTerm] = useState('Fall');
    const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));

    return (
        <>
            <TermSelector term={term} setTerm={setTerm}/>
            <div className="course-list">
                { termCourses.map(course => <Course key={course.id} course={ course } />) }
            </div>
        </>
    );
}

export default CourseList;