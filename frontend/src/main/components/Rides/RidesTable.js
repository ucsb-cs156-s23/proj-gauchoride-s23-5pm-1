
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
        }
    ];


    return <OurTable
        data={rides}
        columns={buttonColumn}
        testid={"RidesTable"}
    />;
};