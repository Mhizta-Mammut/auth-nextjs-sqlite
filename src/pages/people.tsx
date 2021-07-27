import { NextPageContext } from "next";
import { myGet } from "../../api/myGet";

const people = ({ people }: any) => {
    return (
        <div>
            <h1>Hello People </h1>
            { JSON.stringify(people) }
        </div>
    )
}

people.getInitialProps = async (ctx: NextPageContext) => {

    const json = await myGet('http://localhost:3000/api/people', ctx);
    return json

}

export default people;
