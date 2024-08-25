import { AttendanceTable, Form } from "@/components";
import AddDialog from "@/components/AddDialog";


const Home = () => {


  return (
   <div>
    <div className="w-full justify-end flex">
    <AddDialog/>
    </div>
    <Form />
    <AttendanceTable />
   </div>
  );
};

export default Home;
