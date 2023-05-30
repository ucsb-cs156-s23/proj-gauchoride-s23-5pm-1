
import OurTable, { ButtonColumn } from "main/components/OurTable"
import { useBackendMutation } from "main/utils/useBackend";



export default function RidesTable({rides}) {

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'First Name',
            accessor: 'givenName',
        },
        {
            Header: 'Last Name',
            accessor: 'familyName',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Driver',
            id: 'driver',
            accessor: (row, _rowIndex) => String(row.driver) // hack needed for boolean values to show up
        },
        {
            Header: 'Rides',
            accessor: 'rides',
        }
    ];

    return <OurTable
        data={rides}
        columns={columns}
        testid={"RidesTable"}
    />;
};