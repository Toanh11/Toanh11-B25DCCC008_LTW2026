import React from "react";
import StudentItem from "./StudentItem";

const StudentList = ({ students, remove}) => {
    return (
        <table border="1" style={{ margin: '0 auto', textAlign: 'center', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
                <tr>
                    <th style={{ padding: '10px' }}>ID</th>
                    <th style={{ padding: '10px' }}>Ho Ten</th>
                    <th style={{ padding: '10px' }}>Diem</th>
                    <th style={{ padding: '10px' }}>Lop</th>
                    <th style={{ padding: '10px' }}>Hanh Dong</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student => (
                    <StudentItem key={student.id} student={student} remove={remove}/>
                ))}
            </tbody>
        </table>
    );
};

export default StudentList;