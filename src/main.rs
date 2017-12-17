#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate rocket;
extern crate rocket_contrib;

use std::collections::HashMap;

use rocket_contrib::Template;

#[get("/")]
fn index() -> Template {
    
    let context = TemplateContext {
        name: "name",
        items: vec!["One", "Two", "Three"].iter().map(|s| s.to_string()).collect()
    };
    Template::render("index", &context)
}

fn main() {
    rocket::ignite().mount("/", routes![index]).launch();
}
