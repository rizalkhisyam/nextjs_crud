import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar">
        <Link href="/">
            <a className="navbar-brand">Dashboard</a>
        </Link>

        <Link href="/new">
            <a className="navbar-brand">Create Post</a>
        </Link>
    </nav>
)

export default Navbar;