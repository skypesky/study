struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let user: User = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };

    let user2 = User {
        username: String::from("111"),
        ..user
    };

    println!("username is {}", user2.username);
    println!("email is {}", user2.email);
}
