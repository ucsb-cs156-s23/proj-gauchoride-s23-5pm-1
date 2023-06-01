import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UsersTable from "main/components/Users/UsersTable"
import UserCheckbox from "main/components/Users/UserCheckbox"


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
/*
    const { data: allRiders, error: __error, status: __status } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            ["/api/admin/riders"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/admin/riders" },
            []
        );

    const { data: allDrivers, error: _error, status: _status } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            ["/api/admin/drivers"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/admin/drivers" },
            []
        );
   */     
    

    return (
        <BasicLayout>
            <h2>Users</h2>
            <UserCheckbox></UserCheckbox>
            <UsersTable users={allUsers} />
        </BasicLayout>
    );
};

export default AdminUsersPage;
