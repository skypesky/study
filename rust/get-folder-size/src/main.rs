extern crate fs_extra;
use fs_extra::dir::get_size;

fn main() {
    let folder_size = get_size("/Users/skypesky/bug-bash/.blocklet-server").unwrap();
    println!("{}", folder_size); // print directory sile in bytes
}
