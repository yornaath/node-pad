Object.defineProperty(Object, "extend", {
    enumerable: false,
    value: function(dest, from) {
        var props = Object.getOwnPropertyNames(from);
        props.forEach(function(name) {
            if (name in dest) {
                var destination = Object.getOwnPropertyDescriptor(from, name);
                Object.defineProperty(dest, name, destination);
            }
        });
        return dest;
    }
})