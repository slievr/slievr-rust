#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate rocket;
extern crate rocket_contrib

use rocket_contrib::Template;

#[get("/")]
fn index() -> Template {
    //let context = /* object-like value */;
    //Template::render("index", &context)
    Template::render("index")
}

fn main() {
    rocket::ignite().mount("/", routes![index]).launch();
}
