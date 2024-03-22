export const sanitizeInput = ( text:any ) => {
    return text.replace("#",'').replace("’",'').replace("é",'e').replace("ó",'o').replace('”','');
}

export const handleNullText = ( text:any ) => {
    return (text !== null && text !== 'null') ? text : '';
}
