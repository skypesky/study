use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("Guess the number!");
    let secret_number = rand::thread_rng().gen_range(1..=100);
    // println!("The secret number is: {secret_number}");
    println!("Please input your guess.");

    let mut attempts = 0;
    loop {
        attempts += 1;
        let mut guess = String::new();
        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");
        let guess: u32 = guess.trim().parse().expect("Please type a number!\n");
        println!("You guessed use {attempts} times: {guess}");

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                println!("It took you {attempts} guesses.");
                break;
            }
        }
    }
}
