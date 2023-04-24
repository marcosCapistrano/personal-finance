import React from 'react'

const data = [
    {
        date: new Date(),
        description: "oieoieoe",
        category: "food",
        account: "nuconta",
        amount: 120.00
    },
    {
        date: new Date(),
        description: "oieoieoe",
        category: "food",
        account: "nuconta",
        amount: 120.00
    },
    {
        date: new Date(),
        description: "oieoieoe",
        category: "food",
        account: "nuconta",
        amount: 120.00
    },
];

const Table2 = () => {
  return (
    <table className='
    bg-white 
       p-4 
       border-collapse 
       w-full 
    [&>tr:nth-child(2n)]:bg-slate-200
    [&>tr>th]:text-left
    [&>tr]:p-4'>
        <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Account</th>
            <th>Amount</th>
            <th>Actions</th>
        </tr>

        {data.map((d, i) => (
            <tr key={i}>
                <td data-cell="date">{d.date.toLocaleDateString('pt-br', {dateStyle: 'short'})}</td>
                <td data-cell="description">{d.description}</td>
                <td data-cell="category">{d.category}</td>
                <td data-cell="account">{d.account}</td>
                <td data-cell="amount">{d.amount}</td>
                <td data-cell="actions">none</td>
            </tr>
        ))}
    </table>
  )
}

export default Table2