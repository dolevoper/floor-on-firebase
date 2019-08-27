import React, { useRef } from 'react';
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from '@material/react-dialog';
import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import { Button } from '@material/react-button';

export const StudentDialog = ({ student = {}, onStudentChange, onCreate, onClose, open }) => {
    const nameInputRef = useRef();
    const emailInputRef = useRef();

    const handleChange = e => {
        onStudentChange && onStudentChange({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const handleClose = (action, e) => {
        if (action === 'create') {
            if (!canSubmit) return;

            onCreate && onCreate();
        }

        onClose && onClose();
    };

    const canSubmit = () => 
        nameInputRef.current &&
        nameInputRef.current.isValid() &&
        emailInputRef.current &&
        emailInputRef.current.isValid();

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Student</DialogTitle>
            <DialogContent>
                <TextField
                    className="student-input"
                    label="Name"
                    leadingIcon={<MaterialIcon icon="person" />}>
                    <Input name="name" value={student.name} onChange={handleChange} ref={nameInputRef} required />
                </TextField>
                <TextField
                    className="student-input"
                    label="Email"
                    leadingIcon={<MaterialIcon icon="email" />}>
                    <Input type="email" name="email" value={student.email} onChange={handleChange} ref={emailInputRef} required />
                </TextField>
            </DialogContent>
            <DialogFooter>
                <DialogButton action="cancel">Cancel</DialogButton>
                {
                    canSubmit() ?
                        <DialogButton action="create" isDefault raised>Create</DialogButton> :
                        <Button disabled raised>Create</Button>
                }
            </DialogFooter>
        </Dialog>
    );
};