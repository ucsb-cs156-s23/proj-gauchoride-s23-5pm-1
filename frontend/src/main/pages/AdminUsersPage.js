import {React, useState} from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UsersTable from "main/components/Users/UsersTable"


import { useBackend } from "main/utils/useBackend";
const AdminUsersPage = () => {

    const { data: allUsers, error: _error, status: _status } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            ["/api/admin/users"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/admin/users" },
            []
        );
    const [isCheckedAll, setIsCheckedAll] = useState(true);
    const [isCheckedDrivers, setIsCheckedDrivers] = useState(false);
    const [isCheckedRiders, setIsCheckedRiders] = useState(false);
    const handleOnChangeAll = () => {
      setIsCheckedAll(true);
      setIsCheckedDrivers(false);
      setIsCheckedRiders(false);
    };
    const handleOnChangeDrivers = () => {
        setIsCheckedDrivers(true);
        setIsCheckedAll(false);
        setIsCheckedRiders(false);
      };
    const handleOnChangeRiders = () => {
        setIsCheckedRiders(true);
        setIsCheckedAll(false);
        setIsCheckedDrivers(false);
    };


    // Stryker disable all
    const { data: allRiders, error: __error1, status: __status1 } =
        useBackend(
            ["/api/admin/users/riders"],
            { method: "GET", url: "/api/admin/users/riders" },
            []
        );

    const { data: allDrivers, error: _error2, status: _statu2 } =
        useBackend(
            ["/api/admin/users/drivers"],
            { method: "GET", url: "/api/admin/users/drivers" },
            []
        );
    // Stryker restore all
    var tableContent = isCheckedAll ? allUsers : (isCheckedDrivers ? allDrivers : allRiders);
    return (
        <BasicLayout>
            <h1>Users</h1>
            <div className="userType">
                <h5>User Type:
                <input
                type="checkbox"
                id="all"
                name="all"
                value="All"
                checked={isCheckedAll}
                onChange={handleOnChangeAll}
                />
                <label htmlFor="all">All</label>
                <input
                type="checkbox"
                id="drivers"
                name="drivers"
                value="Drivers"
                checked={isCheckedDrivers}
                onChange={handleOnChangeDrivers}
                />
                <label htmlFor="drivers">Drivers</label>
                <input
                type="checkbox"
                id="riders"
                name="riders"
                value="Riders"
                checked={isCheckedRiders}
                onChange={handleOnChangeRiders}
                />
                <label htmlFor="riders">Riders</label>
                </h5>
            </div>
            <UsersTable users={tableContent} />
        </BasicLayout>
    );
};

export default AdminUsersPage;
