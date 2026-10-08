import React, { useState } from 'react';
import StudentList from './components/StudentList';

const App = () => {
  const initialStudents = [
    { id: 1, name: 'Stephen Hawking', score: 9, classSV: 'LoDenVuTru&VatLyLuongTu' },
    { id: 2, name: 'Monkey D Luffy', score: 4, classSV: 'OnePiece' },
    { id: 3, name: 'Kudo Shinichi', score: 10, classSV: 'ThamTuLungDanhConan' }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [filterType, setFilterType] = useState('ALL');
  const [formData, setFormData] = useState({ name: '', score: '', classSV: '' });

  const handleAddStudent = (e) => {
    e.preventDefault();
    const { name, score, classSV } = formData;
    const numScore = parseFloat(score);

    if (!name || !score || !classSV) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    if (numScore < 0 || numScore > 10) {
      alert('Điểm số không hợp lệ!');
      return;
    }

    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;

    const newStudent = {
      id: newId,
      name,
      score: numScore,
      classSV
    };
    
    setStudents([...students, newStudent]);
    setFormData({ name: '', score: '', classSV: '' });
  };

  const handleDelete = (id) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
  };

  let displayedStudents = students;
  if (filterType === 'GIOI') {
    displayedStudents = students.filter(s => s.score >= 8); 
  } else if (filterType === 'TRUOT') {
    displayedStudents = students.filter(s => s.score < 5);
  }

  const totalStudents = displayedStudents.length;
  const averageScore = totalStudents === 0 ? 0 : 
    (displayedStudents.reduce((sum, s) => sum + s.score, 0) / totalStudents).toFixed(2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '30px' }}>
      <h1>Quản lý Điểm Sinh viên</h1>

      <form onSubmit={handleAddStudent}>
        <input 
          placeholder="Ho Ten" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
          style={{ margin: '0 5px', padding: '5px' }}
        />
        <input 
          type="number" 
          placeholder="Diem" 
          value={formData.score} 
          onChange={e => setFormData({...formData, score: e.target.value})} 
          style={{ margin: '0 5px', padding: '5px' }}
        />
        <input 
          placeholder="Lop" 
          value={formData.classSV} 
          onChange={e => setFormData({...formData, classSV: e.target.value})} 
          style={{ margin: '0 5px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px 15px' }}>Thêm</button>
      </form>

      <div style={{ margin: '20px 0' }}>
        <button onClick={() => setFilterType('ALL')} style={{ margin: '0 5px' }}>All</button>
        <button onClick={() => setFilterType('GIOI')} style={{ margin: '0 5px' }}>Sinh vien Gioi {"(>=8)"}</button>
        <button onClick={() => setFilterType('TRUOT')} style={{ margin: '0 5px' }}>Sinh vien Truot {"(<5)"}</button>
      </div>
   
      <div style={{ marginBottom: '20px' }}>
        <p>{`Tong so sinh vien: ${totalStudents}`}</p>
        <p>{`Diem trung binh: ${averageScore}`}</p>
      </div>

      <StudentList students={displayedStudents} remove={handleDelete} />
    </div>
  );
};

export default App;