import Link from 'next/link';
import { VehiclePerson } from "../../api/VehiclePerson";

export interface detailsProps {
    ownersList: VehiclePerson[] | undefined;
}

const details = ({ ownersList }: detailsProps) => {

    const people = [
        {v : 'car', name : 'kabeer'},
        {v : 'bike', name : 'Hamisu'},
        {v : 'airplane', name : 'Muhammad'},
    ]
    return (
        <div>
            {ownersList?.map((e, index) => (
                <div key={index}>
                    <Link href={`${e.vehicle}/${e.ownerName}`}>
                        <a>Navigate to {e.ownerName}'s {e.vehicle}</a>
                    </Link>
                </div>
            ))}
        </div>
    )
}

details.getInitialProps = async () => {
    const res = await fetch("http://localhost:4001/vehicles");
    const ownersList: VehiclePerson[] | undefined  = await res.json();

    return { ownersList }
}

export default details
