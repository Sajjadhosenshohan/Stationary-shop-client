import React from "react";
import {
  useActivateAccountMutation,
  useChangeRoleMutation,
  useDeactivateAccountMutation,
  useGetAllUserDataQuery,
} from "../../redux/Features/userManagement/userManagement.api";
import { toast } from "sonner";
import UserManagementTable from "../../components/Table/UserManagementTable";

const Users: React.FC = () => {
  const { data: response, isFetching } = useGetAllUserDataQuery(undefined, {
    // pollingInterval: 2000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [activateAccount] = useActivateAccountMutation();
  const [deactivateAccount] = useDeactivateAccountMutation();
  const [changeRole] = useChangeRoleMutation();

  const handleActivate = async (id: string) => {
    try {
      const result = await activateAccount({ id }).unwrap();
      toast.success(result.message);
    } catch (error) {
      toast.error("Failed to activate account");
    }
  };

  const handleDeactivate = async (id: string) => {
    try {
      const result = await deactivateAccount({ id }).unwrap();
      toast.success(result.message);
    } catch (error) {
      toast.error("Failed to deactivate account");
    }
  };

  const handleRoleChange = async (role: string, email: string) => {
    try {
      const result = await changeRole({ role, email }).unwrap();
      toast.success(result.message);
    } catch (error) {
      toast.error("Failed to change role");
    }
  };
  return (
    // <div className="min-h-screen bg-gray-50 p-6">
    //   <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              User Management
            </h1>
          </div>

          <UserManagementTable
            users={response?.data || []}
            loading={isFetching}
            onActivate={handleActivate}
            onDeactivate={handleDeactivate}
            onRoleChange={handleRoleChange}
          />
        </div>
    //   </div>
    // </div>
  );
};

export default Users;
