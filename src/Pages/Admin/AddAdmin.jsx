import { useOutletContext } from "react-router-dom";
import Register from "../Register";

const AddAdmin = () => {
  const { currentRole } = useOutletContext(); // get the role passed from AdminDashboard

  if (currentRole !== "superadmin") {
    return <p className="text-red-500 font-semibold">🚫 You do not have permission to add a new admin.</p>;
  }

  return <Register isAdminCreatingUser={true} />;
};

export default AddAdmin;
