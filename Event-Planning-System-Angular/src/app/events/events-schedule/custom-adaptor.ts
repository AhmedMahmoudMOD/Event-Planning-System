import { ODataV4Adaptor } from '@syncfusion/ej2-data';

export class CustomODataV4Adaptor extends ODataV4Adaptor {
    override processResponse(data: any, ds?: any, query?: any, xhr?: any, request?: any, changes?: any) {
        // Call the base class method to get the initial processed data
        const original = super.processResponse(data, ds, query, xhr, request, changes);

        // Convert startTime and endTime fields to Date objects
        if (Array.isArray(original)) {
            return original.map(event => ({
                ...event,
                startTime: new Date(event.startTime),
                endTime: new Date(event.endTime)
            }));
        }

        return original;
    }
}
