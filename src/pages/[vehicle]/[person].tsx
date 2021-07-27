import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { VehiclePerson } from "../../../api/VehiclePerson";

export interface PersonProps {
    ownersList?: VehiclePerson[];
}

const Person = ({ ownersList }: PersonProps) => {
    const router = useRouter();
    
    const [owners, setOwners] = useState(ownersList);

    useEffect(() => {
        async function loadData(){
            const response = await fetch("http://localhost:4001/vehicles?ownerName="+ router.query.person+"&vehicle="+ router.query.vehicle);

            const ownersList: VehiclePerson[] | undefined = await response.json();
      setOwners(ownersList);
        }

        if (ownersList?.length == 0) {
            loadData();
        }
    }, []);

    if (!owners?.[0]) {
        return <div>loading...</div>;
    }

    return <pre>{owners[0]?.details}</pre>;
    
    return (
        
        <div>
            <h2>{router.query.person}&apos;s {router.query.vehicle}</h2>
        </div>
    )
}

Person.getInitialProps = async ({query, req}: NextPageContext) => {
    if (!req) {
      return { ownersList: [] };
    }
  
    const response = await fetch(
      'http://localhost:4001/vehicles?ownerName=' +
        query.person +
        '&vehicle=' +
        query.vehicle
    );
    const ownersList: VehiclePerson[] | undefined = await response.json();
    return { ownersList: ownersList };
  };

export default Person
