import { hasConflict } from "../utilities/times";
import { getCourseTerm } from "../utilities/times";

const getCourseNumber = course => (
    course.id.slice(1, 4)
);

const toggle = (x, lst) => (
    lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

const timeParts = meets => {
    const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
    return !match ? {} : {
        days,
        hours: {
            start: hh1 * 60 + mm1 * 1,
            end: hh2 * 60 + mm2 * 1
        }
    };
};

const mapValues = (fn, obj) => (
    Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

const addCourseTimes = course => ({
    ...course,
    ...timeParts(course.meets)
});

export const addScheduleTimes = schedule => ({
    title: schedule.title,
    courses: mapValues(addCourseTimes, schedule.courses)
});

const Course = ({ course, selected, setSelected }) => {
    const isSelected = selected.includes(course);
    const isDisabled = !isSelected && hasConflict(course, selected);
    const style = {
        backgroundColor: isDisabled ? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
    };
    return (
        <div className="card m-1 p-2" style={style} onClick={isDisabled ? null : () => setSelected(toggle(course, selected))}>
            <div className="card-body">
                <div className="card-title">{getCourseTerm(course)} CS {getCourseNumber(course)}</div>
                <div className="card-text">{course.title}</div>
                <div className="card-text">{course.meets}</div>
            </div>
        </div>
    );
}

export default Course;