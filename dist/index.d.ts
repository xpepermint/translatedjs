export declare const defaultFormats: {
    number: {
        integer: {
            maximumFractionDigits: number;
        };
        decimal: {
            maximumFractionDigits: number;
        };
        currency: {
            style: string;
            currency: string;
            currencyDisplay: string;
        };
    };
    date: {
        decimal: {
            maximumFractionDigits: number;
        };
    };
};
export declare class I18n {
    locale: string;
    messages: any;
    formats: any;
    constructor({locale, messages, formats}: {
        locale: string;
        messages?: any;
        formats?: any;
    });
    formatNumber(value: number, options?: any): string;
    formatDate(value: number | Date, options?: any): string;
    formatTime(value: number | Date, options?: any): string;
    formatRelativeTime(value: number, options?: any): any;
    formatMessage(key: string, vars?: any): any;
}
