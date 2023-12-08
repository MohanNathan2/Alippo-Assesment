// ParentComponent.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../components/dataTable';

interface DataItem {
    name: string | null;
    age: number;
    city: string;
    pinCode: string | null;
}

const ParentComponent: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get<DataItem[]>('https://assets.alippo.com/catalog/static/data.json');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEdit = (index: number, newColumn1Value: string) => {
        const newData = [...data];
        newData[index].name = newColumn1Value;
        setData(newData);
    };

    const handleDelete = (index: number) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
    };

    return (
        <DataTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
    );
};

export default ParentComponent;
