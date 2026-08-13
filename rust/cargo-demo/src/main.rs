fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[..i];
        }
    }

    &s
}

fn main() {
    let str: String = String::from("hello world!");
    let word = first_word(&str);
    println!("word is {word}")
}
