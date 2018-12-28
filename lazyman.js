function LazyMan(name) {
    var self = this;

    this.events = [];
    this.events.push({type: 'name', value: name});

    this.eat = function(value) {
        self.events.push({type: 'eat', value});
        return self;
    }
    this.sleep = function(value) {
        self.events.push({type: 'sleep', value});
        return self;
    }
    this.sleepFirst = function(value) {
        self.events.push({type: 'sleepFirst', value});
        return self;
    }
    function handleEvent(event) {
        switch(event.type) {
            case 'name':
                console.log('name:', event.value);
                break;
            case 'eat':
                console.log('eat:', event.value);
                break;
            case 'sleep':
                console.log('sleep:', event.value);
                break;
            case 'sleepFirst':
                console.log('sleepFirst:', event.value);
                break;
        }
    }
    function handle(deep) {
        if(!events[deep])
            return;
        else if(events[deep+1] && events[deep+1].type === 'sleepFirst') {
            handleEvent(events[deep+1]);
            var time = events[deep+1].value*1000;
            setTimeout(() => {
                handleEvent(events[deep]);
                deep += 2;
                handle(deep);
            }, time)
        } else if(events[deep].type === 'sleep') {
            handleEvent(events[deep]);
            var time = events[deep].value*1000;
            setTimeout(() => {
                deep += 1;
                handle(deep);
            }, time);
        } else {
            handleEvent(events[deep]);
            deep += 1;
            handle(deep);
        }
    }
    setTimeout(() => {
        var deep = 0;
        handle(deep);
    });
    return this;
}