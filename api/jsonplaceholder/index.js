module.exports = async function (context, req) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify( {
                userId: 24,
                title: "Test Title",
                body: "Lorem Ipsum A&S",
            } )
        });

        const test = await response.json();
       
        context.res.json({
            text: test
        });
    } catch (error) {
      throw error;
    }
};