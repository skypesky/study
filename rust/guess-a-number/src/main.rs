use rand::Rng;
use std::io;
use std::io::Write;

fn main() {
    println!("猜测一个随机数字数字，范围 1 到 1000，直到猜中为止。");
    let mut done = false;
    let random_guess: u32 = rand::thread_rng().gen_range(1..=1000);
    while !done {
        let user_guess: u32 = loop {
            print!("请输入数字：");
            io::stdout().flush().unwrap();
            let mut input = String::new();
            io::stdin().read_line(&mut input).expect("读取失败");
            match input.trim().parse() {
                Ok(num) => break num,
                Err(_) => println!("请输入有效的数字，重新输入："),
            }
        };

        if user_guess > random_guess {
            println!("{user_guess} 大了");
        } else if user_guess < random_guess {
            println!("{user_guess} 小了");
        } else {
            println!("恭喜你，猜对了！答案是 {random_guess}.");
            done = true;
        }
    }
}
