const ProjectUtil = async (data) => {

    //get this endpoint later from backend, send to mongo
      const url = "YOUR_URL_HERE";
  
  
   console.log("call made with  " + JSON.stringify(data));
  
      const submitRequest = async (reqBody) => {
        try {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: reqBody }),
          });
          const json = await res.json();
          return { response: json, error: undefined };
        } catch (error) {
          return { response: undefined, error: error };
        }
      };
    
      return await submitRequest(data);
    };
    
    export default ProjectUtil;