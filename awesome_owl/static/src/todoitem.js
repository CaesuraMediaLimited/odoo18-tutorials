import { Component, useState } from "@odoo/owl";

export class TodoItem extends Component {
    static template = "awesome_owl.TodoItem";
    static props = {
       id          : {type : Number},
       description : {type : String},
       isCompleted : {type : Boolean},
       toggleDone  : {type : Function},
       removeTodo  : {type : Function},
    };
    toggle () {
       this.props.toggleDone (this.props.id);
    }
    removeThis () {
       this.props.removeTodo (this.props.id);
    }
}

