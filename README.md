## Timeline

Online version of the [classic game](http://www.amazon.com/Timeline-Historical-Events-Card-Game/dp/2914849869/ref=pd_sim_21_1?ie=UTF8&dpID=51i4IfOEIaL&dpSrc=sims&preST=_AC_UL160_SR141%2C160_&refRID=1WXSN1GDK2BMAZ2WXTQ0) and demo app for using [Ember.js](http://emberjs.com/) with [PhoenixFramework](http://www.phoenixframework.org/).  See also the [Phoenix Timeline server](https://github.com/kagemusha/phoenix-timeline)

Currently very WIP.  To get a (not so very well styled :-)) feel for the game, look at the [standalone](https://github.com/kagemusha/timeline/tree/standalone) branch, which uses [ember-cli-mirage](https://github.com/samselikoff/ember-cli-mirage)

See [ember-cli.com](http://ember-cli.com/) for help with ember-cli

## Running Standalone

    Clone the project
    timeline-dir> git checkout branch standalone  #omit this step to run version together with phoenix server
    timeline-dir> npm install && bower install
    timeline-dir> ember serve
    
    Point your browser to http://localhost:4200/
    
## Running with Phoenix Server

Run the [Phoenix Timeline server](https://github.com/kagemusha/phoenix-timeline) as instructed there
    
Follow the steps above under *Running Standalone*, but don't check out *standalone* branch
    
