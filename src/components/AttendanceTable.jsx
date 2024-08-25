import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"
import { axiosInstance } from '@/lib/axiosIntance';
import moment from 'moment';
import { DeleteIcon, Trash, X } from 'lucide-react';
import { toast } from 'react-toastify';


const AttendanceTable = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axiosInstance.get('/api/v1/attendance/get-all', { withCredentials: true })
            .then(res => setData(res.data.data))
            .catch(err => console.log(err.response.data.message || err))
    }, [data]);
    
    const handleDelete = (id) => {
        axiosInstance.get(`/api/v1/attendance/${id}`, { withCredentials: true })
        .then(res => toast.success(res.data.message))
        .catch(err => toast.error(err.response.data.message || err))
    }
    return (
        <div className='mt-5'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Project Title</TableHead>
                        <TableHead>Employee Name</TableHead>
                        <TableHead>Clock In</TableHead>
                        <TableHead>Clock Out</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                        {data?.map(data => (
                    <TableRow key={data?._id}>
                            <TableCell>
                                {data?.project?.projectTitle}
                            </TableCell>
                            <TableCell>
                                {data?.user?.name}
                            </TableCell>
                            <TableCell>
                                {data?.timeIn}
                            </TableCell>
                            <TableCell>
                                {data?.timeOut}
                            </TableCell>
                            <TableCell>
                                {moment(data.date).format('DD MMMM YYYY')}
                            </TableCell>
                            <TableCell>
                                <X className='cursor-pointer w-6 h-6' onClick={(e) => handleDelete(data._id)}/>
                            </TableCell>
                    </TableRow>
                        ))}
                </TableBody>
            </Table>

        </div>
    )
}

export default AttendanceTable