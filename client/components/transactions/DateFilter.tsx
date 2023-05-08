'use client'
import { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import format from 'date-fns/format';
import { addMonths, formatDistance, formatISO, getDate, getDaysInMonth, isEqual, toDate } from 'date-fns';

function dateToMonth(date: Date): string {
    const month = format(date, "MMMM y")
    return month
}

function DateFilter() {
    const [date, setDate] = useState(new Date());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const month = dateToMonth(date);

    return (
        <div className='relative z-10'>
            <div className="flex items-center gap-4">
                <AiOutlineLeft size={20} className='text-color2 hover:' onClick={() => setDate(addMonths(date, -1))} />
                <div className='bg-color2 py-4 px-8 rounded-full text-white font-bold w-56 text-center cursor-pointer' onClick={() => setIsDatePickerOpen(true)}>{month}</div>
                <AiOutlineRight size={20} className='text-color2' onClick={() => setDate(addMonths(date, 1))} />
            </div>
            <DatePicker open={isDatePickerOpen} setOpen={setIsDatePickerOpen} setInterval={() => {}}/>
        </div>
    );
}

interface RangePickerProps {
    date: Date
    setDate: (date: Date) => void;
}

const RangePicker: React.FC<RangePickerProps> = ({ date, setDate}) => {
    const month = dateToMonth(date);
    const daysInMonth = getDaysInMonth(date);

    let datesArr = [];

    for (let i = 0; i < daysInMonth; i++) {
        datesArr.push(toDate(new Date(date.getFullYear(), date.getMonth(), i + 1)))
    }

    return (
        <>
            <div className='col-span-3 row-start-2 row-end-3 w-full border-2'>
                <div className="flex items-center gap-4">
                    <AiOutlineLeft className='cursor-pointer' size={14} onClick={() => setDate(addMonths(date, -1))} />
                    <div className='py-2 px-8 rounded-full w-full text-center select-none'>{month}</div>
                    <AiOutlineRight className='cursor-pointer' size={14} onClick={() => setDate(addMonths(date, 1))} />
                </div>
            </div>

            <div className='col-span-3 row-start-3 row-end-5 grid grid-cols-7 w-full border-2'>{datesArr.map((d, i) => (
                <div className={`col-span-1 hover:bg-gray-500 select-none cursor-pointer ${isEqual(d, date) && 'bg-gray-600'}`} onMouseEnter={() => console.log(d, date)} onClick={() => setDate(d)}>{getDate(d)}</div>
            ))}</div>
        </>
    )
}

interface DatePickerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setInterval: (startDate: Date, endDate: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ open, setOpen, setInterval }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    if (!open)
        return null;

    return (
        <div className='absolute p-4 rounded-md shadow-md w-screen max-w-lg right-0 top-full translate-y-4 -z-10 grid grid-cols-6 grid-row-5 gap-2 place-items-center place-content-center outline-1 outline-gray-500 text-center bg-white'>
            <span className='col-span-2 row-start-1 row-end-2 text-xl p-4'>{format(startDate, "dd/MM/yyyy")}</span>
            <div className='col-span-2 row-start-1 row-end-2 p-4'>
                {formatDistance(startDate, endDate)}
            </div>
            <span className='col-span-2 row-start-1 row-end-2 text-xl p-4'>{format(endDate, "dd/MM/yyyy")}</span>
            <RangePicker date={startDate} setDate={setStartDate} />
            <RangePicker date={endDate} setDate={setEndDate} />


            <button onClick={() => setOpen(false)}>Cancel</button>
            <button onClick={() => setInterval(startDate, endDate)}>Ok</button>
        </div>
    )
}

export default DateFilter;