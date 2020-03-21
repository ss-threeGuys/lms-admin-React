import store from '../../store';


export default class PromiseReducer {

    
    constructor(target) {

        this.target = target;



        this.filterFunction = (action) => {

            if (action.target !== this.target)
                return false;

            return true;
        };

        this.mapFunction = (action) => {


            if (action.task === Task.RETRIEVE)
                return action.payload;

            if (action.task === Task.CREATE)
                return action.payload;

            if (action.task === Task.UPDATE)
                return [action.requestPayload];

            if (action.task === Task.DELETE)
                return [action.requestPayload]; 


            
        };

        this.mutationFunction = (store, action, mapFunction) => {
           
            if (action.task === Task.RETRIEVE) {
                store.payload = mapFunction(action);
            } 

        };

        store.subscribe( (action) => this.actionHandler(action) );

    }

    get( mapFunction ) {
        return mapFunction(this.payload);
    }

    mapStateToProps(state, ownProps)  {
        return state[this.target];
    }

    mapDispatchToProp(dispatch, ownProps) {

    }

    // on(event: string | symbol, listener: (...args: any[]) => void) {
    //     //console.log('Listener registered');
    //     this.storeEventEmitter.on(event, listener);
    // }

    // removeListener(event: string | symbol, listener: (...args: any[]) => void) {
    //     this.storeEventEmitter.removeListener(event, listener);
    // }

    set filter ( filterFunction ) {
        this.filterFunction = filterFunction.bind(this);
    }

    set map( mapFunction ) {
        this.mapFunction = mapFunction.bind(this);
    }

    set mutation ( mutationFunction ) {
        this.mutationFunction = mutationFunction.bind(this);
    }

    actionHandler( action ) {
        //console.log(action);
        if (!this.filterFunction(action)) {
            //console.log('Not my job!', action.target, this.target)
            return false;
        }

        switch(action.state) {
            case ActionState.STARTED:
                this.state = StoreState.PENDING;
                //console.log('Store Start',StoreEvent.CHANGE, action);
                this.storeEventEmitter.emit(StoreEvent.CHANGE, action);
                return;

            case ActionState.FULFILLED:
                //console.log("FULFILLED",this.mutationFunction);
           
                this.mutationFunction(this, action, this.mapFunction);
                this.state = StoreState.SUCCESS;
                //console.log('Store Fulfiled',this.payload, this.mapFunction(action));
                this.storeEventEmitter.emit(StoreEvent.CHANGE, action);
                return;

            case ActionState.REJECTED:
                this.state = StoreState.ERROR;
                this.storeEventEmitter.emit(StoreEvent.ERROR, action);
                return;

            default:
                this.storeEventEmitter.emit(StoreEvent.IGNORE, action);
                return;
        }
    }

}