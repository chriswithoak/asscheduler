import { selectSource, insertSource } from '../services/api-service'

export const getSourceId = async ( headers: any, sourceType: any, sourceValue: any ) => {
    const sourceModel = { 
        type: sourceType, 
        value: sourceValue 
    };

    const result = await selectSource(headers, sourceModel);
    if ( result.rowsAffected > 0) {
        return result.rows[0]['Id'];
    }

    // If sourceType is Region (AKA state), avoid creating new source and return a default value.
    if ( sourceType === "Region") {
        return 'd8af122a-f46b-1410-fc98-00155d043204';
    } 
        
    return await createSource( headers, sourceModel );
}

const createSource = async ( headers:any, sourceModel: any ) => {
    const response = await insertSource( headers, sourceModel );
    return response["id"] ?? "";
}