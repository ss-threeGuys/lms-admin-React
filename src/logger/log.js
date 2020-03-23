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

const genericLogFunction = console.log;

let genericLogWarningDisplayed = false;

export function logger(thisLevel, message, ...optionalParams){

    let level = environment.log;

    if (setting[thisLevel].level >= setting[level].level) {

        let loggingFunction = genericLogFunction;
        
        if (setting[thisLevel].severity !== 'log')   
            loggingFunction = console[setting[thisLevel].severity]?console[setting[thisLevel].severity]:genericLogFunction;
                    
        loggingFunction('['+setting[thisLevel].abbr+'] ', message, ...optionalParams);
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

if (window) {
    window.__defineGetter__('verbose' ,() => {
        let prevLevel = environment.log;
        environment.log = LogLevel.TRACE;
        return 'Change log level from '+prevLevel+' to '+environment.log;
    });

    window.__defineGetter__('quiet', () => {
        let prevLevel = environment.log;
        environment.log = LogLevel.NONE;
        return 'Change log level from '+prevLevel+' to '+environment.log;
        
    });

    window.LogLevel = {...LogLevel};

    console.info('Log Level is ', environment.log,'.');
    console.log('Type \'verbose\' to turn ON log message.');
    console.log('Type \'quite\' to turn OFF log message.');



    console.log = (message, ...optionalParams) => {
        if (!genericLogWarningDisplayed) {
            console.warn("Your console.log(message) may not show up, unless you turn ON the log message.");
            console.warn("Please consider using log API -- Krissada")            
        }
        genericLogWarningDisplayed = true;
        logger(LogLevel.TRACE, "* "+message, ...optionalParams);
    }
}

