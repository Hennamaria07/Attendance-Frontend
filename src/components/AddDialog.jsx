// AddDialog.js  
import React, { useState } from 'react';  
import { useForm, Controller } from 'react-hook-form';  
import { yupResolver } from '@hookform/resolvers/yup';  
import * as yup from 'yup';  
import { axiosInstance } from '@/lib/axiosIntance';  
import { toast } from 'react-toastify';  
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { CirclePlus } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';

const schema = yup.object().shape({  
    title: yup.string().required('Title is required')  
});  

const AddDialog = () => {  
    const [loading, setLoading] = useState(false);  
    const [open, setOpen] = useState(false);  

    const { handleSubmit, control, formState: { errors } } = useForm({  
        resolver: yupResolver(schema)  
    });  

    const onSubmitProject = async (data) => {  
        setLoading(true);  
        axiosInstance.post('/api/v1/projects/add', data, {withCredentials: true})  
        .then(res => {  
            toast.success(res.data.message);  
            setOpen(false);  
            setLoading(false);  
        }).catch(err => {  
            toast.error(err.response.data.message);  
            setLoading(false);  
        })  
    };  

    return (  
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='border-blue-600 p-3 border rounded-lg text-blue-600 hover:bg-white bg-white'>
                <span>Add New Project</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Project</DialogTitle>
                </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitProject)}>  
            <div className="grid gap-4">
                        <Label htmlFor="title">Title</Label>
                        <div>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="title"
                                    {...field}
                                    className="col-span-3"
                                />
                            )}
                        />
                        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            className="w-full mt-5 bg-blue-600"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add'}
                        </Button>
                    </DialogFooter>
        </form>  
        </DialogContent>
        </Dialog>
    );  
};  

export default AddDialog;
            