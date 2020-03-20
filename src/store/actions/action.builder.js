export default function (
    target,
    task,
    actionState,
    
    requestPayload,
    payload,
    error
    ) {
        return {
            target:target, 
            task:task, 
            actionState:actionState,
            requestPayload:requestPayload,  
            payload:payload, 
            error:error};
};