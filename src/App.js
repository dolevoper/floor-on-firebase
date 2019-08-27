import React, { useState, useEffect } from 'react';
import { Grid, Cell, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import { Headline6, Body1 } from '@material/react-typography'
import Fab from '@material/react-fab';
import TextField, { Input } from '@material/react-text-field';

import './App.scss';
import { StudentsList } from './StudentsList';
import { StudentDialog } from './StudentDialog';
import { studentsApi } from './studentsApi';

function App() {
  const [term, setTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({ name: '', email: '' });
  const [error, setError] = useState();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setError();

        const res = await studentsApi.get();

        setStudents(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed fetching students.');
      }
    };

    fetchStudents();
  }, []);

  const getStudents = () => students.filter(student => {
    const lowerTerm = term.toLowerCase()

    return student.name.toLowerCase().includes(lowerTerm) || student.email.includes(lowerTerm);
  });

  const handleCreateStudent = async () => {
    try {
      setError();

      const res = await studentsApi.post('', currentStudent);

      setStudents([...students, res.data]);
    } catch (err) {
      console.error(err);
      setError('Failed creating student.');
    }
  };

  const handlePriceSelected = async (studentId, price) => {
    try {
      setError();
      
      await studentsApi.post(`/${studentId}/entrance`, { price });
    } catch (err) {
      console.error(err);
      setError('Failed recording student entrance.');
    }
  };

  return (
    <>
      <Grid>
        <Row>
          <Cell></Cell>
          <Cell columns={4}>
            <Headline6>Floor on Firebase</Headline6>
            {error && <Body1 className='mdc-theme--error'>{error}</Body1>}
          </Cell>
        </Row>
        <Row>
          <Cell></Cell>
          <Cell columns={4}>
            <TextField trailingIcon={<MaterialIcon icon='search' />} fullWidth>
              <Input value={term} onChange={e => setTerm(e.target.value)} />
            </TextField>
            <StudentsList students={getStudents(students)} onPriceSelected={handlePriceSelected} />
            <Fab icon={<MaterialIcon icon='add' />} onClick={() => setStudentDialogOpen(true)} />
          </Cell>
        </Row>
      </Grid>
      <StudentDialog
        student={currentStudent}
        onStudentChange={setCurrentStudent}
        onCreate={handleCreateStudent}
        onClose={() => {
          setStudentDialogOpen(false);
          setCurrentStudent({ name: '', email: '' });
        }}
        open={studentDialogOpen} />
    </>
  );
}

export default App;