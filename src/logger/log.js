import { environment } from "../environments/environment";


export const LogLevel = {
    NONE        : 'LOGLEVEL:NONE',
    CRITICAL    : 'LOGLEVEL:CRITICAL',
    ERROR       : 'LOGLEVEL:ERROR',
    WARNING     : 'LOGLEVEL:WARNING',
    INFORMATION : 'LOGLEVEL:INFORMATION',
    DEBUG       : 'LOGLEVEL:DEBUG',
    TRACE       : 'LOGLEVEL:TRACE',

}

const setting = {
    [LogLevel.NONE]          : {abbr: 'N', level: 7, severity: 'log'},
    [LogLevel.CRITICAL]      : {abbr: 'C', level: 6, severity: 'error'},
    [LogLevel.ERROR]         : {abbr: 'E', level: 5, severity: 'error'},

    [LogLevel.WARNING]       : {abbr: 'W', level: 4, severity: 'warn'},

    [LogLevel.INFORMATION]   : {abbr: 'I', level: 3, severity: 'info'},
    [LogLevel.DEBUG]         : {abbr: 'D', level: 2, severity: 'debug'},
    [LogLevel.TRACE]         : {abbr: 'T', level: 1, severity: 'log'},
}


export function logger(thisLevel, message, ...optionalParams){

    let level = environment.log;

    if (setting[thisLevel].level >= setting[level].level) {
        let loggingFunction = console[setting[thisLevel].severity];
        
        if (!loggingFunction)
            loggingFunction = console.log;
            
        loggingFunction('['+setting[thisLevel].abbr+'] ', message, optionalParams);
    }
}

export default {
    critical : (message, ...optionalParams) => {
        logger(LogLevel.CRITICAL, message, ...optionalParams);
    },

    error : (message, ...optionalParams) => {
        logger(LogLevel.ERROR, message, ...optionalParams);
    },

    warning : (message, ...optionalParams) => {
        logger(LogLevel.WARNING, message, ...optionalParams);
    },

    info : (message, ...optionalParams) => {
        logger(LogLevel.INFORMATION, message, ...optionalParams);
    },

    debug : (message, ...optionalParams) => {
        logger(LogLevel.DEBUG, message, ...optionalParams);
    },

    trace : (message, ...optionalParams) => {
        logger(LogLevel.TRACE, message, ...optionalParams);
    },
}