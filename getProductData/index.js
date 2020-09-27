'use strict'
const AWS = require('aws-sdk');
AWS.config.update({region:"ap-south-1"});
exports.handler=async (event,context,callback)=>{
    const ddb=new AWS.DynamoDB({apiVersion:"2012-10-08"});
    const documentClient=new AWS.DynamoDB.DocumentClient({region:"ap-south-1"});
    let responseBody="";
    let statusCode=0;

    const{id}=event.pathParameters;

    const params={
        TableName:"First_DB",
        Key:{
            id:id

        }
    }
    try 
    {
        let data=await documentClient.get(params).promise();   
        responseBody=JSON.stringify(data.Item);
        statusCode=200;
        // console.log(data);
    } 
    catch (error) 
    {
        responseBody="Invalid QR CODE";
        statusCode=403;
    //   console.log(error);
    }
    var response = {
        statusCode: statusCode,
        headers: {
            "my_header": "test"
        },
        body: responseBody,
        isBase64Encoded: false
    };
    callback(null, response);

    // const response={
    //     statuscode:statusCode,
    //     headers:{
    //         "myHeader":"test"
    //     },
    //     body:responseBody
    // }
    return response
}
