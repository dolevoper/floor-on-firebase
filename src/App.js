import React, { useState } from 'react';
import { Grid, Cell, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import { Headline6 } from '@material/react-typography'
import Fab from '@material/react-fab';

import './App.scss';
import { StudentsList } from './StudentsList';
import { StudentDialog } from './StudentDialog';
import TextField, { Input } from '@material/react-text-field';

function App() {
  const [term, setTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({ name: '', email: '' });

  const getStudents = () => students.filter(student => {
    const lowerTerm = term.toLowerCase()
    
    return student.name.toLowerCase().includes(lowerTerm) || student.email.includes(lowerTerm);
  });

  const handlePriceSelected = price => console.log(price);

  return (
    <>
    <Grid>
      <Row>
        <Cell></Cell>
        <Cell columns={4}><Headline6>Floor on Firebase</Headline6></Cell>
      </Row>
      <Row>
        <Cell></Cell>
        <Cell columns={4}>
          <TextField trailingIcon={<MaterialIcon icon="search" />} fullWidth>
            <Input value={term} onChange={e => setTerm(e.target.value)} />
          </TextField>
          <StudentsList students={getStudents(students)} onPriceSelected={handlePriceSelected} />
          <Fab icon={<MaterialIcon icon="add" />} onClick={() => setStudentDialogOpen(true)} />
        </Cell>
      </Row>
    </Grid>
    <StudentDialog
      student={currentStudent}
      onStudentChange={setCurrentStudent}
      onCreate={() => setStudents([...students, currentStudent])}
      onClose={() => {
        setStudentDialogOpen(false);
        setCurrentStudent({ name: '', email: '' });
      }}
      open={studentDialogOpen} />
    </>
  );
}

export default App;