import {Link} from 'react-router-dom';

function Menu(){
    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10">
            <h1 className="text-2xl font-bold">Personas</h1>
            <ul className="flex gap-x-2">
                <li>
                    <Link to='/add-person' className='bg-sky-600 px-4 py-1 rounded-sm'>Add Person</Link>
                </li>
                <li>
                    <Link to='/list-people' className='bg-sky-600 px-4 py-1 rounded-sm'>Show people</Link>
                </li>
                {/* <li>
                    <Link to='/update-person' className='bg-sky-600 px-4 py-1 rounded-sm'>Update Person</Link>
                </li>
                <li>
                    <Link to='/delete-person/' className='bg-red-600 px-4 py-1 rounded-sm'>Delete Person</Link>
                </li> */}
            </ul>
        </nav>
    );
}

export default Menu;