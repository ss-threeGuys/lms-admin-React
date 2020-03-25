export default function (
    target,
    task,
    actionState,
    
    requestPayload,
    payload,
    error
    ) {
        return {
            type:target+'/'+task+'/'+actionState,
            target:target, 
            task:task, 
            actionState:actionState,
            requestPayload:requestPayload,  
            payload:payload, 
            error:error};
};