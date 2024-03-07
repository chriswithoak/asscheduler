import { selectSource } from '../services/api-service'

export const getSourceId = async ( headers: any, sourceType: any, sourceValue: any ) => {
    const sourceModel = { 
        type: sourceType, 
        value: sourceValue 
    };

    const result = await selectSource(headers, sourceModel);
    if ( result.rowsAffected > 0) {
        return result.rows[0]['Id'];
    }

    if ( sourceType === "Region") {
        return 'd8af122a-f46b-1410-fc98-00155d043204';
    } 
        
    return await createSource( headers, sourceModel );
}

const createSource = async ( headers:any, sourceModel: any ) => {
    // TODO: CREATE SOURCE (add & replace logic on original)

    return "";
}