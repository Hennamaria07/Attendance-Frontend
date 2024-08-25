import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "./ui/button";
import generateTimeOptions from '@/lib/generateTimeOption';
import { axiosInstance } from '@/lib/axiosIntance';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    project: yup.string().required('Project is required'),
    date: yup.date().required('Date is required'),
    timeIn: yup.string().required('Time In is required'),
    timeOut: yup.string().required('Time Out is required'),
});

const Form = () => {
    const timeOptions = generateTimeOptions();
    const [projects, setProjects] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);

    const { handleSubmit, control, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (inputValue.length > 0) {
            axiosInstance.get(`/api/v1/projects/get-all?title=${inputValue}`, { withCredentials: true })
                .then(res => {
                    setProjects(res.data.data);
                })
                .catch(err => console.log(err.response.data.message || err));
        } else {
            setProjects([]);
        }
    }, [inputValue]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setShowDropdown(value.length > 0 && projects.length > 0);
    };

    const handleSelectItem = (title, id) => {
        setInputValue(title);
        setValue('project', id); // Set the selected project ID
        setShowDropdown(false);
    };

    const onSubmit = async (data) => {
        console.log('Form submitted', data); // Add this line to check if the form submission is working
        axiosInstance.post('/api/v1/attendance/add', data, { withCredentials: true })
            .then(res => {
                toast.success(res.data.message);
            })
            .catch(err => {
                toast.error(err.response.data.message || err);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
            <div className="grid items-center sm:flex sm:justify-between gap-5">
                <div className="relative flex flex-col gap-2 sm:min-w-[50%] md:min-w-[60%] xl:min-w-[78%]">
                    <p className="font-medium text-blue-600">Project</p>
                    <div className="relative flex items-center">
                        <Controller
                            name="project"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    value={inputValue}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleInputChange(e);
                                    }}
                                    placeholder="What are you working on?"
                                    className="flex h-11 w-full rounded-md bg-white pl-10 border text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            )}
                        />
                    </div>
                    {errors.project && <p className="text-red-600">{errors.project.message}</p>}
                    {showDropdown && (
                        <ul className="absolute z-10 top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto">
                            {projects.map((project) => (
                                <li
                                    key={project._id}
                                    onClick={() => handleSelectItem(project.projectTitle, project._id)}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                >
                                    {project.projectTitle}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-medium text-blue-600">Date</p>
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => {
                            return (
                                <input
                                    type="date"
                                    id="date"
                                    {...field} // Spread the field props
                                    className="py-2 px-2 w-full sm:w-[280px]"
                                />
                            )
                        }}
                    />
                    {errors.date && <p className="text-red-600">{errors.date.message}</p>}
                </div>
            </div>
            <div className="grid items-center sm:flex gap-5">
                <div className="flex gap-5">
                    <div>
                        <p className="font-medium text-blue-600">Time In</p>
                        <Controller
                            name="timeIn"
                            control={control}
                            render={({ field }) => (
                                <select
                                    id="timeIn"
                                    {...field}
                                    className="w-full sm:w-[200px] py-2 px-2"
                                >
                                    <option value="">Select a time</option>
                                    {timeOptions.map(({ value, label }) => (
                                        <option key={value} value={label}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                        {errors.timeIn && <p className="text-red-600">{errors.timeIn.message}</p>}
                    </div>
                    <div>
                        <p className="font-medium text-blue-600">Time Out</p>
                        <Controller
                            name="timeOut"
                            control={control}
                            render={({ field }) => (
                                <select
                                    id="timeOut"
                                    {...field}
                                    className="py-2 px-2 w-full sm:w-[200px]"
                                >
                                    <option value="">Select a time</option>
                                    {timeOptions.map(({ value, label }) => (
                                        <option key={value} value={label}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                        {errors.timeOut && <p className="text-red-600">{errors.timeOut.message}</p>}
                    </div>
                </div>
                <div className="flex items-center mt-6">
                    <Button type="submit" className="h-9 w-[200px] sm:w-[160px] md:w-[200px] bg-blue-600 text-white">Add</Button>
                </div>
            </div>
        </form>
    );
}

export default Form;
