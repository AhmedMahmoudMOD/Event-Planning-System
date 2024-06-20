import { UrlAdaptor, DataResult, Query, CrudOptions, DataOptions } from '@syncfusion/ej2-data';

// interface CustomDataResult extends DataResult {
//     keys?: string[] | undefined | (() => IterableIterator<number>);
// }

export class CustomUrlAdaptor extends UrlAdaptor {

    // override processResponse(data: DataResult | any[] | any, ds?: DataOptions, query?: Query, xhr?: Request, request?: Object, changes?: CrudOptions): DataResult {
    //     const original: CustomDataResult = super.processResponse(data, ds, query, xhr, request, changes);

    //     if (Array.isArray(original.result)) {
    //         return {
    //             ...original,
    //             result: original.result.map((event: any) => ({
    //                 ...event,
    //                 startTime: new Date(event.startTime),
    //                 endTime: new Date(event.endTime)
    //             }))
    //         };
    //     } else if (original.result && typeof original.result.keys === 'function') {
    //         const resultArray = Array.from(original.result as (() => IterableIterator<number>));
    //         return {
    //             ...original,
    //             result: resultArray.map((event: any) => ({
    //                 ...event,
    //                 startTime: new Date(event.startTime),
    //                 endTime: new Date(event.endTime)
    //             }))
    //         };
    //     } else {
    //         return original;
    //     }
    // }

    // override insert(dm: any, data: any, tableName: string = '', query?: any) {
    //     return super.insert(dm, this.formatDateFields(data), tableName, query);
    // }

    // override update(dm: any, keyField: string, data: any, tableName: string = '', query?: any) {
    //     return super.update(dm, keyField, this.formatDateFields(data), tableName, query);
    // }

    // override remove(dm: any, keyField: string, value: any, tableName: string = '', query?: any) {
    //     return super.remove(dm, keyField, value, tableName, query);
    // }

    // private formatDateFields(data: any) {
    //     return {
    //         ...data,
    //         startTime: new Date(data.startTime).toISOString(),
    //         endTime: new Date(data.endTime).toISOString()
    //     };
    // }
}
