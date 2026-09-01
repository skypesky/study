#[derive(Debug)]
struct Rectangle {
    width: u8,
    height: u8,
}

impl Rectangle {
    fn area(&self) -> u8 {
        return self.width * self.height;
    }
}

fn main() {
    let r = Rectangle {
        width: 4,
        height: 8,
    };

    println!("area is {}", r.area());
}
