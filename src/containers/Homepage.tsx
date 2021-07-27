import Link from 'next/link';

const HomePage = () => {
    return (
        <div>
            <h1>Hello</h1>

            <Link href="/people">
                <a>People</a>
            </Link>
            <hr/>
            <Link href="/vehicles">
                <a>Vehicles</a>
            </Link>
        </div>
    )
}

export default HomePage;
