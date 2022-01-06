import React from 'react';
import Course from './Course';

const CourseList = ({ courses }) => (
    <div>
    { Object.values(courses).map(course => <Course course={ course } key={course.id}/>) }
    </div>
);

export default CourseList;