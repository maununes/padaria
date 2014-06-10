package controllers;

import play.*;
import play.mvc.*;
import play.api.libs.json.*;

import views.html.*;

public class Application extends Controller {

    public static Result index(String nome) {
        return ok(("Bem vindo, "+nome));
    }

}
