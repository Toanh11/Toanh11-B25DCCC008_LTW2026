import React from "react";

const StudentItem = ({student, remove}) => {
    const {id, name, score, classSV} = student;

    return  (
        <tr> 
            <td style={{ padding: '10px' }}>{id}</td>
            <td style={{ padding: '10px' }}>{name}</td>
            <td style={{ padding: '10px' }}>{score}</td>
            <td style={{ padding: '10px' }}>{classSV}</td>
            <td style={{ padding: '10px' }}>
                <button onClick={() => remove(id)}>Xoa</button>
            </td>
        </tr>
    );
};

export default StudentItem;