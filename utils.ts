export const isNotNumber = (argument: any): boolean =>
    isNaN(Number(argument));

export const isEmpty = (): boolean => 
    process.argv.length <4;

