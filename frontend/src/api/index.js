let connect = (cb) => {
};

const url = 'http://localhost:1234/send';

let sendMsg = (msg, args, action) => {
  
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messageBody: msg,
      arguments: args,
      action: action
    })
  }).then(
    response => response.json(),

    error => console.log('An error occurred.', error)
  )
};

let  send = async function(v, action) {
  var response = await sendMsg(v, [],action);
  return response;
}

let createBucket = async (bucketName) => {
  var response = await sendMsg(bucketName, [], "CreateBucket");
};

let deleteBucket = async (bucketName) => {
  var response = await sendMsg(bucketName, [], "DeleteBucket");
  console.log("deleted " + bucketName)
};

let listBuckets = async () => {
  var response =  sendMsg("", [], "ListBuckets");
  return response
};

export { connect, sendMsg, send, createBucket, deleteBucket, listBuckets};