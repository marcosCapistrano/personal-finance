'use client'
import { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import format from 'date-fns/format';
import { addMonths } from 'date-fns';

function dateToMonth(date: Date): string {
    const month = format(date, "MMMM y")

    return month
}

function DateFilter() {
    const [date, setDate] = useState(new Date());
    const month = dateToMonth(date);

    return (
        <div className="flex items-center gap-4">
            <AiOutlineLeft size={20} className='text-color2' onClick={() => setDate(addMonths(date, -1))} />
            <div className='bg-color2 py-4 px-8 rounded-full text-white font-bold w-56 text-center'>{month}</div>
            <AiOutlineRight size={20} className='text-color2' onClick={() => setDate(addMonths(date, 1))} />
        </div>
    );
}

export default DateFilter;