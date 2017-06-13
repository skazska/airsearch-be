/**
 * Created by ska on 6/8/17.
 */
"use strict";

if (typeof Object.create !== "function") {
    Object.create = function (proto, propertiesObject) {
        if (!(proto === null || typeof proto === "object" || typeof proto === "function")) {
            throw TypeError('Argument must be an object, or null');
        }
        var temp = new Object();
        temp.__proto__ = proto;
        Object.defineProperties(temp, propertiesObject);
        return temp;
    };
}

function extend(Parent, proto, object) {
    var Child = function () {
        Parent.call(this);
    };

    Child.prototype = Object.create(Parent.prototype, object);
    Child.prototype.constructor = Child;
    Child.prototype.superclass = Parent.prototype;
    Child.prototype = Object.assign(Child.prototype, proto);


    Child.prototype.extend = function(proto, object){
        return extend(Child, proto, object);
    };

    return Child;
}

function Common () {
    this.events = {};
};
Common.prototype = Object.create(null);
Common.prototype.on = function(eventName, fn) {
    if( !this.events[eventName] ) {
        this.events[eventName] = [];
    }

    this.events[eventName].push(fn);

    return this;
};
Common.prototype.off = function(eventName, fn) {
    this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
    return this;
};

Common.prototype.emit = function(eventName, data){
    const event = this.events[eventName];
    if( event ) {
        event.forEach(fn => {
            fn.call(null, data);
        });
    }

    return this;
};

Common.prototype.destroy = function () {
    delete this.events;
};

Common.prototype.extend = function (proto, object) {
    return extend(Common, proto, object);
};


export default Common;