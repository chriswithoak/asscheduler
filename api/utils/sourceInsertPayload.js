module.exports = function ( sourceModel ) {
    const payload = {
        "rootSchemaName": sourceModel.type,
        "operationType":1,
        "includeProcessExecutionData":true,
        "columnValues":{
           "items":{
              "Id":{
                 "expressionType":2,
                 "parameter":{
                    "dataValueType":0,
                    "value":""
                 }
              },
              "CreatedBy":{
                 "expressionType":2,
                 "parameter":{
                    "dataValueType":10,
                    "value":"410006e1-ca4e-4502-a9ec-e54d922d2c00"
                 }
              },
              "ModifiedBy":{
                 "expressionType":2,
                 "parameter":{
                    "dataValueType":10,
                    "value":"410006e1-ca4e-4502-a9ec-e54d922d2c00"
                 }
              },
              "Name":{
                 "expressionType":2,
                 "parameter":{
                    "dataValueType":1,
                    "value": sourceModel.value
                 }
              }
           }
        }
    }
  
    return payload;
  };
  