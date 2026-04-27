function App() {
    const username = "John Doe";
    return (
        <div className="App">
            <Navbar username={username} />
            <h1>Welcome, {username}!</h1>
            <p>This is a simple React application.</p>
            <UserProfile username={username} />
        </div>
    );
}
function Navbar({username}) {
    return (
        <nav>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>{username}</li>
            </ul>
        </nav>
    );
}
function UserProfile({username}) {
    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <p>Name: {username}</p>
        </div>
    );
}