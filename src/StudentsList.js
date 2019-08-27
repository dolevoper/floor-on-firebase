import React, { forwardRef } from 'react';
import classnames from 'classnames';
import List, { ListItem, ListItemText, ListItemGraphic, ListItemMeta } from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
import { Body1 } from '@material/react-typography';
import { ChipSet, Chip } from '@material/react-chips';

const StudentMeta = forwardRef(({ entranceCount = 0, className, onPriceSelected }, ref) => {
    const handlePriceSelected = price => () => {
        onPriceSelected && onPriceSelected(price);
    };

    return (
        <ChipSet ref={ref} className={classnames(className)}>
            <Chip label='30' onClick={handlePriceSelected(30)} />
            <Chip label='40' onClick={handlePriceSelected(40)} />
            <Chip label={entranceCount} className='mdc-theme--secondary-bg mdc-theme--text-secondary-on-dark' />
        </ChipSet>
    );
});

export const StudentsList = ({ students, onPriceSelected }) => {
    if (!students || !students.length) {
        return <Body1 className='mdc-theme--text-secondary-on-light'>No students. Yet...</Body1>;
    }

    const handlePriceSelected = studentId => price => {
        onPriceSelected && onPriceSelected(studentId, price);
    };

    return (
        <List twoLine nonInteractive>
            {
                students.map(student => <ListItem key={student.email}>
                    <ListItemGraphic graphic={<MaterialIcon icon='person' />} />
                    <ListItemText
                        primaryText={student.name}
                        secondaryText={student.email}
                    />
                    <ListItemMeta meta={
                        <StudentMeta entranceCount={student.entranceCount} onPriceSelected={handlePriceSelected(student.id)} />
                    } />
                </ListItem>)
            }
        </List>
    );
};