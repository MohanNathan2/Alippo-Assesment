// DataTable.tsx
import React, { useState, useEffect } from 'react';
import './dataTable.css'; // Import your CSS file
import EditIcon from '../images/edit.png';
import DeleteIcon from '../images/bin.png'

interface DataItem {
    name: string | null;
    age: number;
    city: string;
    pinCode: string | null;
}

interface DataTableProps {
    data: DataItem[];
    onEdit: (index: number, newColumn1Value: string) => void;
    onDelete: (index: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onEdit, onDelete }) => {
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    const [editedValue, setEditedValue] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<DataItem[]>(data);

    useEffect(() => {
        // Update filtered data when searchQuery or data changes
        const filtered = data.filter((item) =>
            item.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);

    const handleEdit = (index: number) => {
        setEditIndex(index);
        // Set the initial edited value to the current data value
        setEditedValue(data[index].name || '');
    };

    const handleDelete = (index: number) => {
        setDeleteIndex(index);
    };

    const handleEditSubmit = () => {
        if (editIndex !== null) {
            onEdit(editIndex, editedValue);
            setEditIndex(null);
        }
    };

    const handleDeleteSubmit = () => {
        if (deleteIndex !== null) {
            onDelete(deleteIndex);
            setDeleteIndex(null);
        }
    };

    return (
        <div>
            <div className="search-container">
                <input
                    className='searchInput'
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
                <table>
                    <thead>
                        <tr>
                            <th>SL. No</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>City</th>
                            <th>Pincode</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {editIndex === index ? (
                                        <input
                                            type="text"
                                            value={editedValue}
                                            onChange={(e) => setEditedValue(e.target.value)}
                                        />
                                    ) : item.name || '-'}
                                </td>
                                <td>{item.age.toString() || '-'}</td>
                                <td>{item.city.toString() || '-'}</td>
                                <td>{item.pinCode || '-'}</td>
                                <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <img style={{ width: '32px', cursor: 'pointer' }} onClick={() => handleEdit(index)} src={EditIcon}></img>
                                    <img style={{ width: '30px', cursor: 'pointer' }} src={DeleteIcon} onClick={() => handleDelete(index)}></img>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Edit Modal */}
                {editIndex !== null && (
                    <div className="modal">
                        <div className="modal-content">
                            <div className='modal-label'>Edit Entry</div>
                            <input
                                type="text"
                                value={editedValue}
                                onChange={(e) => setEditedValue(e.target.value)}
                            />
                            <div className="button-container">
                                <button className='buttonCancel' onClick={() => setEditIndex(null)}>Cancel</button>
                                <button className='buttonSave' onClick={() => handleEditSubmit()}>Save</button>
                            </div>
                        </div>
                    </div>

                )}

                {/* Delete Modal */}
                {deleteIndex !== null && (
                    <div className="modal">
                        <div className="modal-content">
                            <div className='modal-label'>Delete Entry {deleteIndex + 1}</div>
                            <p>Are you sure you want to delete this entry?</p>
                            <div className="button-container">
                                <button className='buttonCancel' onClick={() => setDeleteIndex(null)}>Cancel</button>
                                <button className='buttonDelete' onClick={() => handleDeleteSubmit()}>Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataTable;
