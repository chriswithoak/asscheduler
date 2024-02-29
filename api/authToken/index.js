module.exports = async function (context, req) {
    try {
        const response = await fetch("https://dev-anthonysylvan.creatio.com/ServiceModel/AuthService.svc/Login", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
                'accept': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'access-control-allow-methods': '*',
            },
            body: JSON.stringify( {
                UserName: "andrew.keller@chartis.io",
                UserPassword: "Welc0Me$1"
            }),
        });
        const test = await response.json();
        context.res.json({
            text: test
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};