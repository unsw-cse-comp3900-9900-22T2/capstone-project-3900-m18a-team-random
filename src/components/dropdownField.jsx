import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const DropdownField = ({value, label, onChange, menuItems}) => {
    return (
        <Select
            value={value}
            label={label}
            onChange={onChange}
        >
            {menuItems.map((item) => (
                <MenuItem value={item}>
                    {item}
                </MenuItem>
            ))}
        </Select>
    )
}

export default DropdownField;
