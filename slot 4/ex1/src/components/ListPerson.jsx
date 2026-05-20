import React from 'react';

function ListPerson() {
    const people = [
        { name: 'Alice', age: 15 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 25 },
        { name: 'Avid', age: 40 },
        { name: 'Eve', age: 18 },
        { name: 'Frank', age: 18 },
        { name: 'Grace', age: 55 },
        { name: 'Ceidi', age: 20 },
        { name: 'Ivan', age: 25 },
        { name: 'Budy', age: 50 }
    ];

    const sortedPeople = [...people].sort((a, b) => {
        if (a.name === b.name) {
            return b.age - a.age;
        }
        return a.name.localeCompare(b.name);
    });

    return (
        <div style={{ padding: '20px' }}>
            <h1>List of People</h1>

            <table
                border="1"
                cellPadding="10"
                cellSpacing="0"
                style={{
                    borderCollapse: 'collapse',
                    width: '500px',
                    textAlign: 'center'
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>

                <tbody>
                    {sortedPeople.map((person, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{person.name}</td>
                            <td>{person.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListPerson;