import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import RidesTable from "main/components/Rides/RidesTable"

import { useBackend } from "main/utils/useBackend";
const AdminRidesPage = () => {

    const { data: rides, error: _error, status: _status } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            ["/api/admin/rides"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/admin/rides" },
            []
        );

    return (
        <BasicLayout>
            <h2>Rides</h2>
            <RidesTable rides={rides} />
        </BasicLayout>
    );
};

export default AdminRidesPage;
